import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, FormControl, HelpBlock, InputGroup } from 'react-bootstrap';

class FieldGroup extends Component {
  focus() {
    ReactDOM.findDOMNode(this.formControl).focus();
  }

  render() {
    const { id, label, srOnly, help, prefix, suffix, ...props } = this.props;

    const field = (prefix || suffix) ? (
      <InputGroup>
        {prefix && <InputGroup.Addon>{prefix}</InputGroup.Addon>}
        <FormControl {...props} ref={(input) => { this.formControl = input }} />
        {suffix && <InputGroup.Addon>{suffix}</InputGroup.Addon>}
      </InputGroup>
    ) : (
      <FormControl {...props} ref={(input) => { this.formControl = input }} />
    );

    return (
      <FormGroup controlId={id}>
        <ControlLabel srOnly={srOnly}>{label}</ControlLabel>
        {field}
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    )
  }
}

export default FieldGroup;
