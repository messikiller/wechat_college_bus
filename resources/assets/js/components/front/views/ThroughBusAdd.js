import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Card, WhiteSpace, Flex } from 'antd-mobile';

export default class ThroughBusAdd extends React.Component {
  constructor(props) {
    super(props);
    const params = this.props.match.params
    this.state = {
      throughBusId: params.id
    }
  }

  render() {
    return <div>this is add through bus: {this.state.throughBusId}</div>
  }
}
