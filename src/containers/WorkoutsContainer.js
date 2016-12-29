import React, { Component } from 'react';
import moment from 'moment';
import { hashHistory } from 'react-router';

import Workouts from '../components/Workouts';

class WorkoutsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workouts: [],
      isInitialized: false
    };

    this.db = this.props.route.db;

    this.onAddWorkout = this.onAddWorkout.bind(this);
    this.onUpdateWorkout = this.onUpdateWorkout.bind(this);
    this.onDeleteWorkout = this.onDeleteWorkout.bind(this);

    this.addWorkout = this.addWorkout.bind(this);
    this.updateWorkout = this.updateWorkout.bind(this);
    this.deleteWorkout = this.deleteWorkout.bind(this);
  }

  componentDidMount() {
    var workoutsRef = this.db.getWorkouts();
    var initWorkouts = [];

    workoutsRef.once('value', (list) => {
      list.forEach((data) => {
        var workout = data.val();

        initWorkouts.push({
          id: workout.id,
          ref: data.key,
          date: moment.unix(workout.date).format('YYYY-MM-DD'), // convert timestamp
          exercises: workout.exercises || []
        });
      });

      this.setState({
        workouts: initWorkouts,
        isInitialized: true
      });
    });

    workoutsRef.on('child_added', (data) => {
      if (!this.state.isInitialized) {
        return;
      }

      var workout = data.val();

      this.addWorkout({
        ...workout,
        date: moment.unix(workout.date).format('YYYY-MM-DD'), // convert timestamp
        ref: data.key
      });
    });

    workoutsRef.on('child_changed', (data) => {
      var workout = data.val();

      this.updateWorkout({
        ...workout,
        date: moment.unix(workout.date).format('YYYY-MM-DD') // convert timestamp
      });
    });

    workoutsRef.on('child_removed', (data) => {
      this.deleteWorkout(data.val().id);
    });
  }

  onAddWorkout({ date = false, exercises = [] }) {
    date = date || moment().format('YYYY-MM-DD');

    this.db.addWorkout({ date, exercises });
  }

  onUpdateWorkout({ id, date = false, exercises = [] }) {
    const workout = this.state.workouts.find(workout => id === workout.id);

    if (typeof workout === "undefined") {
      this.onAddWorkout({ date, exercise });
    }

    date = date || moment().format('YYYY-MM-DD');

    this.db.updateWorkout(workout.ref, { id, date, exercises });
  }

  onDeleteWorkout(id) {
    if (id === 'new') {
      return;
    }

    const workout = this.state.workouts.find(workout => id === workout.id);

    this.db.deleteWorkout(workout.ref);
  }

  addWorkout({ id, ref, date = false, exercises = [] }) {
    date = date || moment().format('YYYY-MM-DD');

    this.setState({
      workouts: [...this.state.workouts, { id, ref, date, exercises }].sort(this.compareDate)
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
      }).sort(this.compareDate)
    });
  }

  deleteWorkout(id) {
    this.setState({
      workouts: this.state.workouts.filter(workout => workout.id !== id)
    });

    hashHistory.push('/workouts/new');
  }

  compareDate(workout1, workout2) {
    var date1 = moment(workout1.date).unix();
    var date2 = moment(workout2.date).unix();

    return date1 - date2; // if 0 or negative, date1 goes first
  }

  getDefaultWorkout() {
    return {
      id: "new",
      date: undefined,
      exercises: []
    };
  }

  getActiveWorkout() {
    const defaultWorkout = this.getDefaultWorkout();

    if (typeof this.props.params.workoutId === "undefined") {
      return defaultWorkout;
    }

    var activeWorkout = this.getDefaultWorkout();
    var workoutId = this.props.params.workoutId;
    var isClone = false;

    if (workoutId === "new") {
      if (typeof this.props.location.query.clone === "undefined") {
        return defaultWorkout;
      }
      
      workoutId = this.props.location.query.clone;
      isClone = true;
    }

    activeWorkout = this.state.workouts.reduce((prev, workout) => {
      return workout.id === workoutId ? {...workout} : prev;
    }, defaultWorkout);

    if (isClone) {
      activeWorkout.id = "new";
    }

    return activeWorkout;
  }

  render() {
    const activeWorkout = this.getActiveWorkout();

    return (
      <Workouts 
        workouts={this.state.workouts}
        activeWorkout={activeWorkout}
        isNewWorkout={activeWorkout.id === 'new'}
        onAddWorkout={this.onAddWorkout}
        onUpdateWorkout={this.onUpdateWorkout}
        onDeleteWorkout={this.onDeleteWorkout}
      />
    );
  }
}

export default WorkoutsContainer;