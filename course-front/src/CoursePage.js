import React, { Component } from 'react';
import { Table, Button, DropdownButton, MenuItem,
  Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { courseTimes } from './courseData.js'

class CoursePage extends Component {
  static propTypes = {
    showCreateButton: PropTypes.bool,
    courses: PropTypes.array
  }

  renderCourse = (course) => {
    return  <tr key={course._id}>
      <td>{course.name}</td>
      <td>{course.description}</td>
      <td>{course.category}</td>
      <td>{course.subject}</td>
      <td>{course.time}</td>
      <td>{course.numberOfStudent}</td>
    </tr>
  }

  render() {
    return (
      <div className='course-page' style={{ margin: '20px 150px' }}>
        <div
          className='course-page-header'
          style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}
        >
          <Form inline>
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              {' '}
              <FormControl type='text' />
            </FormGroup>
            {' '}
            <FormGroup>
              <ControlLabel>Time</ControlLabel>
              {' '}
              <DropdownButton title='Select Time' id='time-dropdown'>
                {courseTimes.map((time) => <MenuItem key={time} eventKey={time}>{time}</MenuItem>)}
              </DropdownButton>
            </FormGroup>
            {' '}
            <Button>
              Search
            </Button>
          </Form>
          {this.props.showCreateButton && (
              <Link to='/create-course'>
                <Button>
                    Create Course
                </Button>
              </Link>
            )
          }
        </div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Subject</th>
              <th>Start-end Time</th>
              <th>Number of Student</th>
            </tr>
          </thead>
          <tbody>
            {this.props.courses.map((course) => this.renderCourse(course))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CoursePage;
