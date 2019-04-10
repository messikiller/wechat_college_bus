import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Icon, Dropdown, Avatar } from 'antd';
const { Header, Sider, Content } = Layout;
import { BrowserRouter as Router, Route, Link, HashRouter, Redirect, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import styles from "./Main.css";
import ThroughBusManage from './views/ThroughBusManage'

const Dashboard = function () {
  return <h1>Dashboard</h1>
}
const Menu2 = function (){
  return <h1>Menu2</h1>
}

class SiderLayout extends React.Component {
  render() {
    return (
      <HashRouter>
        <Layout className="layout">
          <Sider collapsible >
            <div className="layout__logo" />
            <Menu
              theme="dark"
              defaultSelectedKeys={this.menuAutoSelect()}>
              <Menu.Item key="dashboard">
                <Link to="/">
                  <Icon type="dashboard" />
                  <span>首页</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="through_bus_manage">
                <Link to="/through_bus_manage">
                  <Icon type="smile" />
                  <span>直通车管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="menu2">
                <Link to="/menu2">
                  <Icon type="smile" />
                  <span>后台菜单2</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header className="layout__header">
              <div className="layout__header__right">
                <Dropdown overlay={menu}>
                  <a href="#">
                    <Avatar src={'images/default-avatar.png'} />
                    <span className="layout__header__right__name">username</span>
                  </a>
                </Dropdown>
              </div>
            </Header>
            <Content className="layout__content">
              <Switch>
                <Route path="/" exact component={Dashboard}/>
                <Route path="/through_bus_manage" exact component={ThroughBusManage}/>
                <Route path="/menu2" exact component={Menu2}/>
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
      axios.post('logout')
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
