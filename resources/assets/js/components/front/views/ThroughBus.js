import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Button, Card, WhiteSpace, Flex, List, InputItem } from 'antd-mobile';
import styles from './ThroughBus.css'

export default class ThroughBus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }

  requestFreshList = async () => {
    const res = await axios({
      method: 'get',
      url: '/through/bus/index'
    })

    this.setState({
      list: res.data.data
    })
  }

  componentWillMount() {
    this.requestFreshList()
  }

  render () {
    const cardList = this.state.list.map((item, index) => {
      return (
        <div key={index}>
          <WhiteSpace size="sm" />
          <Card full>
            <Card.Body style={{display: 'flex', alignItems: 'center'}}>
              <div className="flex-container" style={{flex: 1}}>
                <div className="flex-left">
                  <div style={{marginBottom: '15px'}}>起点：{item.src}（{item.left_at}）</div>
                  <div style={{marginBottom: '15px'}}>终点：{item.dest}（{item.arrived_at}）</div>
                  <div style={{marginBottom: '15px'}}>日期：{item.start_date} ~ {item.end_date}</div>
                </div>
                <div className="flex-extra">
                  <Button
                    type={item.status == 1 ? 'default' : 'ghost'}
                    size="small"
                    inline
                    onClick={() => {
                      window.location = `#/through_bus/add/${item.id}`
                    }}
                  >{item.status == 1 ? '已售罄' : `${item.price}￥/人`}</Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      )
    })
    return (
      <div>
        <NavBar mode="dark">景区直通车</NavBar>
        {cardList}
      </div>
    )
  }
}
