import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import moment from 'moment';

class WorkoutList extends Component {
  render() {
    const { workouts, activeWorkout } = this.props;

    return (
      <ListGroup>
        {workouts.length > 0 && (
          <LinkContainer to="/workouts/new">
            <ListGroupItem
              header="New workout"
              active={activeWorkout.id === -1}
              className="new-workout-btn"
            >
            </ListGroupItem>
          </LinkContainer>
        )}
        {workouts.length > 0 ? workouts.map((workout, index) => (
          <LinkContainer to={`/workouts/${workout.id}`} key={workout.id}>
            <ListGroupItem 
              header={moment(workout.date).format("ddd., MMM. D YYYY")}
              active={workout.id === activeWorkout.id}
            >
              <span className="details">
                {workout.exercises.map(exercise => exercise.name).join(', ') || "You didn't log any exercises."}
              </span>
            </ListGroupItem>
          </LinkContainer>
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