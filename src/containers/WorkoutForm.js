import React, { Component, PropTypes } from 'react';
import { ButtonToolbar, Button, PanelGroup, Panel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import moment from 'moment';
import shortid from 'shortid';

import FieldGroup from '../components/FieldGroup';
import ExerciseForm from '../components/ExerciseForm';

const propTypes = {
  workoutId: PropTypes.string,
  date: PropTypes.string,
  exercises: PropTypes.array
};

const defaultProps = {
  workoutId: 'new',
  date: moment().format('YYYY-MM-DD'),
  exercises: [],
  onAddWorkout: function() {},
  onUpdateWorkout: function() {},
  onRepeatWorkout: function() {},
  onDeleteWorkout: function() {}
};

class WorkoutForm extends Component {
  constructor(props) {
    super(props);

    // form input state
    this.state = { 
      date: props.date,
      exercises: props.exercises,
      activeExercise: false
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.onAddExerciseClick = this.onAddExerciseClick.bind(this);
    this.onExerciseSelect = this.onExerciseSelect.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDeleteWorkoutClick = this.onDeleteWorkoutClick.bind(this);
  }

  componentDidMount() {
    this.firstField.focus();
  }

  componentWillReceiveProps(nextProps) {
    const { date, exercises } = nextProps;

    this.setState({
      date,
      exercises,
      activeExercise: false
    });
  }

  onDateChange(e) {
    this.setState({
      date: e.target.value
    });
  }

  onAddExerciseClick(e) {
    e.preventDefault();
    
    var newExercise = {
      id: shortid.generate(),
      name: '',
      sets: [],
      notes: ''
    };

    this.setState({
      exercises: [...this.state.exercises, newExercise],
      activeExercise: newExercise.id
    });
  }

  onExerciseSelect(exerciseId) {
    if (exerciseId === this.state.activeExercise) {
      this.setState({
        activeExercise: false
      })
    } else {
      this.setState({
        activeExercise: exerciseId
      })
    }
  } 

  onFormSubmit(e) {
    e.preventDefault();

    if (this.props.workoutId === 'new') {
      this.props.addWorkout({
        date: this.state.date,
        exercises: this.state.exercises
      });
    } else {
      this.props.updateWorkout({
        id: this.props.workoutId,
        date: this.state.date,
        exercises: this.state.exercises
      });
    }
  }

  onDeleteWorkoutClick(e) {
    e.preventDefault();

    this.props.deleteWorkout(this.props.workoutId);
  }

  getOnRemoveExercise(exerciseId) {
    return () => {
      const exercises = this.state.exercises;
      const index = exercises.findIndex(exercise => exercise.id === exerciseId);

      this.setState({
        exercises: [
          ...exercises.slice(0, index),
          ...exercises.slice(index + 1)
        ],
        activeExercise: this.state.activeExercise === exerciseId ? false : exerciseId
      })
    };
  }

  getOnExerciseInputChange(exerciseId) {
    return (inputName, value) => {
      this.setState({
        exercises: this.state.exercises.map((exercise, index) => {
          if (exercise.id !== exerciseId) {
            return exercise
          }

          return {
            ...exercise,
            [inputName]: value
          }
        })
      })
    };
  }

  getOnAddSet(exerciseId) {
    return () => {
      var newSet = {
        id: shortid.generate(),
        weight: '',
        reps: ''
      };

      this.setState({
        exercises: this.state.exercises.map((exercise, index) => {
          if (exercise.id !== exerciseId) {
            return exercise;
          }

          var sets = exercise.sets || [];

          return {
            ...exercise,
            sets: [...sets, newSet]
          }
        })
      });
    };
  }

  getGetOnRemoveSet(exerciseId) {
    return (setId) => {
      return () => {
        this.setState({
          exercises: this.state.exercises.map(function(exercise, index) {
            if (exercise.id !== exerciseId) {
              return exercise;
            }

            const setIndex = exercise.sets.findIndex(set => set.id === setId);

            return {
              ...exercise,
              sets: [
                ...exercise.sets.slice(0, setIndex), 
                ...exercise.sets.slice(setIndex + 1)
              ]
            }
          })
        })
      }
    }
  }

  getGetOnSetInputChange(exerciseId) {
    return (setId) => {
      return (inputName, value) => {
        this.setState({
          exercises: this.state.exercises.map((exercise, index) => {
            if (exercise.id !== exerciseId) {
              return exercise
            }

            return {
              ...exercise,
              sets: exercise.sets.map((set, index) => {
                if (set.id !== setId) {
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

  render() {
    const { workoutId } = this.props;

    return (
      <form className="workout-form" onSubmit={this.onFormSubmit}>
        <FieldGroup
          id="date"
          name="date"
          type="date"
          label="Date"
          value={this.state.date}
          onChange={this.onDateChange}
          placeholder="mm/dd/yyyy"
          ref={(input) => { this.firstField = input}}
        />
        <div className="exercises">
          <h2 className="form-header">Exercises</h2>
          {this.state.exercises.length > 0 &&
            <PanelGroup 
              activeKey={this.state.activeExercise} 
              onSelect={this.onExerciseSelect} 
              accordion
            >
              {this.state.exercises.map((exercise, index) => (
                <Panel 
                  header={exercise.name || `Exercise ${index + 1}`} 
                  eventKey={exercise.id}
                  key={exercise.id}
                >
                  <ExerciseForm 
                    exerciseId={exercise.id}
                    name={exercise.name}
                    sets={exercise.sets}
                    notes={exercise.notes}
                    onInputChange={this.getOnExerciseInputChange(exercise.id)}
                    onRemoveExercise={this.getOnRemoveExercise(exercise.id)}
                    onAddSet={this.getOnAddSet(exercise.id)}
                    getOnRemoveSet={this.getGetOnRemoveSet(exercise.id)}
                    getOnSetInputChange={this.getGetOnSetInputChange(exercise.id)}
                  />
                </Panel>
              ))}
            </PanelGroup>
          }
          <p className="add-item">
            <a href="#" onClick={this.onAddExerciseClick}>
              Add exercise
            </a>
          </p>
        </div>
        <ButtonToolbar>
          <Button type="submit" className="btn-primary">
            {workoutId === "new" ? "Log new" : "Update"} workout
          </Button>
          {workoutId !== "new" && (
            <LinkContainer to={{ pathname: "/workouts/new", query: { clone: workoutId } }}>
              <Button bsStyle="success">Repeat workout</Button>
            </LinkContainer>
          )}
          {workoutId !== "new" && (
            <Button bsStyle="danger" onClick={this.onDeleteWorkoutClick}>
              Delete workout
            </Button>
          )}
        </ButtonToolbar>
      </form>
    )
  }
}

WorkoutForm.propTypes = propTypes;
WorkoutForm.defaultProps = defaultProps;

export default WorkoutForm;
