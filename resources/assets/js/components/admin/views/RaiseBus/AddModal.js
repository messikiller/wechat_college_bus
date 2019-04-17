import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker, TimePicker, Select, notification, message } from 'antd';

export default class AddModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addressList: [],
      addForm: {
        type: 0,
        src_id: '',
        dest_id: '',
        date: '',
        left_at: '',
        price: 0.00,
        min: 1
      }
    }
  }

  handleModalOk = async () => {
    if (!this.validateAddForm()) {
      notification.warning({
        message: '提示',
        description: '填写完整后在提交！'
      })
      return false
    }

    await axios({
      method: 'post',
      url: '/raise/bus/add',
      data: this.state.addForm
    })

    message.success('添加众筹路线成功！')
    this.resetAddForm()
    this.props.onOk()
  }

  handleModalCancel = () => {
    this.resetAddForm()
    this.props.onCancel()
  }

  validateAddForm = () => {
    const requires = ['src_id', 'dest_id', 'date', 'left_at']
    return requires.every(attr => !!this.state.addForm[attr])
  }

  updateAddForm = (attr, val) => {
    this.setState((prevState) => {
      prevState.addForm[attr] = val
      return {
        addForm: prevState.addForm
      }
    })
  }

  resetAddForm = () => {
    this.setState({
      addForm: {
        type: 0,
        src_id: '',
        dest_id: '',
        date: '',
        left_at: '',
        price: 0.00,
        min: 1
      }
    })
  }

  async componentWillMount() {
    const res = await axios({
      method: 'get',
      url: '/raise/address/list',
      params: {
        page_close: 'T'
      }
    })
    this.setState({ addressList: res.data.data })
  }

  render() {

    const addressSelectOptions = this.state.addressList.map(addr => (<Select.Option key={addr.id} value={addr.id}>{addr.title}</Select.Option>))

    return (
      <Modal
        title="添加地址"
        visible={this.props.visible}
        onOk={this.handleModalOk}
        onCancel={this.handleModalCancel}
        destroyOnClose
      >
        <Form>
          <Form.Item label="类型">
            <Select value={this.state.addForm.type} onChange={(val) => { this.updateAddForm('type', val) }}>
              <Select.Option value={0}>回乡</Select.Option>
              <Select.Option value={1}>返校</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="始发地" required>
            <Select value={this.state.addForm.src_id} onChange={(val) => { this.updateAddForm('src_id', val) }}>
              { addressSelectOptions }
            </Select>
          </Form.Item>
          <Form.Item label="目的地" required>
            <Select value={this.state.addForm.dest_id} onChange={(val) => { this.updateAddForm('dest_id', val) }}>
              { addressSelectOptions }
            </Select>
          </Form.Item>
          <Form.Item label="日期" required>
            <DatePicker style={{width: '100%'}} onChange={(date) => { this.updateAddForm('date', date.format('YYYY-MM-DD')) }}></DatePicker>
          </Form.Item>
          <Form.Item label="出发时间" required>
            <TimePicker style={{width: '100%'}} onChange={(time) => { this.updateAddForm('left_at', time.format('HH:mm:ss')) }}></TimePicker>
          </Form.Item>
          <Form.Item label="单价（元/人）">
            <InputNumber value={this.state.addForm.price} min={0.00} precision={2} style={{width: '100%'}} onChange={(val) => { this.updateAddForm('price', val) }}></InputNumber>
          </Form.Item>
          <Form.Item label="最少限制人数">
            <InputNumber value={this.state.addForm.min} min={1} style={{width: '100%'}} onChange={(val) => { this.updateAddForm('min', val) }}></InputNumber>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
