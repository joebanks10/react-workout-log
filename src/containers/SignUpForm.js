import React, { Component } from 'react';
import { Row, Col, Button, Panel } from 'react-bootstrap';
import FieldGroup from '../components/FieldGroup';
import firebase from 'firebase';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      message: ''
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
      } else {
        console.log('No user signed in.');
      }
    });
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

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      this.setState({
        message: errorMessage
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
            <form className="signup-form" onSubmit={this.onSubmit}>
              <FieldGroup
                id="email"
                name="email"
                type="email"
                label="Email"
                value={this.state.username}
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
              <Button type="submit" className="btn-primary">
                Create account
              </Button>
            </form>
          </Panel>
        </Col>
      </Row>
    );
  }
}

export default SignUpForm;
