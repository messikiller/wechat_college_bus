import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker, TimePicker, notification } from 'antd';

export default class AddModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  handleModalOk = () => {
    this.props.onOk()
  }

  handleModalCancel = () => {
    this.props.onCancel()
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
        <span>asdasdasdasd</span>
      </Modal>
    )
  }
}
