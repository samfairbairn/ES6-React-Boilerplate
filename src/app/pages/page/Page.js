import React, { Component } from 'react';
import Counter from '../../components/counter/counter';
import { NICE, SUPER_NICE } from '../../common/constants';
import bigImage from './images/superJumbo.jpg';

export default class extends Component {
  render() {
    return (
      <div>
        <Counter increment={1} color={NICE} />
        <Counter increment={5} color={SUPER_NICE} />
        <img src={bigImage} />
      </div>
    )}
}