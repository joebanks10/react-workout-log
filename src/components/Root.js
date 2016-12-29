import React, { Component } from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';
import Storage from '../utils/Storage';
import firebase from 'firebase';

import App from '../containers/App';
import Home from './Home';
import WorkoutsContainer from '../containers/WorkoutsContainer';
import SignUpForm from '../containers/SignUpForm';
import LoginForm from '../containers/LoginForm';

class Root extends Component {
  constructor(props) {
    super(props);

    this.db = new Storage();
  }

  requireLogin(nextState, replace, next) {
    var user = firebase.auth().currentUser;

    if (user) {
      next();
    } else {
      replace('/');
      next();
    }
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App} title="Workout Log">
          <IndexRoute component={Home} />
          <Route path="signup" component={SignUpForm} />
          <Route path="login" component={LoginForm} />
          <Route 
            path="workouts/:workoutId" 
            component={WorkoutsContainer} 
            db={this.db} 
            onEnter={this.requireLogin} 
          />
          <Redirect from="workouts" to="workouts/new" />
        </Route>
      </Router>
    );
  }
}

export default Root;
