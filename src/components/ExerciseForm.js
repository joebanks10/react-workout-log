import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import FieldGroup from './FieldGroup';

import SetForm from './SetForm';

class ExerciseForm extends Component {
  constructor(props) {
    super(props);

    this.inputPrefix = `exercise[${this.props.id}]`;

    this.handleAddSetClick = this.handleAddSetClick.bind(this);
    this.handleRemoveExerciseClick = this.handleRemoveExerciseClick.bind(this);
  }

  componentDidMount() {
    this.firstField.focus();
  }

  getInputName(name) {
    return `${this.inputPrefix}[${name}]`;
  }

  getSetInputName(setId) {
    return name => `${this.inputPrefix}[set][${setId}][${name}]`
  }

  handleAddSetClick(e) {
    e.preventDefault();

    this.props.addSet();
  }

  handleRemoveExerciseClick(e) {
    e.preventDefault();

    this.props.removeExercise();
  }

  render() {
    const {name, sets, notes, onInputChange, onSetInputChange, removeSet} = this.props;

    return (
      <div className="exercise-form">
        <FieldGroup
          id={this.getInputName('name')}
          name={this.getInputName('name')}
          type="text"
          label="Exercise"
          value={name}
          placeholder="Enter exercise name"
          onChange={(e) => onInputChange("name", e.target.value)}
          ref={(input) => { this.firstField = input }}
        />

        <h3 className="form-header">Sets</h3>
        {sets.length > 0 &&
          <ListGroup className="sets">
            {sets.map((set, i) => (
              <ListGroupItem key={`set-${i}`}>
                <SetForm
                  order={i+1}
                  weight={set.weight}
                  reps={set.reps}
                  getInputName={this.getSetInputName(i)}
                  onInputChange={onSetInputChange(i)}
                  removeSet={removeSet(i)}
                />
              </ListGroupItem>
            ))}
          </ListGroup>
        }
        <p className="add-item">
          <a href="#" onClick={this.handleAddSetClick}>Add set</a>
        </p>

        <FieldGroup
          id={this.getInputName('notes')}
          name={this.getInputName('notes')}
          componentClass="textarea"
          label="Notes"
          value={notes}
          onChange={(e) => onInputChange("notes", e.target.value)}
        />
        <p className="remove-item remove-exercise">
          <a href="#remove-exercise" onClick={this.handleRemoveExerciseClick} className="text-danger">Remove exercise</a>
        </p>
      </div>
    )
  }
}

ExerciseForm.defaultProps = {
  name: "",
  sets: [],
  notes: ""
};

export default ExerciseForm