import React, { Component } from 'react';
import { Table, Button, Row, Col, Popconfirm, InputNumber, Modal } from 'antd';

export default class Manage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputPrice: 0.00,
      page: {
        pageno: 1,
        pagesize: 20,
        total: 0
      },
      list: [],
      columns: [
        { title: '#', dataIndex: 'index', key: 'index' },
        { title: '类型', dataIndex: 'type_desc', key: 'type_desc' },
        { title: '出发地', dataIndex: 'src', key: 'src' },
        { title: '目的地', dataIndex: 'dest', key: 'dest' },
        { title: '开始时间', dataIndex: 'started_at', key: 'started_at' },
        { title: '截止时间', dataIndex: 'ended_at', key: 'ended_at' },
        { title: '报价（单位：元）', dataIndex: 'price', key: 'price' },
        { title: '状态', dataIndex: 'status_desc', key: 'status_desc' },
        { title: '创建时间', dataIndex: 'created_at', key: 'created_at' },
        {
          title: '操作',
          key: 'actions',
          render: (text, record) => {
            return (
              <Popconfirm
                placement="top"
                title={(
                  <InputNumber
                    min={0}
                    step={0.01}
                    precision={2}
                    placeholder="输入金额"
                    formatter={val => `￥${val}`}
                    value={this.state.inputPrice}
                    onChange={val => {
                      this.setState({ inputPrice: val })
                    }}
                  ></InputNumber>
                )}
                onCancel={() => { this.setState({ inputPrice: 0.00 }) }}
                onConfirm={ () => { this.handleConfirmInputPrice(record.id) }}
              >
                <Button type="primary" size="small">报价</Button>
              </Popconfirm>
            )
          }
        }
      ]
    }
  }

  handleConfirmInputPrice = async (id) => {
    if (this.state.inputPrice <= 0) {
      return false
    }
    await axios({
      method: 'post',
      url: '/charter/bus/offer',
      params: { id },
      data: {
        price: this.state.inputPrice
      }
    })

    Modal.success({
      title: '成功',
      content: '报价成功！'
    })

    this.requestFreshTable()
    this.setState({ inputPrice: 0.00 })
  }

  requestFreshTable = async () => {
    const res = await axios({
      method: 'get',
      url: '/charter/bus/list',
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

  componentWillMount() {
    this.requestFreshTable()
  }

  render() {
    return (
      <div>
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
          expandedRowRender={record => {
            return (
              <Row>
                <Col span="8">联系电话：{record.mobile}</Col>
                <Col span="8">联系人：{record.contactor}</Col>
                <Col span="8">乘客数：{record.passengers_num}</Col>
                <Col span="24">备注：{record.remark}</Col>
              </Row>
            )
          }}
          rowKey="id"
        />
      </div>
    )
  }
}
