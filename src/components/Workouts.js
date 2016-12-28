import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';

import WorkoutForm from '../containers/WorkoutForm';
import WorkoutList from './WorkoutList';

function Workouts(props) {
  const { workouts, activeWorkout, isNewWorkout, onAddWorkout, onUpdateWorkout, onDeleteWorkout } = props;

  return (
    <Row>
      <Col md={4}>
        <WorkoutList workouts={workouts} />
      </Col>
      <Col md={8}>
        <Panel>
          {<h1 className="page-title">{isNewWorkout ? "New workout" : "Edit workout"}</h1>}
          <WorkoutForm 
            workoutId={activeWorkout.id}
            isNewWorkout={isNewWorkout}
            date={activeWorkout.date}
            exercises={activeWorkout.exercises}
            addWorkout={onAddWorkout}
            updateWorkout={onUpdateWorkout}
            deleteWorkout={onDeleteWorkout}
          />
        </Panel>
      </Col>
    </Row>
  );
}

export default Workouts;
