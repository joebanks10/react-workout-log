import React, { Component } from 'react';
import { Row, Col, Button, Panel, Alert } from 'react-bootstrap';
import FieldGroup from '../components/FieldGroup';
import firebase from 'firebase';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      message: '',
      isLoading: false
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    var email = this.state.email;
    var password = this.state.password;

    this.setState({
      isLoading: true
    });

    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      this.setState({
        message: error.message,
        isLoading: false
      });
    });
  }

  render() {
    return (
      <Row>
        <Col xs={4}>
          <h1>Sign up! It's free.</h1>
          {this.state.message && (
            <Alert bsStyle="danger">{this.state.message}</Alert>
          )}
          <Panel>
            <form 
              className="signup-form" 
              onSubmit={!this.state.isLoading ? this.onSubmit : null}
            >
              <FieldGroup
                id="email"
                name="email"
                type="email"
                label="Email"
                value={this.state.email}
                onChange={this.onEmailChange}
                ref={(input) => { this.firstField = input}}
              />
              <FieldGroup
                id="password"
                name="password"
                type="password"
                label="Password"
                value={this.state.password}
                onChange={this.onPasswordChange}
              />
              <Button 
                type="submit" 
                disabled={this.state.isLoading}
                className="btn-primary"
              >
                {!this.state.isLoading ? 'Create account' : 'Loading...'}
              </Button>
            </form>
          </Panel>
        </Col>
      </Row>
    );
  }
}

export default SignUpForm;
