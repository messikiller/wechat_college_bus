import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Card, WhiteSpace, Flex } from 'antd-mobile';
import styles from './ThroughBus.css'

export default class ThroughBus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { id: 1, src: '火车站', dest: '花溪', price: '123', status: '0', left_at: '12:00', 'arrived_at': '22: 15' },
        { id: 2, src: '大学城', dest: '贵阳大学', price: '57', status: '1', left_at: '14:00', 'arrived_at': '21: 30' },
        { id: 3, src: '花溪', dest: '风景区', price: '28', status: '0', left_at: '8:20', 'arrived_at': '20: 00' },
        { id: 4, src: '贵州大学', dest: '杜鹃风景区', price: '65', status: '0', left_at: '13:50', 'arrived_at': '17: 30' }
      ]
    }
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
                  <div>起点：{item.src}（{item.left_at}）</div>
                  <div>终点：{item.dest}（{item.arrived_at}）</div>
                </div>
                <div className="flex-extra">
                  <Button
                    type={item.status == 1 ? 'default' : 'ghost'}
                    size="small"
                    inline
                    disabled={item.status == 1}
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
    return <div>{cardList}</div>
  }
}
