import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker, TimePicker, notification } from 'antd';

import moment from 'moment';

export default class EditModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editForm: {}
    }
  }

  handleModalCancel = () => {
    this.props.onCancel()
  }

  validateEditForm = () => {
    let editForm = this.state.editForm
    return Object.values(editForm).every(val => !!val)
  }

  resetEditForm = () => {
    let editForm = this.state.editForm
    Object.keys(editForm).forEach(attr => editForm[attr] = '')
    this.setState({ editForm })
  }

  requestEditForm = async (id) => {
    const res = await axios({
      method: 'get',
      url: '/through/bus/view',
      params: {
        id: id
      }
    })

    this.setState({ editForm: res.data.data })
  }

  handleModalOk = async () => {
    if (!this.validateEditForm()) {
      notification.warning({
        message: '提示',
        description: '填写完整后再提交！'
      })
      return false
    }
    await axios({
      method: 'post',
      url: '/through/bus/edit',
      params: {
        id: this.props.id
      },
      data: this.state.editForm
    })
    this.resetEditForm()
    this.setState({ visible: false }, () => {
      Modal.success({
        title: '成功',
        content: '更新成功！'
      })
    })
    this.props.onOk()
  }

  updateEditForm = (attr, val) => {
    this.setState((prevState) => {
      prevState.editForm[attr] = val
      return {
        editForm: prevState.editForm
      }
    })
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.props.visible && nextProps.visible) {
      this.requestEditForm(nextProps.id)
    }
  }

  render() {
    return (
      <Modal
        title="编辑直通车"
        visible={this.props.visible}
        onOk={this.handleModalOk}
        onCancel={this.handleModalCancel}
        destroyOnClose
      >
        <Form>
          <Form.Item label="起始地址" required>
            <Input value={this.state.editForm.src} onChange={(e) => { this.updateEditForm('src', e.target.value) }}></Input>
          </Form.Item>
          <Form.Item label="目的地址" required>
            <Input value={this.state.editForm.dest} onChange={(e) => { this.updateEditForm('dest', e.target.value) }}></Input>
          </Form.Item>
          <Form.Item label="单价（元/人）" required>
            <InputNumber value={this.state.editForm.price} min={0.00} precision={2} style={{width: '100%'}} onChange={(val) => { this.updateEditForm('price', val) }}></InputNumber>
          </Form.Item>
          <Form.Item label="可用时间段" required>
            <DatePicker.RangePicker
              value={[moment(this.state.editForm.start_date), moment(this.state.editForm.end_date)]}
              style={{width: '100%'}}
              onChange={(dates) => { this.updateEditForm('start_date', dates[0].format('YYYY-MM-DD')); this.updateEditForm('end_date', dates[1].format('YYYY-MM-DD')); }}
            ></DatePicker.RangePicker>
          </Form.Item>
          <Form.Item label="当日出发时间" required>
            <TimePicker
              value={moment(this.state.editForm.left_at, 'HH:mm:ss')}
              style={{width: '100%'}}
              onChange={(time) => { this.updateEditForm('left_at', time.format('HH:mm:ss')) }}
            ></TimePicker>
          </Form.Item>
          <Form.Item label="当日抵达时间" required>
            <TimePicker
              value={moment(this.state.editForm.arrived_at, 'HH:mm:ss')}
              style={{width: '100%'}}
              onChange={(time) => { this.updateEditForm('arrived_at', time.format('HH:mm:ss')) }}
            ></TimePicker>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
