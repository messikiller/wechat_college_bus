import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { List, WhiteSpace } from 'antd-mobile';
import '../OrderView.css';

export default class CharterBusRecord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      order: {
        type_desc: '单程',
        src: '花溪景区',
        dest: '贵州大学南大门',
        started_at: '2019-05-01 12:30:00',
        ended_at: '2019-05-01 18:30:00',
        mobile: '123344565',
        contactor: '路人甲',
        remark: '请尽快安排发车，谢谢',
        passengers_num: 5,
        price: 245.87,
        status_desc: '待出行',
        created_at: '2019-04-22',
      }
    }
  }

  render() {
    return (
      <List renderHeader={() => '包车信息'}>
        <WhiteSpace />
        <div className="list-item"><div className="title">订单状态</div><div className="content">{this.state.order.type_desc}</div></div>
        <div className="list-item"><div className="title">始发地</div><div className="content">{this.state.order.src}</div></div>
        <div className="list-item"><div className="title">目的地</div><div className="content">{this.state.order.dest}</div></div>
        <div className="list-item"><div className="title">出发时间</div><div className="content">{this.state.order.started_at}</div></div>
        <div className="list-item"><div className="title">抵达时间</div><div className="content">{this.state.order.ended_at}</div></div>
        <div className="list-item"><div className="title">联系人</div><div className="content">{this.state.order.contactor}</div></div>
        <div className="list-item"><div className="title">乘客总数</div><div className="content">{this.state.order.passengers_num}</div></div>
        <div className="list-item"><div className="title">备注</div><div className="content">{this.state.order.remark}</div></div>
        <div className="list-item"><div className="title">报价</div><div className="content">{this.state.order.price} ￥</div></div>
        <div className="list-item"><div className="title">状态</div><div className="content">{this.state.order.status_desc}</div></div>
        <div className="list-item"><div className="title">创建时间</div><div className="content">{this.state.order.created_at}</div></div>
      </List>
    )
  }
}
