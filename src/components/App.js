import React, { Component } from 'react';
import { Grid, Row, Col, Navbar, Panel } from 'react-bootstrap';
import { hashHistory } from 'react-router';
import moment from 'moment';
import Database from '../utilities/database';
import WorkoutForm from './WorkoutForm';
import WorkoutList from './WorkoutList';

class App extends Component {
  constructor(props) {
    super(props);

    this.defaultActiveWorkout = {
      id: "new",
      date: undefined,
      exercises: []
    };

    this.state = {
      workouts: [],
      activeWorkout: {...this.defaultActiveWorkout}
    };

    // set up Firebase
    this.db = new Database();

    // set up active workout reference
    this.activeWorkout = {...this.defaultActiveWorkout};

    this.onAddWorkout = this.onAddWorkout.bind(this);
    this.onUpdateWorkout = this.onUpdateWorkout.bind(this);
    this.onDeleteWorkout = this.onDeleteWorkout.bind(this);

    this.addWorkout = this.addWorkout.bind(this);
    this.updateWorkout = this.updateWorkout.bind(this);
    this.deleteWorkout = this.deleteWorkout.bind(this);
  }

  componentDidMount() {
    this.db.workouts.on('child_added', (data) => {
      var workout = data.val();

      this.addWorkout({
        ...workout,
        date: moment.unix(workout.date).format('YYYY-MM-DD') // convert timestamp
      });
    });

    this.db.workouts.on('child_changed', (data) => {
      var workout = data.val();

      this.updateWorkout({
        ...workout,
        date: moment.unix(workout.date).format('YYYY-MM-DD') // convert timestamp
      });
    });

    this.db.workouts.on('child_removed', (data) => {
      this.deleteWorkout(data.val().id);
    });
  }

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
      workoutId = clone;
    } else {
      workoutId = workoutId;
    }

    this.activeWorkout = nextState.workouts.reduce((prev, workout) => {
      return workout.id === workoutId ? {...workout} : prev;
    }, {...this.defaultActiveWorkout});

    if (clone) {
      this.activeWorkout.id = "new";
    }
  }

  onAddWorkout({ id, date = false, exercises = [] }) {
    date = date || moment().format('YYYY-MM-DD');

    this.db.addWorkout({ id, date, exercises });
  }

  onUpdateWorkout(updatedWorkout) {
    this.db.updateWorkout(updatedWorkout.id, updatedWorkout);
  }

  onDeleteWorkout(id) {
    this.db.deleteWorkout(id);
  }

  addWorkout({ id, date = false, exercises = [] }) {
    date = date || moment().format('YYYY-MM-DD');

    this.setState({
      workouts: [...this.state.workouts, { 
        id,
        date,
        exercises
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

  deleteWorkout(id) {
    this.setState({
      workouts: this.state.workouts.filter(workout => workout.id !== id)
    });

    hashHistory.push('/workouts/new');
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
                activeWorkout={this.activeWorkout}
              />
            </Col>
            <Col md={8}>
              <Panel>
                {<h1 className="page-title">{this.activeWorkout.id !== "new" ? "Edit workout" : "New workout"}</h1>}
                <WorkoutForm 
                  date={this.activeWorkout.date}
                  exercises={this.activeWorkout.exercises}
                  editing={this.activeWorkout.id}
                  addWorkout={this.onAddWorkout} 
                  updateWorkout={this.onUpdateWorkout}
                  deleteWorkout={this.onDeleteWorkout}
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