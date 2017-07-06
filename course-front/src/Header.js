import React, { Component } from 'react';
import { Navbar, NavItem, Nav,  } from 'react-bootstrap'
import PropTypes from 'prop-types'

class Header extends Component {

  static propTypes = {
    onChangeMenu: PropTypes.func
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
          <Nav>
            <NavItem
              onSelect={() => this.props.onChangeMenu('course')}
              eventKey={1}
            >
              Course
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem
              onSelect={() => this.props.onChangeMenu('edit-profile')}
              eventKey={1}
            >
              Edit Profile
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header
