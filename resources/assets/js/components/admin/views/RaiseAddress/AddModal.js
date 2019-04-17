import React, { Component } from 'react';
import { Modal, Form, Input, Select, notification, message } from 'antd';

export default class AddModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addForm: {
        title: '',
        type: 0
      }
    }
  }

  handleModalOk = async () => {
    if (!this.validateAddForm()) {
      notification.warning({
        message: '提示',
        description: '填写完整后再提交！'
      })
      return false
    }

    const res = await axios({
      method: 'post',
      url: '/raise/address/add',
      data: this.state.addForm
    })

    if (res.data.code == 500) {
      notification.warning({
        message: '提示',
        description: res.data.msg
      })
      return false
    }

    this.resetAddForm()
    message.success('添加众筹地址成功！')
    this.props.onOk()
  }

  handleModalCancel = () => {
    this.props.onCancel()
  }

  resetAddForm = () => {
    this.setState({
      addForm: {
        title: '',
        type: 0
      }
    })
  }

  updateAddForm = (attr, val) => {
    this.setState((prevState) => {
      prevState.addForm[attr] = val
      return {
        addForm: prevState.addForm
      }
    })
  }

  validateAddForm = () => {
    return this.state.addForm.title.length > 0
  }

  render() {
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
              <Select.Option value={0}>学校</Select.Option>
              <Select.Option value={1}>家乡</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="地址" required>
            <Input onChange={(e) => { this.updateAddForm('title', e.target.value) }}></Input>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
