import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon, Calendar, List, InputItem, WhiteSpace, Button, TabBar } from 'antd-mobile';
import dayjs from 'dayjs';
import styles from './ThroughBusAdd.css'

export default class ThroughBusAdd extends React.Component {
  constructor(props) {
    super(props);
    const params = this.props.match.params
    this.state = {
      throughBusId: params.id,
      showCalendar: true,
      startDate: new Date('2019-05-01'),
      endDate: new Date('2019-05-30'),
      selectedDate: '',
      unitPrice: '12.35',
      mobile: '',
      passengers: []
    }
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

  clickAddPassenger = () => {
    let passengers = this.state.passengers
    passengers.push({ name: '' })
    this.setState({
      passengers: passengers
    })
  }

  clickDeletePassenger = (index) => {
    let passengers = this.state.passengers
    passengers.splice(index, 1)
    this.setState({
      passengers: passengers
    })
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
                  key={index}
                  clear
                  onChange={(val) => { item.name = val }}
                >
                <div>
                  <Button
                    onClick={() => {
                      this.clickDeletePassenger(index)
                    }}
                    type="warning"
                    style={{verticleAlign: 'middle', padding: '0 5px 0 10px', marginRight: '5px'}}
                    inline
                    size="small"
                    icon="minus"></Button> 姓名：
                  </div>
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
          <InputItem value={this.state.selectedDate} disabled><div>日期：</div></InputItem>
          <InputItem type="phone" onChange={(val) => { this.setState({ mobile: val }) }}><div>手机号：</div></InputItem>
          {PassengersInputList}
        </div>
        <div className="footer">
          <div className="total-price">123.45￥</div>
          <div className="order-btn">确认</div>
        </div>
      </div>
    )
  }
}
