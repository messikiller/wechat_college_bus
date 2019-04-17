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
        { title: '地址', dataIndex: 'title', key: 'title' },
        { title: '创建时间', dataIndex: 'created_at', key: 'created_at' }
      ]
    }
  }

  requestFreshTable = async () => {
    const res = await axios({
      method: 'get',
      url: '/raise/address/list',
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
        <Button type="primary" icon="plus" onClick={() => { this.setState({ showAddModal: true }) }}>添加地址</Button>
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
