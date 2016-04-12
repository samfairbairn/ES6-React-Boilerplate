import React, { Component } from 'react';
import {Link, IndexLink} from 'react-router';
import styles from './header.scss';
import logo from './images/logo.png';

export default class extends Component {
  render() {
    return (
        <div className={ styles.header }>
          <img className={ styles.logo } src={ logo }/>
          <ul className={ styles.list }>
            <li><Link
                to="/"
                activeClassName="is-active"
              >
                Home
              </Link></li>
            <li><Link
              to="page"
              activeClassName="is-active"
            >
              Page
            </Link></li>
          </ul>
        </div>
    )}
}
