import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Card, WhiteSpace, Flex } from 'antd-mobile';
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
                  <div>起点：{item.src}（{item.left_at}）</div>
                  <div>终点：{item.dest}（{item.arrived_at}）</div>
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
    return <div>{cardList}</div>
  }
}
