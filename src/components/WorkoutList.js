import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';

class WorkoutList extends Component {
  render() {
    const { workouts, activeWorkout, onWorkoutClick } = this.props;
    const activeId = activeWorkout ? activeWorkout.id : -1;

    return (
      <ListGroup>
        {workouts.length > 0 && (
          <ListGroupItem
            header="New workout"
            active={!activeWorkout}
            className="new-workout-btn"
            onClick={(e) => {
              onWorkoutClick(-1);
              e.preventDefault();
            }}
          >
          </ListGroupItem>
        )}
        {workouts.length > 0 ? workouts.map((workout, index) => (
          <ListGroupItem 
            key={`workout-${workout.id}`}
            header={moment(workout.date).format("ddd., MMM. D YYYY")}
            active={workout.id === activeId}
            onClick={(e) => {
              onWorkoutClick(workout.id);
              e.preventDefault();
            }}
          >
            <span className="details">
              {workout.exercises.map(exercise => exercise.name).join(', ') || "You didn't log any exercises."}
            </span>
          </ListGroupItem>
        )) :  (
          <ListGroupItem 
            header="You haven't logged any workouts yet">
            <span className="details">
              Log your first workout to get started!
            </span>
          </ListGroupItem>
        )}
      </ListGroup>
    )
  }
}

export default WorkoutList;