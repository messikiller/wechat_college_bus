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
        { title: '会员名', dataIndex: 'member_name', key: 'member_name' },
        { title: '订单类型', dataIndex: 'type_desc', key: 'type_desc' },
        { title: '订单金额', dataIndex: 'price', key: 'price' },
        { title: '状态', dataIndex: 'status_desc', key: 'status_desc' },
        { title: '创建时间', dataIndex: 'created_at', key: 'created_at' },
        {
          title: '操作',
          key: 'actions',
          render: (text, record) => {
            return (
              <div>
                <Button type="primary" size="small" style={{marginRight: '5px'}}>action</Button>
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
      url: '/order/list',
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
        <Button type="primary" icon="plus" onClick={() => { }}>添加众筹路线</Button>
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
