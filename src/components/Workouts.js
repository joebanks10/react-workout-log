import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';

import WorkoutForm from '../containers/WorkoutForm';
import WorkoutList from './WorkoutList';

function Workouts(props) {
  const { workouts, activeWorkout, onAddWorkout, onUpdateWorkout, onDeleteWorkout } = props;

  return (
    <Row>
      <Col md={4}>
        <WorkoutList 
          workouts={workouts}
          activeWorkout={activeWorkout}
        />
      </Col>
      <Col md={8}>
        <Panel>
          {<h1 className="page-title">{activeWorkout.id !== "new" ? "Edit workout" : "New workout"}</h1>}
          <WorkoutForm 
            workoutId={activeWorkout.id}
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
