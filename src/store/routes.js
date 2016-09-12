import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from '../containers/app';
import Canvas from '../containers/canvas';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Canvas }/>
  </Route>
);
