import React, { Component } from 'react';
import { Grid, Row, Col, Navbar, Panel } from 'react-bootstrap';
import { hashHistory } from 'react-router';

import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList';

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

    this.activeWorkout = {...this.defaultActiveWorkout};

    this.addWorkout = this.addWorkout.bind(this);
    this.updateWorkout = this.updateWorkout.bind(this);
    this.deleteWorkout = this.deleteWorkout.bind(this);
    this.setActiveWorkout = this.setActiveWorkout.bind(this);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.params.workoutId === prevProps.params.workoutId) {
  //     return;
  //   }

  //   var workoutId;
  //   var clone = (typeof this.props.location.query.clone === "undefined") ? 
  //     false : this.props.location.query.clone;

  //   if (this.props.params.workoutId === "new") {
  //     workoutId = clone ? clone : -1;
  //   } else {
  //     workoutId = this.props.params.workoutId;
  //   }

  //   this.setActiveWorkout(workoutId, clone);
  // }

  componentWillUpdate(nextProps, nextState) {
    if (typeof nextProps.params.workoutId === "undefined") {
      return;
    }

    var workoutId = nextProps.params.workoutId;
    var clone = false;

    if (workoutId === "new") {
      if (typeof nextProps.location.query.clone === "undefined") {
        this.activeWorkout = {...this.defaultActiveWorkout};
        return;
      }
      
      clone = nextProps.location.query.clone;
      workoutId = +clone;
    } else {
      workoutId = +workoutId;
    }

    this.activeWorkout = nextState.workouts.reduce((prev, workout) => {
      return workout.id === workoutId ? {...workout} : prev;
    }, {...this.defaultActiveWorkout});

    if (clone) {
      this.activeWorkout.id = -1;
    }
  }

  addWorkout(newWorkout) {
    var id = this.state.workouts.reduce((maxId, workout) => Math.max(workout.id, maxId), -1) + 1;

    this.setState({
      workouts: [...this.state.workouts, { 
        ...newWorkout,
        id
      }]
    });

    hashHistory.push('/workouts/' + id);
  }

  updateWorkout(updatedWorkout) {
    this.setState({
      workouts: this.state.workouts.map((workout) => {
        if (workout.id !== updatedWorkout.id) {
          return workout;
        }

        return Object.assign({}, workout, updatedWorkout);
      })
    });
  }

  deleteWorkout(workoutId) {
    this.setState({
      workouts: this.state.workouts.filter(workout => workout.id !== workoutId)
    });

    hashHistory.push('/workouts/new');
  }

  setActiveWorkout(workoutId, clone = false) {
    var workout = this.state.workouts.reduce((prev, workout) => {
      return workout.id === +workoutId ? workout : prev;
    }, {...this.defaultActiveWorkout});

    this.setState({
      activeWorkout: {
        ...workout,
        id: clone ? -1 : workout.id
      }
    });
  }

  render() {
    console.log("Hello");

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
                activeWorkout={this.activeWorkout}
              />
            </Col>
            <Col md={8}>
              <Panel>
                {<h1 className="page-title">{this.activeWorkout.id > -1 ? "Edit workout" : "New workout"}</h1>}
                <WorkoutForm 
                  date={this.activeWorkout.date}
                  exercises={this.activeWorkout.exercises}
                  editing={this.activeWorkout.id}
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