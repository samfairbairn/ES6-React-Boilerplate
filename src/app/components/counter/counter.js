import React, { Component, PropTypes } from 'react';
import './counter.scss';

export default class extends Component {
  constructor(props) {
    super(props);
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.props.onTick(this.props.id);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <p style={{ color: this.props.color }}>
        Counter ({this.props.increment}): {this.props.counter}
      </p>
    );
  }
}
