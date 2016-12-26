import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';
import Database from '../utilities/database';

import BaseLayout from './BaseLayout';
import Home from './Home';
import WorkoutsContainer from '../containers/WorkoutsContainer';

function App() {
  var db = new Database();

  return (
    <Router history={hashHistory}>
      <Route path="/" component={BaseLayout} title="Workout Log">
        <IndexRoute component={Home} />
        <Route 
          path="workouts/(:workoutId)" 
          component={WorkoutsContainer} 
          db={db}
        ></Route>
      </Route>
    </Router>
  );
}

export default App;
