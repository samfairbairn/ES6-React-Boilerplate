import React, { Component } from 'react';
import {Link, IndexLink} from 'react-router';
import './header.scss';
import logo from './images/logo.png';

export default class extends Component {
  render() {
    return (
        <div className="Header">
          <img className="Header-logo" src={ logo }/>
          <ul>
            <li><Link
                className="Header-link"
                to="/"
                activeClassName="is-active"
              >
                Home
              </Link></li>
            <li><Link
              className="Header-link"
              to="page"
              activeClassName="is-active"
            >
              Page
            </Link></li>
          </ul>
        </div>
    )}
}
