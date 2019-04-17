import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker, TimePicker, notification } from 'antd';

export default class AddModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addForm: {
        src: '',
        dest: '',
        price: '',
        left_at: '',
        arrived_at: '',
        start_date: '',
        end_date: ''
      }
    }
  }

  handleModalCancel = () => {
    this.props.onCancel()
  }

  validateAddForm = () => {
    let addForm = this.state.addForm
    return Object.values(addForm).every(val => !!val)
  }

  resetAddForm = () => {
    let addForm = this.state.addForm
    Object.keys(addForm).forEach(attr => addForm[attr] = '')
    this.setState({ addForm })
  }

  handleModalOk = async () => {
    if (!this.validateAddForm()) {
      notification.warning({
        message: '提示',
        description: '填写完整后再提交！'
      })
      return false
    }
    await axios({
      method: 'post',
      url: '/through/bus/add',
      data: this.state.addForm
    })
    this.resetAddForm()
    Modal.success({
      title: '成功',
      content: '添加直通车成功！'
    })
    this.props.onOk()
  }

  updateAddForm = (attr, val) => {
    this.setState((prevState) => {
      prevState.addForm[attr] = val
      return {
        addForm: prevState.addForm
      }
    })
  }

  render() {
    return (
      <Modal
        title="添加直通车"
        visible={this.props.visible}
        onOk={this.handleModalOk}
        onCancel={this.handleModalCancel}
        destroyOnClose
      >
        <Form>
          <Form.Item label="起始地址" required>
            <Input onChange={(e) => { this.updateAddForm('src', e.target.value) }}></Input>
          </Form.Item>
          <Form.Item label="目的地址" required>
            <Input onChange={(e) => { this.updateAddForm('dest', e.target.value) }}></Input>
          </Form.Item>
          <Form.Item label="单价（元/人）" required>
            <InputNumber min={0.00} precision={2} style={{width: '100%'}} onChange={(val) => { this.updateAddForm('price', val) }}></InputNumber>
          </Form.Item>
          <Form.Item label="可用时间段" required>
            <DatePicker.RangePicker
              style={{width: '100%'}}
              onChange={(dates) => { this.updateAddForm('start_date', dates[0].format('YYYY-MM-DD')); this.updateAddForm('end_date', dates[1].format('YYYY-MM-DD')); }}
            ></DatePicker.RangePicker>
          </Form.Item>
          <Form.Item label="当日出发时间" required>
            <TimePicker style={{width: '100%'}} onChange={(time) => { this.updateAddForm('left_at', time.format('HH:mm:ss')) }}></TimePicker>
          </Form.Item>
          <Form.Item label="当日抵达时间" required>
            <TimePicker style={{width: '100%'}} onChange={(time) => { this.updateAddForm('arrived_at', time.format('HH:mm:ss')) }}></TimePicker>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
