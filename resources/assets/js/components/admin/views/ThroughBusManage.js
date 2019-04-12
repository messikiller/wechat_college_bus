import React, { Component } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, TimePicker, InputNumber, notification } from 'antd';

export default class ThroughBusManage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showAddModal: false,
      addForm: {
        src: '',
        dest: '',
        price: '',
        left_at: '',
        arrived_at: '',
        start_date: '',
        end_date: ''
      },
      page: {
        pageno: 1,
        pagesize: 20,
        total: 0
      },
      list: [],
      columns: [
        { title: '#', dataIndex: 'index', key: 'index' },
        { title: '出发地址', dataIndex: 'src', key: 'src' },
        { title: '目的地址', dataIndex: 'dest', key: 'dest' },
        { title: '价格（元/人）', dataIndex: 'price', key: 'price' },
        { title: '可用起始日期', dataIndex: 'start_date', key: 'start_date' },
        { title: '可用截止日期', dataIndex: 'end_date', key: 'end_date' },
        { title: '出发时间', dataIndex: 'left_at', key: 'left_at' },
        { title: '抵达时间', dataIndex: 'arrived_at', key: 'arrived_at' },
        { title: '创建时间', dataIndex: 'created_at', key: 'created_at' }
      ]
    }
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
    let addForm = this.state.addForm
    Object.keys(addForm).forEach(attr => addForm[attr] = '')
    this.setState({ addForm })
  }

  validateAddForm = () => {
    let addForm = this.state.addForm
    return Object.values(addForm).every(val => !!val)
  }

  requestFreshTable = async () => {
    const res = await axios({
      method: 'get',
      url: '/through/bus/list',
      params: {
        pageno: this.state.page.pageno,
        pagesize: this.state.page.pagesize
      }
    })
    this.setState({
      list: res.data.data,
      page: {
        pageno: parseInt(res.data.ext.pageno),
        pagesize: parseInt(res.data.ext.pagesize),
        total: parseInt(res.data.ext.total)
      }
    })
  }

  handleAddModalSubmit = async () => {
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
    this.requestFreshTable()
    this.setState({ showAddModal: false }, () => {
      Modal.success({
        title: '成功',
        content: '添加直通车成功！'
      })
    })
  }

  componentWillMount() {
    this.requestFreshTable()
  }

  render() {
    return (
      <div>
        <Button type="primary" icon="plus" onClick={() => { this.setState({ showAddModal: true }) }}>添加直通车</Button>
        <div style={{ height: '15px' }}></div>
        <Table
          bordered
          size="middle"
          dataSource={this.state.list}
          columns={this.state.columns}
          pagination={{
            total: this.state.page.total,
            current: this.state.page.pageno,
            onChange: this.requestFreshTable
          }}
          rowKey="id"
        />
        <Modal
          title="添加直通车"
          visible={this.state.showAddModal}
          onOk={this.handleAddModalSubmit}
          onCancel={() => {
            this.resetAddForm()
            this.setState({ showAddModal: false })
          }}
          destroyOnClose
        >
          <Form ref="addForm">
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
      </div>
    )
  }
}
