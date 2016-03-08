import { applyMiddleware, compose, createStore } from 'redux';
import {browserHistory} from 'react-router';
import thunk from 'redux-thunk';
import {syncHistory} from 'react-router-redux';
import rootReducer from '../reducers';

// TODO check this is only imported for development
import installDevTools from 'immutable-devtools';
import Immutable from 'immutable';

/*const USE_DEV_TOOLS =
  process.env.NODE_ENV !== 'production' &&
  process.env.IS_BROWSER &&
  window.devToolsExtension;*/

/*if (USE_DEV_TOOLS)*/ installDevTools(Immutable);

export default function configureStore(initialState = {}) {

  const reduxRouterMiddleware = syncHistory(browserHistory);

  /*return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, reduxRouterMiddleware)
  )*/

  let middleware = applyMiddleware(thunk, reduxRouterMiddleware);

  //if (USE_DEV_TOOLS) {
    const devTools = window.devToolsExtension();
    middleware = compose(middleware, devTools);
  //}

  const store = middleware(createStore)(rootReducer, initialState);

  // Enable hot reload where available.
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;

};