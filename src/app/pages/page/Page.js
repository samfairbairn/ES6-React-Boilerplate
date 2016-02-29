import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Counter from '../../components/counter/counter';
import bigImage from './images/superJumbo.jpg';
import { increment } from '../../common/actions';

class Page extends Component {

  constructor(props) {
    super(props)

    this.incrementCounter = this.incrementCounter.bind(this);
    //console.log(dispatch);
  }

  static propTypes = {
    counters: PropTypes.object.isRequired,
    increment: PropTypes.func.isRequired
  };

  renderCounters() {
    const { counters } = this.props.counters;
    var rows = [];
    for (var i=0; i < counters.length; i++) {
      rows.push(<Counter
        key={counters[i].key}
        id={counters[i].key}
        increment={counters[i].increment}
        counter={counters[i].counter}
        color={ counters[i].color }
        onTick={ this.incrementCounter }
      />);
    }
    return rows;
  }

  incrementCounter(id) {
    this.props.increment(id)
  }

  render() {
    const { counters } = this.props.counters;
    return (
      <div>
        { this.renderCounters() }
        <img src={bigImage} />
      </div>
    )}
}

function mapStateToProps(state, ownProps) {
  return {
    counters: state.counters
  }
}

export default connect(mapStateToProps, {
  increment
})(Page);