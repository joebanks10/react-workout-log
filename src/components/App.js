import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';
import Storage from '../utils/Storage';

import BaseLayout from './BaseLayout';
import Home from './Home';
import WorkoutsContainer from '../containers/WorkoutsContainer';
import SignUpForm from '../containers/SignUpForm';

function App() {
  var db = new Storage();

  return (
    <Router history={hashHistory}>
      <Route path="/" component={BaseLayout} title="Workout Log">
        <IndexRoute component={Home} />
        <Redirect from="workouts/" to="workouts/new" />
        <Route path="workouts/:workoutId" component={WorkoutsContainer} db={db} ></Route>
        <Route path="signup" component={SignUpForm} />
      </Route>
    </Router>
  );
}

export default App;
