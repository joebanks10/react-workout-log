import React, { Component } from 'react';
import { withRouter } from 'react-router';
import firebase from 'firebase';

import AppLayout from '../components/AppLayout';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.isLoggedIn = false;
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.props.router.push('/workouts');
      } else {
        this.isLoggedIn = false;
        this.props.router.push('/');
      }
    });
  }

  logOut() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <AppLayout 
        title="Workout Log"
        isLoggedIn={this.isLoggedIn}
        logOut={this.logOut}
      >
        {this.props.children}
      </AppLayout>
    );
  }
}

export default withRouter(App);
