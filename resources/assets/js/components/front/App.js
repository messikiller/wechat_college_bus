import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TabBar } from 'antd-mobile';
import User from './views/User';
import ThroughBus from './views/ThroughBus';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'user',
      hidden: false
    };
  }

  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            title="景区直通车"
            key="through_bus"
            selected={this.state.selectedTab === 'through_bus'}
            onPress={() => {
              this.setState({
                selectedTab: 'through_bus',
              });
            }}
          >
            <ThroughBus />
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            title="个人中心"
            key="user"
            selected={this.state.selectedTab === 'user'}
            onPress={() => {
              this.setState({
                selectedTab: 'user',
              });
            }}
          >
            <User />
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));