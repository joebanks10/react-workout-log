import React, { Component } from 'react';
import { ButtonToolbar, Button, PanelGroup, Panel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import moment from 'moment';

import FieldGroup from './FieldGroup';
import ExerciseForm from './ExerciseForm';

class WorkoutForm extends Component {

  constructor(props) {
    super(props);

    var { date, exercises } = this.props;

    // form input state
    this.state = { 
      date, 
      exercises, 
      activeExercise: -1
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleAddExerciseClick = this.handleAddExerciseClick.bind(this);
    this.handleExerciseSelect = this.handleExerciseSelect.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDeleteWorkoutClick = this.handleDeleteWorkoutClick.bind(this);
  }

  componentDidMount() {
    this.firstField.focus();
  }

  componentWillReceiveProps(nextProps) {
    var { date, exercises } = nextProps;

    this.setState({
      date,
      exercises,
      activeExercise: -1
    })
  }

  addExercise() {
    var newExercise = {
      name: '',
      sets: [],
      notes: ''
    };

    this.setState({
      exercises: [...this.state.exercises, newExercise],
      activeExercise: this.state.exercises.length
    });
  }

  removeExercise(exerciseId) {
    return () => {
      const exercises = this.state.exercises;

      this.setState({
        exercises: [
          ...exercises.slice(0, exerciseId),
          ...exercises.slice(exerciseId + 1)
        ],
        activeExercise: this.state.activeExercise === exerciseId ? -1 : exerciseId
      })
    }
  } 

  addSet(exerciseId) {
    return () => {
      var newSet = {
        weight: '',
        reps: ''
      };

      this.setState({
        exercises: this.state.exercises.map(function(exercise, index) {
          if (index !== exerciseId) {
            return exercise;
          }

          var sets = exercise.sets || [];

          return {
            ...exercise,
            sets: [...sets, newSet]
          }
        })
      })
    }
  }

  removeSet(exerciseId) {
    return (setId) => {
      return () => {
        this.setState({
          exercises: this.state.exercises.map(function(exercise, index) {
            if (index !== exerciseId) {
              return exercise;
            }

            return {
              ...exercise,
              sets: [
                ...exercise.sets.slice(0, setId), 
                ...exercise.sets.slice(setId + 1)
              ]
            }
          })
        })
      }
    }
  }

  handleDateChange(e) {
    this.setState({
      date: e.target.value
    });
  }

  handleAddExerciseClick(e) {
    e.preventDefault();

    this.addExercise();
  }

  handleExerciseSelect(exerciseId) {
    if (exerciseId === this.state.activeExercise) {
      this.setState({
        activeExercise: -1
      })
    } else {
      this.setState({
        activeExercise: exerciseId
      })
    }
  } 

  handleExerciseInputChange(exerciseId) {
    return (inputName, value) => {
      this.setState({
        exercises: this.state.exercises.map((exercise, index) => {
          if (index !== exerciseId) {
            return exercise
          }

          return {
            ...exercise,
            [inputName]: value
          }
        })
      })
    }
  }

  handleSetInputChange(exerciseId) {
    return (setId) => {
      return (inputName, value) => {
        this.setState({
          exercises: this.state.exercises.map((exercise, index) => {
            if (index !== exerciseId) {
              return exercise
            }

            return {
              ...exercise,
              sets: exercise.sets.map((set, index) => {
                if (index !== setId) {
                  return set
                }

                return {
                  ...set,
                  [inputName]: value
                }
              })
            }
          })
        })
      }
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();

    if (this.props.editing === "new") {
      this.props.addWorkout({
        date: this.state.date,
        exercises: this.state.exercises
      });
    } else {
      this.props.updateWorkout({
        id: this.props.editing,
        date: this.state.date,
        exercises: this.state.exercises
      });
    }
  }

  handleDeleteWorkoutClick(e) {
    e.preventDefault();

    if (this.props.editing === "new") {
      return;
    }

    this.props.deleteWorkout(this.props.editing);
  }

  render() {
    const { editing } = this.props;

    return (
      <form className="workout-form" onSubmit={this.handleFormSubmit}>
        <FieldGroup
          id="date"
          name="date"
          type="date"
          label="Date"
          value={this.state.date}
          onChange={this.handleDateChange}
          placeholder="mm/dd/yyyy"
          ref={(input) => { this.firstField = input}}
        />
        <div className="exercises">
          <h2 className="form-header">Exercises</h2>
          {this.state.exercises.length > 0 &&
            <PanelGroup activeKey={this.state.activeExercise} onSelect={this.handleExerciseSelect} accordion>
              {this.state.exercises.map((exercise, i) => (
                <Panel header={exercise.name || `Exercise ${i+1}`} eventKey={i} key={`exercise-${i}`}>
                  <ExerciseForm 
                    id={i}
                    name={exercise.name}
                    sets={exercise.sets}
                    notes={exercise.notes}
                    onInputChange={this.handleExerciseInputChange(i)}
                    onSetInputChange={this.handleSetInputChange(i)}
                    addSet={this.addSet(i)}
                    removeExercise={this.removeExercise(i)}
                    removeSet={this.removeSet(i)}
                  />
                </Panel>
              ))}
            </PanelGroup>
          }
          <p className="add-item">
            <a href="#" onClick={this.handleAddExerciseClick}>
              Add exercise
            </a>
          </p>
        </div>
        <ButtonToolbar>
          <Button type="submit" className="btn-primary">{editing === "new" ? "Log new" : "Update"} workout</Button>
          {editing !== "new" && (
            <LinkContainer to={{ pathname: "/workouts/new", query: { clone: editing } }}>
              <Button bsStyle="success">Repeat workout</Button>
            </LinkContainer>
          )}
          {editing !== "new" && <Button bsStyle="danger" onClick={this.handleDeleteWorkoutClick}>Delete workout</Button>}
        </ButtonToolbar>
      </form>
    )
  }
}

WorkoutForm.defaultProps = {
  date: moment().format('YYYY-MM-DD'),
  exercises: [],
  editing: "new"
};

export default WorkoutForm;