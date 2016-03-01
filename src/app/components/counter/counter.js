import React, { Component, PropTypes } from 'react';
import './counter.scss';

export default class extends Component {
  constructor(props) {
    super(props);
    //this.interval = setInterval(() => this.tick(), 1000);
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.props.onTick(this.props.id);
  }

  componentWillUnmount() {
    //clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <p style={{ color: this.props.color }}>
          Counter ({this.props.increment}): {this.props.counter}
        </p>
        <a onClick={this.tick}>
          increment
        </a>
      </div>
    );
  }
}
