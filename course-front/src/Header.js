import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Header extends Component {
  static propTypes = {
    login: PropTypes.bool.isRequired,
    onLogOut: PropTypes.func.isRequired,
  }

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
          <Link to='/courses'>
            <Nav>
              Course
            </Nav>
          </Link>
          <Link to='/edit-profile'>
            <Nav>
              Edit Profile
            </Nav>
          </Link>
          { this.props.login && (
            <Button onClick={this.props.onLogOut}>
              <Nav pullRight>
                Logout
              </Nav>
            </Button>
          )}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header
