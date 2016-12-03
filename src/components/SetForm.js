import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FieldGroup from './FieldGroup';

class SetForm extends Component {
  constructor(props) {
    super(props);

    this.handleRemoveSetClick = this.handleRemoveSetClick.bind(this);
  }

  componentDidMount() {
    this.firstField.focus();
  }

  handleRemoveSetClick(e) {
    e.preventDefault();

    this.props.removeSet();
  }

  render() {
    const {order, weight, reps, getInputName, onInputChange} = this.props;

    return (
      <div className="set-form">
        <Row>
          <Col className="col-xs-2">
            <label className="row-label">Set {order}</label>
          </Col>
          <Col className="col-xs-4 col-collapse-right">
            <FieldGroup
              id={getInputName('weight')}
              name={getInputName('weight')}
              type="number"
              min="0"
              step="5"
              label="Weight"
              srOnly={true}
              value={weight}
              placeholder="Weight"
              suffix="lbs"
              onChange={(e) => onInputChange("weight", e.target.value)}
              ref={(input) => { this.firstField = input }}
            />
          </Col>
          <Col className="col-xs-4 col-collapse-right">
            <FieldGroup
              id={getInputName('reps')}
              name={getInputName('reps')}
              type="number"
              min="0"
              label="Reps"
              srOnly={true}
              value={reps}
              placeholder="Reps"
              suffix="reps"
              onChange={(e) => onInputChange("reps", e.target.value)}
            />
          </Col>
          <Col className="col-xs-2">
            <div className="remove-set">
              <a href="#remove-set-{order}" onClick={this.handleRemoveSetClick} className="text-danger">
                Remove
              </a>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SetForm;
