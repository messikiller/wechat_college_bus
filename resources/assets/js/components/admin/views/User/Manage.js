import React, { Component } from 'react';
import { Table, Button, Popconfirm, Input, Modal } from 'antd';
import AddModal from './AddModal';

export default class Manage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showAddModal: false,
      resetPassword: '',
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
              <Popconfirm
                placement="top"
                title={(
                  <Input
                    type="password"
                    placeholder="输入密码"
                    value={this.state.resetPassword}
                    onChange={e => {
                      this.setState({ resetPassword: e.target.value })
                    }}
                  ></Input>
                )}
                onCancel={() => { this.setState({ resetPassword: '' }) }}
                onConfirm={ () => { this.handleConfirmResetPassword(record.id) }}
              >
                <Button type="primary" size="small">重置密码</Button>
              </Popconfirm>
            )
          }
        }
      ]
    }
  }

  handleConfirmResetPassword = async (id) => {
    if (!this.state.resetPassword) {
      return false
    }
    await axios({
      method: 'post',
      url: '/user/reset/password',
      params: { id },
      data: {
        password: this.state.resetPassword
      }
    })

    Modal.success({
      title: '成功',
      content: '重置密码成功！'
    })

    this.requestFreshTable()
    this.setState({ resetPassword: '' })
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
        <Button type="primary" icon="plus" onClick={() => { this.setState({showAddModal: true}) }}>创建用户</Button>
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
