import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TabBar, Button } from 'antd-mobile';
import { Icon } from 'antd';
import 'antd-mobile/dist/antd-mobile.css';
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import User from './views/User';
import ThroughBus from './views/ThroughBus';
import ThroughBusAdd from './views/ThroughBusAdd';
import CharterBus from './views/CharterBus';
import UserProfile from './views/UserProfile';
import UserOrder from './views/UserOrder';

const MainLayout = () => {
  const hash = window.location.hash
  const selectedTab = hash.substr(2, hash.length)
  return (
    <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          title="直通车"
          key="home"
          icon={<Icon type="thunderbolt" />}
          selectedIcon={<Icon type="thunderbolt" />}
          selected={selectedTab === 'through_bus'}
          onPress={() => {
            window.location=('#/through_bus');
          }}
        >
          <Route path="/through_bus" exact component={ThroughBus} />
        </TabBar.Item>
        <TabBar.Item
          title="包车"
          key="charter_bus"
          icon={<Icon type="car" />}
          selectedIcon={<Icon type="car" />}
          selected={selectedTab === 'charter_bus'}
          onPress={() => {
            window.location=('#/charter_bus');
          }}
        >
          <Route path="/charter_bus" exact component={CharterBus} />
        </TabBar.Item>
        <TabBar.Item
          title="我的"
          key="user"
          icon={<Icon type="user" />}
          selectedIcon={<Icon type="user" />}
          selected={selectedTab === 'user'}
          onPress={() => {
            window.location=('#/user')
          }}
        >
          <Route path="/user" component={User} />
        </TabBar.Item>
      </TabBar>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'user'
    };
  }

  componentWillMount() {
    const hash = window.location.hash
    const selectedTab = hash.substr(2, hash.length) || 'user'
    this.setState({
      selectedTab: selectedTab
    })
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/through_bus" exact component={MainLayout} />
          <Route path="/through_bus/add/:id" exact component={ThroughBusAdd} />

          <Route path="/charter_bus" exact component={MainLayout} />

          <Route path="/user" exact component={MainLayout} />
          <Route path="/user/profile" exact component={UserProfile} />
          <Route path="/user/order" exact component={UserOrder} />
          <Redirect to="/user" />
        </Switch>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
