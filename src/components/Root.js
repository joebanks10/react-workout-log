import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';
import App from './App';

const Root = () => (
  <Router history={hashHistory}>
    <Redirect from="/" to="workouts/new"></Redirect>
    <Route path="/workouts/:workoutId" component={App}></Route>
  </Router>
);

export default Root;
