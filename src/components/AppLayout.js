import React, { Component } from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';

class AppLayout extends Component {
  constructor(props) {
    super(props);

    this.onLogOutClick = this.onLogOutClick.bind(this);
  }

  onLogOutClick(e) {
    e.preventDefault();

    this.props.logOut();
  }

  render() {
    const { title, isLoggedIn } = this.props;

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
            <Navbar.Collapse>
              <Nav pullRight>
                {isLoggedIn && (
                  <NavItem eventKey={1} href="#" onClick={this.onLogOutClick}>Log out</NavItem>
                )}
              </Nav>
            </Navbar.Collapse>
          </Grid>
        </Navbar>
        <Grid id="main">
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

export default AppLayout;
