import React, { Component } from 'react';
import { Table, Button, Avatar, Modal, message } from 'antd';

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
        { title: '账号', key: 'nickname', render: (text, record) => {
          return (
            <div>
              <Avatar shape="circle" size="small" src={record.avatar_url} />
              &ensp;{record.nickname}
            </div>
          )
        }},
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '学校', dataIndex: 'college', key: 'college' },
        { title: '身份证号', dataIndex: 'id_card_no', key: 'id_card_no' },
        { title: '手机号', dataIndex: 'mobile', key: 'mobile' },
        { title: '是否管理员', dataIndex: 'is_manager_desc', key: 'is_manager_desc' },
        { title: '创建时间', dataIndex: 'created_at', key: 'created_at' },
        {
          title: '操作',
          key: 'actions',
          render: (text, record) => {
            return (
              <div>
                <Button
                  type="primary"
                  size="small"
                  style={{marginRight: '5px'}}
                  onClick={() => { this.handleClickSetManager(record) }}
                >{ record.is_manager > 0 ? '取消' : '设为' }管理员</Button>
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
      url: '/member/list',
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

  handleClickSetManager = async (record) => {
    await axios({
      method: 'post',
      url: '/member/set/manager',
      params: {
        id: record.id
      }
    })

    let opt = record.is_manager > 0 ? '取消' : '设置'

    Modal.success({
      title: '成功',
      content: `${opt}管理员权限成功！`
    })

    this.requestFreshTable()
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
          rowKey="id"
        />
      </div>
    )
  }
}
