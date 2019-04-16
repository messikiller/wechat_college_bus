import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Form, Button, List, InputItem, Picker, DatePicker, WhiteSpace, Modal, Toast } from 'antd-mobile';
import dayjs from 'dayjs';

export default class CharterBus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        type: 0,
        src: '',
        dest: '',
        started_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        ended_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        mobile: '',
        contactor: '',
        passengers_num: 0,
        remark: ''
      }
    }
  }

  componentWillMount() {
    //
  }

  updateFormValue = (attr, val) => {
    this.setState((prevState) => {
      prevState.form[attr] = val
      return {
        form: prevState.form
      }
    })
  }

  validateForm = () => {
    const form = this.state.form
    const strAttrs = ['src', 'dest', 'started_at', 'ended_at', 'mobile', 'contactor']
    const numAttrs = ['passengers_num']
    return strAttrs.every(attr => form[attr].length > 0) && numAttrs.every(attr => form[attr] > 0)
  }

  resetForm = () => {
    this.setState({
      form: {
        type: 0,
        src: '',
        dest: '',
        started_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        ended_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        mobile: '',
        contactor: '',
        passengers_num: 0,
        remark: ''
      }
    })
  }

  handleClickSubmit = async () => {
    if (!this.validateForm()) {
      Modal.alert('提示', '填写完整后再提交！')
      return false
    }
    await axios({
      method: 'post',
      url: '/charter/bus/add',
      data: this.state.form
    })
    this.resetForm()
    Toast.success('包车申请成功！')
  }

  render () {
    return (
      <div>
        <NavBar mode="dark">包车出行</NavBar>
        <WhiteSpace size="md" />
        <List>
          <WhiteSpace size="md" />
          <Picker
            cols="1"
            value={[this.state.form.type]}
            onChange={(val) => { this.updateFormValue('type', val[0]) }}
            data={[
              { label: '单程', value: 0 },
              { label: '往返', value: 1 },
              { label: '包天', value: 2 }
            ]}
          >
            <List.Item arrow="horizontal">包车类型：</List.Item>
          </Picker>
          <InputItem value={this.state.form.src} onChange={val => { this.updateFormValue('src', val) }}>起始地：</InputItem>
          <InputItem value={this.state.form.dest} onChange={val => { this.updateFormValue('dest', val) }}>到达地：</InputItem>
          <DatePicker
            value={dayjs(this.state.form.started_at).toDate()}
            onChange={val => { this.updateFormValue('started_at', dayjs(val).format('YYYY-MM-DD HH:mm')) }}
          >
            <List.Item arrow="horizontal" wrap>开始时间：</List.Item>
          </DatePicker>
          <DatePicker
            value={dayjs(this.state.form.ended_at).toDate()}
            onChange={val => { this.updateFormValue('ended_at', dayjs(val).format('YYYY-MM-DD HH:mm')) }}
          >
            <List.Item arrow="horizontal" wrap>结束时间：</List.Item>
          </DatePicker>
          <InputItem type="number" value={this.state.form.passengers_num} onChange={val => { this.updateFormValue('passengers_num', val) }}>包车人数：</InputItem>
          <InputItem value={this.state.form.contactor} onChange={val => { this.updateFormValue('contactor', val) }}>联系人：</InputItem>
          <InputItem type="number" value={this.state.form.mobile} onChange={val => { this.updateFormValue('mobile', val) }}>联系电话：</InputItem>
          <InputItem value={this.state.form.remark} onChange={val => { this.updateFormValue('remark', val) }}>备注：</InputItem>
          <List.Item>
            <WhiteSpace size="lg" />
            <Button type="primary" onClick={this.handleClickSubmit}>提交</Button>
          </List.Item>
        </List>
      </div>
    )
  }
}
