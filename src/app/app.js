import React, { Component } from 'react';
import Header from './components/header/Header'
import './app.scss';

export default class extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="App-content">
          { this.props.children }
        </div>
      </div>
  );
  }
}
