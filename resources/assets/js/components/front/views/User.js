import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Card, WingBlank, WhiteSpace, Flex, Icon, List } from 'antd-mobile';
import styles from './User.css';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLogin: true,
      username: 'messikiller',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg'
    }
  }

  render () {
    const loginInfo = (
      <div className="container">
        <img src={this.state.avatar} className="avatar" />
        <div className="username">{this.state.username}</div>
      </div>
    )

    const unloginInfo = (
      <div className="container">
        <div className="login-btn-container">
          <Button type="primary" size="small" inline>登录</Button>
        </div>
      </div>
    )

    return (
      <div>
        <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <Card>
            <Card.Body>
              { this.state.hasLogin ? loginInfo : unloginInfo }
            </Card.Body>
          </Card>
          <WhiteSpace size="lg" />
        </WingBlank>

        <List style={{ display: this.state.hasLogin ? 'block' : 'none' }}>
          <List.Item arrow="horizontal" onClick={() => { window.location = '#/user/profile' }}>个人信息</List.Item>
          <List.Item arrow="horizontal" onClick={() => {}}>我的订单</List.Item>
          <List.Item arrow="horizontal" onClick={() => {}}>我的包车</List.Item>
          <List.Item arrow="horizontal" onClick={() => {}}>我的众筹</List.Item>
        </List>
      </div>
    )
  }
}
