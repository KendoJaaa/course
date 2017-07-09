import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Header extends Component {
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
          <Link to='/course'>
            <Nav>
              Course
            </Nav>
          </Link>
          <Link to='/edit-profile'>
            <Nav>
              Edit Profile
            </Nav>
          </Link>
          <Button onClick={this.props.onLogOut}>
            <Nav pullRight>
              Logout
            </Nav>
          </Button>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header
