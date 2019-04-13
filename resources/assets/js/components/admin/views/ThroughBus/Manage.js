import React, { Component } from 'react';
import { Table, Button } from 'antd';
import AddModal from './AddModal';
import EditModal from './EditModal';

export default class Manage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showAddModal: false,
      showEditModal: false,
      selectedId: 0,
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
        { title: '创建时间', dataIndex: 'created_at', key: 'created_at' },
        {
          title: '操作',
          key: 'actions',
          render: (text, record) => {
            return (
              <div>
                <Button type="primary" size="small" style={{marginRight: '5px'}} onClick={() => { this.handleClickEdit(record) }}>编辑</Button>
              </div>
            )
          }
        }
      ]
    }
  }

  handleClickEdit = (record) => {
    this.setState({
      selectedId: record.id,
      showEditModal: true
    })
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

        <AddModal
          visible={this.state.showAddModal}
          onOk={() => {
            this.setState({ showAddModal: false })
            this.requestFreshTable()
          }}
          onCancel={() => { this.setState({ showAddModal: false }) }}
        />

        <EditModal
          visible={this.state.showEditModal}
          id={this.state.selectedId}
          onOk={() => {
            this.setState({ showEditModal: false })
            this.requestFreshTable()
          }}
          onCancel={() => { this.setState({ showEditModal: false }) }}
        />

      </div>
    )
  }
}
