import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
//import app from './app';
import browser from './browser';
import counters from './counters';

export default combineReducers({
  counters,
  browser,
  routing
});
