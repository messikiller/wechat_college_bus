import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon, List, InputItem, WhiteSpace, Button, Modal } from 'antd-mobile';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      mobile: '',
      college: '',
      id_card_no: ''
    }
  }

  render() {
    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            // window.history.back(-1)
            window.location = '#/user'
          }}
        >
          完善个人信息
        </NavBar>
        <WhiteSpace size="md" />
        <List>
          <InputItem value={this.state.nickname} onChange={val => { this.setState({ nickname: val }) }}>姓名：</InputItem>
          <InputItem value={this.state.mobile} onChange={val => { this.setState({ mobile: val }) }}>手机号：</InputItem>
          <InputItem value={this.state.college} onChange={val => { this.setState({ college: val }) }}>学校：</InputItem>
          <InputItem value={this.state.id_card_no} onChange={val => { this.setState({ id_card_no: val }) }}>身份证号：</InputItem>
          <List.Item>
            <WhiteSpace size="md" />
            <Button type="primary">提交</Button>
          </List.Item>
        </List>
      </div>
    )
  }
}
