import React from 'react';
import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Home() {
  return (
    <Row>
      <Col xs={12}>
        <h1>Track your gainz.</h1>
        <p>Some compelling marketing pitch about how my app makes the world a better place will go here.</p>
        <ButtonToolbar>
          <LinkContainer to="/signup">
            <Button bsStyle="primary">Sign Up</Button>
          </LinkContainer>
          <LinkContainer to="/login">
            <Button>Log In</Button>
          </LinkContainer>
        </ButtonToolbar>
      </Col>
    </Row>
  );
}

export default Home;