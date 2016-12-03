import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';

class WorkoutList extends Component {
  render() {
    const { workouts } = this.props;

    return (
      <ListGroup>
        {workouts.length > 0 ? workouts.map((workout, index) => (
          <ListGroupItem 
            key={`workout-${index}`}
            header={moment(workout.date).format("ddd., MMM. D YYYY")}>
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