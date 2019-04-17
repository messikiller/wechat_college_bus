import React, { Component } from 'react';
import { Table, Button } from 'antd';
import AddModal from './AddModal';

export default class Manage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showAddModal: false,
      page: {
        pageno: 1,
        pagesize: 20,
        total: 0
      },
      list: [],
      columns: [
        { title: '#', dataIndex: 'index', key: 'index' },
        { title: '类型', dataIndex: 'type_desc', key: 'type_desc' },
        { title: '始发地', dataIndex: 'src_title', key: 'src_title' },
        { title: '目的地', dataIndex: 'dest_title', key: 'dest_title' },
        { title: '出发日期', dataIndex: 'date', key: 'date' },
        { title: '发车时间', dataIndex: 'left_at', key: 'left_at' },
        { title: '价格', dataIndex: 'price', key: 'price' },
        { title: '最少限制人数', dataIndex: 'min', key: 'min' },
        { title: '状态', dataIndex: 'status_desc', key: 'status_desc' },
        { title: '创建时间', dataIndex: 'created_at', key: 'created_at' }
      ]
    }
  }

  requestFreshTable = async () => {
    const res = await axios({
      method: 'get',
      url: '/raise/bus/list',
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
        <Button type="primary" icon="plus" onClick={() => { this.setState({ showAddModal: true }) }}>添加众筹路线</Button>
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

        <AddModal
          visible={this.state.showAddModal}
          onOk={() => {
            this.setState({ showAddModal: false })
            this.requestFreshTable()
          }}
          onCancel={() => { this.setState({ showAddModal: false }) }}
        />
      </div>
    )
  }
}
