import React, { Component } from 'react';
import { Navbar, NavItem, Nav,  } from 'react-bootstrap'

class LoginForm extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">ABC School</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">Course</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Edit Profile</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default LoginForm;
