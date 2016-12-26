import React from 'react';
import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Home() {
  return (
    <Row>
      <Col xs={12}>
        <h1>Track your gainz</h1>
        <p>Some compelling BS about how my app makes the world a better place will go here.</p>
        <ButtonToolbar>
          <LinkContainer to="/sign-up">
            <Button bsStyle="primary">Sign Up</Button>
          </LinkContainer>
          <LinkContainer to="/log-in">
            <Button>Log In</Button>
          </LinkContainer>
        </ButtonToolbar>
      </Col>
    </Row>
  );
}

export default Home;