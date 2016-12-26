import React from 'react';
import { Link } from 'react-router';
import { Grid, Navbar } from 'react-bootstrap';

function BaseLayout(props) {
  const title = props.title || props.route.title || 'My App';

  return (
    <div>
      <Navbar inverse id="header">
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">{title}</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Grid>
      </Navbar>
      <Grid id="main">
        {props.children}
      </Grid>
    </div>
  );
}

export default BaseLayout;
