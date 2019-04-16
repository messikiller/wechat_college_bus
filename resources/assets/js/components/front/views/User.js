import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Card, WingBlank, WhiteSpace, Flex, Icon, List } from 'antd-mobile';
import { Icon as AntIcon } from 'antd';
import styles from './User.css';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLogin: true,
      isManager: true,
      username: 'messikiller',
      avatar: '/images/default-avatar.jpg'
    }
  }

  render () {
    const loginInfo = (
      <div className="login-container">
        <img src={this.state.avatar} className="avatar" />
        <div className="username">{this.state.username}</div>
      </div>
    )

    const unloginInfo = (
      <div className="login-container">
        <div className="login-btn-container">
          <Button type="primary" size="small" inline>登录</Button>
        </div>
      </div>
    )

    return (
      <div>
        <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <Card full>
            <Card.Body>
              { this.state.hasLogin ? loginInfo : unloginInfo }
            </Card.Body>
          </Card>
          <WhiteSpace size="lg" />
        </WingBlank>
        <List style={{ display: this.state.hasLogin ? 'block' : 'none' }}>
          <List.Item arrow="horizontal" onClick={() => { window.location = '#/user/profile' }}><AntIcon type="user" /> 个人信息</List.Item>
          <List.Item arrow="horizontal" onClick={() => { window.location = '#/user/order' }}><AntIcon type="shopping-cart" /> 我的订单</List.Item>
          <List.Item arrow="horizontal" onClick={() => {}}><AntIcon type="car" /> 我的包车</List.Item>
          <List.Item arrow="horizontal" onClick={() => {}}><AntIcon type="dollar" /> 我的众筹</List.Item>
          <List.Item arrow="horizontal" style={{ display: this.state.isManager ? 'block' : 'none' }} onClick={() => {}}><AntIcon type="scan" /> 管理员验票</List.Item>
        </List>
      </div>
    )
  }
}
