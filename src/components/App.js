import React, { Component } from 'react';
import { Grid, Row, Col, Navbar, Panel } from 'react-bootstrap';

import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList';
import WORKOUTS from '../data.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.defaultActiveWorkout = {
      id: -1,
      date: undefined,
      exercises: []
    };

    this.state = {
      workouts: [],
      activeWorkout: {...this.defaultActiveWorkout}
    };

    this.addWorkout = this.addWorkout.bind(this);
    this.updateWorkout = this.updateWorkout.bind(this);
    this.deleteWorkout = this.deleteWorkout.bind(this);
    this.setActiveWorkout = this.setActiveWorkout.bind(this);
  }

  addWorkout(newWorkout) {
    this.setState({
      workouts: [...this.state.workouts, { 
        id: this.state.workouts.reduce((maxId, workout) => Math.max(workout.id, maxId), -1) + 1,
        ...newWorkout
      }],
      activeWorkout: {...this.defaultActiveWorkout}
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
      activeWorkout: {...this.defaultActiveWorkout}
    })
  }

  deleteWorkout(workoutId) {
    this.setState({
      workouts: this.state.workouts.filter(workout => workout.id !== workoutId),
      activeWorkout: {...this.defaultActiveWorkout}
    });
  }

  setActiveWorkout(workoutId, clone = false) {
    var workout = this.state.workouts.reduce((default_value, workout) => 
      workout.id === workoutId ? workout : default_value, 
      {...this.defaultActiveWorkout}
    );

    this.setState({
      activeWorkout: {
        ...workout,
        id: clone ? -1 : workout.id
      }
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
                {<h1 className="page-title">{this.state.activeWorkout.id > -1 ? "Edit workout" : "New workout"}</h1>}
                <WorkoutForm 
                  date={this.state.activeWorkout.date}
                  exercises={this.state.activeWorkout.exercises}
                  editing={this.state.activeWorkout.id}
                  addWorkout={this.addWorkout} 
                  updateWorkout={this.updateWorkout}
                  deleteWorkout={this.deleteWorkout}
                  setActiveWorkout={this.setActiveWorkout}
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