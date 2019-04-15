import React, { Component } from 'react';
import { Modal, Form, Input, notification, message } from 'antd';

export default class AddModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addForm: {
        username: '',
        email: '',
        password: ''
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
    const res = await axios({
      method: 'post',
      url: '/user/add',
      data: this.state.addForm
    })

    if (res.data.code == 500) {
      message.info(res.data.msg)
      return false
    }

    this.resetAddForm()
    this.setState({ visible: false }, () => {
      Modal.success({
        title: '成功',
        content: '添加账号成功！'
      })
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
        title="添加账号"
        visible={this.props.visible}
        onOk={this.handleModalOk}
        onCancel={this.handleModalCancel}
        destroyOnClose
      >
        <Form>
          <Form.Item label="用户名" required>
            <Input onChange={(e) => { this.updateAddForm('username', e.target.value) }}></Input>
          </Form.Item>
          <Form.Item label="邮箱" required>
            <Input type="email" onChange={(e) => { this.updateAddForm('email', e.target.value) }}></Input>
          </Form.Item>
          <Form.Item label="密码" required>
            <Input type="password" onChange={(e) => { this.updateAddForm('password', e.target.value) }}></Input>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
