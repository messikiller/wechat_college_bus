import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon, Button, List, WingBlank, WhiteSpace, Flex } from 'antd-mobile';
import { Icon as AntIcon } from 'antd';
import CharterBusRecord from './OrderView/CharterBusRecord';
import ThroughBusRecord from './OrderView/ThroughBusRecord';
import './OrderView.css'

export default class OrderView extends React.Component {
  constructor(props) {
    super(props)
    const params = this.props.match.params
    this.state = {
      id: params.id,
      order: {
        status: 0,
        status_desc: '待支付',
        member_name: 'messikiller',
        type_desc: '直通车',
        price: '245.75',
        created_at: '2019-08-17',
      }
    }
  }

  render() {
    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            window.location = '#/user/order'
          }}
        >
          订单详情
        </NavBar>
        <List renderHeader={() => '订单详情'}>
          <WhiteSpace />
          <div className="list-item"><div className="title">订单状态</div><div className="content">{this.state.order.status_desc}</div></div>
          <div className="list-item"><div className="title">下单账号</div><div className="content">{this.state.order.member_name}</div></div>
          <div className="list-item"><div className="title">订单类型</div><div className="content">{this.state.order.type_desc}</div></div>
          <div className="list-item"><div className="title">金额</div><div className="content">{this.state.order.price} ￥</div></div>
          <div className="list-item"><div className="title">创建时间</div><div className="content">{this.state.order.created_at}</div></div>
        </List>
        <CharterBusRecord />
        <WingBlank>
        <WhiteSpace size="lg" />
          <Button type="primary">查看乘车码</Button>
          <WhiteSpace />
          <Button type="ghost">取消订单 </Button>
        </WingBlank>
      </div>
    )
  }
}
