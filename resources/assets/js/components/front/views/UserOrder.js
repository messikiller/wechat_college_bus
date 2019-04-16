import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon, List, WhiteSpace, Button, Tabs, Badge } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';

export default class UserOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payingList: [
        { id: 1, type_desc: '包车', price: '245.45', created_at: '2018-12-23' },
        { id: 2, type_desc: '直通车', price: '54.32', created_at: '2018-09-13' },
        { id: 3, type_desc: '众筹', price: '25.00', created_at: '2018-08-05' },
        { id: 4, type_desc: '包车', price: '68.92', created_at: '2018-04-03' }
      ],
      paidList: [
        { id: 1, type_desc: '包车1', price: '245.45', created_at: '2018-12-23' },
        { id: 2, type_desc: '直通车', price: '54.32', created_at: '2018-09-13' },
        { id: 3, type_desc: '众筹', price: '25.00', created_at: '2018-08-05' },
        { id: 4, type_desc: '包车', price: '68.92', created_at: '2018-04-03' }
      ],
      cancelList: [
        { id: 1, type_desc: '包车2', price: '245.45', created_at: '2018-12-23' },
        { id: 2, type_desc: '直通车', price: '54.32', created_at: '2018-09-13' },
        { id: 3, type_desc: '众筹', price: '25.00', created_at: '2018-08-05' },
        { id: 4, type_desc: '包车', price: '68.92', created_at: '2018-04-03' }
      ]
    }
  }

  render() {
    const tabs = [
      { title: '待支付' },
      { title: '已完成' },
      { title: '已取消' },
    ];

    const renderSpecificList = (attr) => {
      return this.state[attr].map((item, index) => (
        <List.Item
          key={item.id}
          extra={<span>{item.price} ￥</span>}
          thumb='/images/money.png'
          align="top"
          arrow="horizontal"
          multipleLine
          onClick={() => {
            window.location = `#/user/order/view/${item.id}`
          }}
        >
          {item.type_desc}
          <List.Item.Brief>{item.created_at}</List.Item.Brief>
        </List.Item>
      ))
    }

    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            window.location = '#/user'
          }}
        >
          我的订单
        </NavBar>

        <StickyContainer>
          <Tabs
            tabs={tabs}
            renderTabBar={(props) => {
              return (
                <Sticky>
                  {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
                </Sticky>
              )
            }}
          >
            <div>
              <WhiteSpace size="lg" />
              <List>
                { renderSpecificList('payingList') }
              </List>
            </div>
            <div>
              <WhiteSpace size="lg" />
              <List>{ renderSpecificList('paidList') }</List>
            </div>
            <div>
              <WhiteSpace size="lg" />
              <List>{ renderSpecificList('cancelList') }</List>
            </div>
          </Tabs>
        </StickyContainer>
      </div>
    )
  }
}
