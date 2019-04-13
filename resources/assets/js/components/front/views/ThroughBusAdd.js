import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon, Calendar, List, InputItem, WhiteSpace, Button, Modal } from 'antd-mobile';
import dayjs from 'dayjs';
import styles from './ThroughBusAdd.css'

export default class ThroughBusAdd extends React.Component {
  constructor(props) {
    super(props);
    const params = this.props.match.params
    let passengerIteratorId = 1
    this.state = {
      throughBusId: params.id,
      showCalendar: true,
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

  onConfirmSelectCalendar = (date) => {
    this.setState({
      selectedDate: dayjs(date).format('YYYY-MM-DD'),
      showCalendar: false,
    })
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
    if (this.validateForm()) {
      Modal.alert('success', 'OK')
    } else {
      Modal.alert('提示', '填写完整后再提交！')
    }
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

    const CalendarSelect = (
      <Calendar
        visible={this.state.showCalendar}
        onCancel={this.onCancelSelectCalendar}
        onConfirm={this.onConfirmSelectCalendar}
        type="one"
        minDate={this.state.startDate}
        maxDate={this.state.endDate}
      />
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
          <Button type="primary" icon="plus" onClick={() => { this.clickAddPassenger() }}>添加乘客</Button>
        </List.Item>
      </List>
    )

    return (
      <div className="container">
        <div className="header">{Navbar}</div>
        <div className="body">
          {CalendarSelect}
          <WhiteSpace size="md" />
          <List.Item extra={this.state.selectedDate}>出行日期：</List.Item>
          <InputItem type="phone" placeholder="填写11位手机号" onChange={(val) => { this.setState({ mobile: val }) }}><div>手机号：</div></InputItem>
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
