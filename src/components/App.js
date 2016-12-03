import React, { Component } from 'react';
import { Grid, Row, Col, Navbar, Panel } from 'react-bootstrap';

import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList';
import WORKOUTS from '../data.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workouts: []
    }

    this.addWorkout = this.addWorkout.bind(this);
  }

  addWorkout(workout) {
    this.setState({
      workouts: [...this.state.workouts, workout]
    })
  }

  render() {
    return (
      <div>
        <Navbar inverse id="header">
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Workout Log</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Grid id="main">
          <Row>
            <Col md={4}>
              <WorkoutList workouts={this.state.workouts} />
            </Col>
            <Col md={8}>
              <Panel>
                <WorkoutForm addWorkout={this.addWorkout} />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default App;