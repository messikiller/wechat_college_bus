import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Icon, Dropdown, Avatar } from 'antd';
const { Header, Sider, Content } = Layout;
import { BrowserRouter as Router, Route, Link, HashRouter, Redirect, Switch } from 'react-router-dom';
import styles from "./Main.css";
import ThroughBusManage from './views/ThroughBus/Manage'
import CharterBusManage from './views/CharterBus/Manage'
import UserManage from './views/User/Manage'
import OrderManage from './views/Order/Manage'
import MemberManage from './views/Member/Manage'

const Dashboard = function () {
  return <h1>定制巴士后台 Beta</h1>
}

const SiderMenus = [
  { key: 'dashboard', icon: 'dashboard', title: '首页', link: '/'},
  { key: 'user', icon: 'team', title: '账号管理', link: '/user'},
  { key: 'member_manage', icon: 'smile', title: '关注管理', link: '/member_manage'},
  { key: 'through_bus_manage', icon: 'thunderbolt', title: '直通车管理', link: '/through_bus_manage'},
  { key: 'charter_bus_manage', icon: 'car', title: '包车管理', link: '/charter_bus_manage'},
  { key: 'order_manage', icon: 'shopping-cart', title: '订单管理', link: '/order_manage'},
]

class SiderLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'unknown'
    }
  }

  async componentWillMount() {
    const res = await axios({
      method: 'get',
      url: '/auth/me'
    })
    this.setState({
      username: res.data.data.name
    })
  }

  render() {
    return (
      <HashRouter>
        <Layout className="layout">
          <Sider collapsible >
            <div className="layout__logo"><Icon type="setting" />&nbsp;定制巴士</div>
            <Menu
              theme="dark"
              defaultSelectedKeys={this.menuAutoSelect()}
            >
              {
                SiderMenus.map(item => {
                  return (
                    <Menu.Item key={item.key}>
                      <Link to={item.link}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                      </Link>
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Sider>
          <Layout>
            <Header className="layout__header">
              <div className="layout__header__right">
                <Dropdown overlay={menu}>
                  <a href="#">
                    <Avatar icon="user" size={24}></Avatar>
                    <span className="layout__header__right__name">&nbsp;{this.state.username}</span>
                  </a>
                </Dropdown>
              </div>
            </Header>
            <Content className="layout__content">
              <Switch>
                <Route path="/" exact component={Dashboard}/>
                <Route path="/user" exact component={UserManage}/>
                <Route path="/through_bus_manage" exact component={ThroughBusManage}/>
                <Route path="/charter_bus_manage" exact component={CharterBusManage}/>
                <Route path="/order_manage" exact component={OrderManage}/>
                <Route path="/member_manage" exact component={MemberManage}/>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
  //左侧菜单选中状态根据 url 自动转换
  menuAutoSelect() {
    let key = window.location.hash.split('/')[1];
    if (key=='' || !key) {
      key = 'dashboard';
    }
    return new Array(key);
  }
  //new function
}

//头像下拉菜单处理
const avatarOnClick = function({key}){
  switch (key) {
    case 'logout':
      axios.post('/auth/logout')
      .then(function (response) {
        location.reload()
      })
      .catch(function (error) {
        console.log(error);
      });
      break;
    default: break;
  }
};
//头像下拉菜单
const menu = (
  <Menu onClick={avatarOnClick}>
    <Menu.Item key="version">
      <Icon type="crown" />
      <span>版本 0.0.0</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout">
      <Icon type="logout" />
      <span>退出登录</span>
    </Menu.Item>
  </Menu>
);

//挂载根节点
if (document.getElementById('root')) {
    ReactDOM.render(<SiderLayout />, document.getElementById('root'));
}
