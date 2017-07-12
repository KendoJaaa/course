import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, Button, NavDropdown, MenuItem, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Header extends Component {
  static propTypes = {
    login: PropTypes.bool.isRequired,
    onLogOut: PropTypes.func.isRequired,
    name: PropTypes.string,
  }

  onClick = (path) => () => {
    window.location.href = '/' + path
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            ABC School
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem onClick={this.onClick('courses')} eventKey={1} href="#">
              Courses
            </NavItem>
          </Nav>
          { this.props.login && (
            <Nav pullRight>
              <NavDropdown eventKey={3} title={this.props.name} id='basic-nav-dropdown'>
                <MenuItem eventKey={1} onClick={this.onClick('edit-profile')}>
                  Edit Profile
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={1} onClick={this.props.onLogOut}>
                  Log out
                </MenuItem>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header
