import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon, List, WhiteSpace, Button, Tabs, Badge } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';

export default class UserOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payingList: [
        { type_desc: '包车', price: '245.45', created_at: '2018-12-23' },
        { type_desc: '直通车', price: '54.32', created_at: '2018-09-13' },
        { type_desc: '众筹', price: '25.00', created_at: '2018-08-05' },
        { type_desc: '包车', price: '68.92', created_at: '2018-04-03' }
      ],
      paidList: [
        { type_desc: '包车', price: '245.45', created_at: '2018-12-23' },
        { type_desc: '直通车', price: '54.32', created_at: '2018-09-13' },
        { type_desc: '众筹', price: '25.00', created_at: '2018-08-05' },
        { type_desc: '包车', price: '68.92', created_at: '2018-04-03' }
      ],
      cancelList: [
        { type_desc: '包车', price: '245.45', created_at: '2018-12-23' },
        { type_desc: '直通车', price: '54.32', created_at: '2018-09-13' },
        { type_desc: '众筹', price: '25.00', created_at: '2018-08-05' },
        { type_desc: '包车', price: '68.92', created_at: '2018-04-03' }
      ]
    }
  }

  render() {
    const tabs = [
      { title: '待支付' },
      { title: '已完成' },
      { title: '已取消' },
    ];

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
                {
                  this.state.payingList.map((item, index) => {
                    return (
                      <List.Item
                        key={index}
                        extra={<span>{item.price} ￥</span>}
                        thumb='/images/money.png'
                        align="top"
                        multipleLine
                      >
                        {item.type_desc}
                        <List.Item.Brief>{item.created_at}</List.Item.Brief>
                      </List.Item>
                    )
                  })
                }
              </List>
            </div>
            <div>
              <WhiteSpace size="lg" />
              <List>
                {
                  this.state.paidList.map((item, index) => {
                    return (
                      <List.Item
                        key={index}
                        extra={<span>{item.price} ￥</span>}
                        thumb='/images/money.png'
                        align="top"
                        multipleLine
                      >
                        {item.type_desc}
                        <List.Item.Brief>{item.created_at}</List.Item.Brief>
                      </List.Item>
                    )
                  })
                }
              </List>
            </div>
            <div>
              <WhiteSpace size="lg" />
              <List>
                {
                  this.state.cancelList.map((item, index) => {
                    return (
                      <List.Item
                        key={index}
                        extra={<span>{item.price} ￥</span>}
                        thumb='/images/money.png'
                        align="top"
                        multipleLine
                      >
                        {item.type_desc}
                        <List.Item.Brief>{item.created_at}</List.Item.Brief>
                      </List.Item>
                    )
                  })
                }
              </List>
            </div>
          </Tabs>
        </StickyContainer>
      </div>
    )
  }
}
