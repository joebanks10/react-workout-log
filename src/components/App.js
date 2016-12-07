import React, { Component } from 'react';
import { Grid, Row, Col, Navbar, Panel } from 'react-bootstrap';

import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList';
import WORKOUTS from '../data.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workouts: [],
      activeWorkout: false
    }

    this.addWorkout = this.addWorkout.bind(this);
    this.updateWorkout = this.updateWorkout.bind(this);
    this.deleteWorkout = this.deleteWorkout.bind(this);
    this.setActiveWorkout = this.setActiveWorkout.bind(this);
  }

  addWorkout(newWorkout) {
    this.setState({
      workouts: [...this.state.workouts, { 
        id: this.state.workouts.length,
        ...newWorkout
      }],
      activeWorkout: false
    })
  }

  updateWorkout(updatedWorkout) {
    this.setState({
      workouts: this.state.workouts.map((workout) => {
        if (workout.id !== updatedWorkout.id) {
          return workout;
        }

        return Object.assign({}, workout, updatedWorkout);
      }),
      activeWorkout: false
    })
  }

  deleteWorkout(workoutId) {
    this.setState({
      workouts: [
        ...this.state.workouts.slice(0, workoutId),
        ...this.state.workouts.slice(workoutId + 1)
      ],
      activeWorkout: false
    });
  }

  setActiveWorkout(workoutId) {
    let workout = this.state.workouts[workoutId] || false;

    this.setState({
      activeWorkout: workout
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
              <WorkoutList 
                workouts={this.state.workouts}
                activeWorkout={this.state.activeWorkout}
                onWorkoutClick={this.setActiveWorkout}
              />
            </Col>
            <Col md={8}>
              <Panel>
                <WorkoutForm 
                  date={this.state.activeWorkout ? this.state.activeWorkout.date : undefined}
                  exercises={this.state.activeWorkout ? this.state.activeWorkout.exercises : undefined}
                  editing={this.state.activeWorkout ? this.state.activeWorkout.id : -1 }
                  addWorkout={this.addWorkout} 
                  updateWorkout={this.updateWorkout}
                  deleteWorkout={this.deleteWorkout}
                />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default App;