import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import FieldGroup from './FieldGroup';

const propTypes = {
  order: PropTypes.number.isRequired,
  weight: PropTypes.string,
  reps: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onRemoveSet: PropTypes.func.isRequired,
  getInputName: PropTypes.func.isRequired
};

const defaultProps = {
  weight: '',
  reps: ''
};

class SetForm extends Component {
  constructor(props) {
    super(props);

    this.onRemoveSetClick = this.onRemoveSetClick.bind(this);
  }

  componentDidMount() {
    this.firstField.focus();
  }

  onRemoveSetClick(e) {
    e.preventDefault();

    this.props.onRemoveSet();
  }

  render() {
    const { order, weight, reps, onInputChange, getInputName } = this.props;

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
              <a 
                href="#remove-set-{order}" 
                onClick={this.onRemoveSetClick} 
                className="text-danger"
              >
                Remove
              </a>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

SetForm.propTypes = propTypes;
SetForm.defaultProps = defaultProps;

export default SetForm;
