import React, { Component } from 'react';
import { withRouter } from 'react-router';
import firebase from 'firebase';

import AppLayout from '../components/AppLayout';

class App extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.router.push('/workouts');
      } else {
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
        logOut={this.logOut}
      >
        {this.props.children}
      </AppLayout>
    );
  }
}

export default withRouter(App);
