import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Counter from '../../components/counter/counter';
import bigImage from './images/superJumbo.jpg';
import { increment, addCounter } from '../../common/actions';
import { NICE, SUPER_NICE } from '../../common/constants';

class Page extends Component {

  constructor(props) {
    super(props);

    /*
    this.props.addCounter(0, 1, NICE);
    this.props.addCounter(0, 5, SUPER_NICE);
    this.props.addCounter(0, 3);
    this.props.addCounter();
    this.props.addCounter(100, undefined, 'blue');
    */

    this.incrementCounter = this.incrementCounter.bind(this);
  }

  static propTypes = {
    counters: PropTypes.object.isRequired,
    increment: PropTypes.func.isRequired,
    addCounter: PropTypes.func.isRequired
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  renderCounters() {

    const { counters } = this.props.counters;

    if(!counters) return

    var rows = [];

    counters.map((counter)=>{
      rows.push(<Counter
        key={counter.key}
        id={counter.key}
        increment={counter.increment}
        counter={counter.counter}
        color={ counter.color }
        onTick={ this.incrementCounter }
      />);
    });

    return rows;
  }

  incrementCounter(id) {
    this.props.increment(id)
  }

  render() {
    return (
      <div>
        { this.renderCounters() }
        <img width="100" src={bigImage} />
      </div>
    )}
}

function mapStateToProps(state, ownProps) {
  return {
    counters: state.counters
  }
}

export default connect(mapStateToProps, {
  increment,
  addCounter
})(Page);