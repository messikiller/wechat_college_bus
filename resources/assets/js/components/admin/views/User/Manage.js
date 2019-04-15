import React, { Component } from 'react';
import { Table, Button } from 'antd';

export default class Manage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: {
        pageno: 1,
        pagesize: 20,
        total: 0
      },
      list: [],
      columns: [
        { title: '#', dataIndex: 'index', key: 'index' },
        { title: '用户名', dataIndex: 'name', key: 'name' },
        { title: '邮箱', dataIndex: 'email', key: 'email' },
        { title: '创建时间', dataIndex: 'created_at', key: 'created_at' },
        {
          title: '操作',
          key: 'actions',
          render: (text, record) => {
            return (
              <div>
                <Button type="primary" size="small" style={{marginRight: '5px'}}>重置密码</Button>
              </div>
            )
          }
        }
      ]
    }
  }

  requestFreshTable = async () => {
    const res = await axios({
      method: 'get',
      url: '/user/list',
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
        <Button type="primary" icon="plus">创建用户</Button>
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
      </div>
    )
  }
}
