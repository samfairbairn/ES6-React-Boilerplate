import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../app';
import Home from '../pages/home/Home';
import Page from '../pages/page/Page';
import NotFound from '../pages/notFound/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="page" component={Page} />
    <Route path="*" component={NotFound} />
  </Route>
);