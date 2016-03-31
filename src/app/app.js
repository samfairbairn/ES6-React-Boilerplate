import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from './components/header/Header'
import './app.css';

const resizeBrowser = 'RESIZE_BROWSER';

class App extends Component {

  constructor(props) {
    super(props)
  }

  static propTypes = {
    width: PropTypes.number.isRequired,
  };

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
  }

  render() {

    const { width, children } = this.props;

    return (
      <div>
        <Header />
        <div className="App-content">
          { width }
          { children }
        </div>
      </div>
  );
  }
}

const mapStateToProps = (state) => {
  //console.log();
  return {
    width: state.browser.width
  }
}


export default connect(mapStateToProps)(App);