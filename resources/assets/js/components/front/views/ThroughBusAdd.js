import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon, List, InputItem, WhiteSpace, Button, Modal, DatePicker } from 'antd-mobile';
import dayjs from 'dayjs';
import styles from './ThroughBusAdd.css'

export default class ThroughBusAdd extends React.Component {
  constructor(props) {
    super(props);
    const params = this.props.match.params
    let passengerIteratorId = 1
    this.state = {
      leftAt: '',
      arrivedAt: '',
      src: '',
      dest: '',
      throughBusId: params.id,
      startDate: new Date(),
      endDate: new Date(),
      selectedDate: '',
      unitPrice: 0,
      mobile: '',
      passengers: [
        { id: passengerIteratorId++, name: '' }
      ]
    }
  }

  requestThroughBusView = async () => {
    const res = await axios({
      method: 'get',
      url: '/through/bus/view',
      params: {
        id: this.state.throughBusId
      }
    })

    const data = res.data.data
    this.setState({
      leftAt: data.left_at,
      arrivedAt: data.arrived_at,
      src: data.src,
      dest: data.dest,
      startDate: new Date(data.start_date),
      endDate: new Date(data.end_date),
      unitPrice: data.price
    })
  }

  componentWillMount() {
    this.requestThroughBusView()
  }

  onCancelSelectCalendar = () => {
    window.history.back(-1)
  }

  computeTotalPrice = () => {
    let totalPrice = this.state.unitPrice * this.state.passengers.length
    totalPrice = totalPrice.toFixed(2)
    this.setState({ totalPrice })
  }

  clickAddPassenger = () => {
    let passengers = this.state.passengers
    const id = passengers[passengers.length - 1].id + 1
    passengers.push({ id: id, name: '' })
    this.setState({ passengers }, this.computeTotalPrice)
  }

  clickDeletePassenger = (index) => {
    let passengers = this.state.passengers
    if (passengers.length > 1) {
      passengers.splice(index, 1)
      this.setState({ passengers }, this.computeTotalPrice)
    }
  }

  validateForm = () => {
    return (this.state.mobile.length > 0 && this.state.passengers.every(person => person.name.length > 0))
  }

  clickSubmit = () => {
    if (!this.validateForm()) {
      Modal.alert('提示', '填写完整后再提交！')
      return false
    }
    // do submit
  }

  render() {
    const Navbar = (
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => {
          window.history.back(-1)
        }}
      >填写出行信息</NavBar>
    )

    const PassengersInputList = (
      <List renderHeader={() => '乘客信息'}>
        <List.Item>
          {
            this.state.passengers.map((item, index) => {
              return (
                <InputItem
                  key={item.id}
                  onChange={(val) => { item.name = val }}
                  extra={index > 0 ? (<Icon type="cross" onClick={() => {this.clickDeletePassenger(index)}} />) : ''}
                  placeholder="填写姓名"
                >
                  <div>乘车人{index + 1}：</div>
                </InputItem>
              )
            })
          }
          <WhiteSpace size="lg" />
          <Button type="primary" icon="plus" onClick={() => { this.clickAddPassenger() }}>添加乘客</Button>
        </List.Item>
      </List>
    )

    return (
      <div className="container">
        <div className="header">{Navbar}</div>
        <div className="body">
          <WhiteSpace size="md" />
          <List>
            <InputItem value={this.state.dest} editable={false}>目的地：</InputItem>
            <InputItem value={this.state.src} editable={false}>始发地：</InputItem>
            <InputItem value={this.state.leftAt} editable={false}>出发时间：</InputItem>
            <InputItem value={this.state.leftAt} editable={false}>抵达时间：</InputItem>
          </List>
          <WhiteSpace size="lg" />
          <List>
            <DatePicker
              mode="date"
              minDate={new Date(this.state.startDate)}
              maxDate={new Date(this.state.endDate)}
              value={!this.state.selectedDate ? '' : new Date(this.state.selectedDate)}
              onChange={date => { this.setState({ selectedDate: dayjs(date).format('YYYY-MM-DD') }) }}
            >
              <List.Item arrow="horizontal">出行日期：</List.Item>
            </DatePicker>
            <InputItem type="phone" placeholder="填写11位手机号" onChange={(val) => { this.setState({ mobile: val }) }}><div>联系电话：</div></InputItem>
          </List>
          {PassengersInputList}
        </div>
        <div className="footer">
          <div className="total-price">{(this.state.passengers.length * this.state.unitPrice).toFixed(2)}￥</div>
          <a className="order-btn" onClick={ this.clickSubmit }>确认</a>
        </div>
      </div>
    )
  }
}
