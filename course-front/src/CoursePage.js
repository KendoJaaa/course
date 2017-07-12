import React, { Component } from 'react';
import _ from 'lodash'
import { Table, Button, DropdownButton, MenuItem, Panel,
  Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { courseTimes } from './courseData.js'

class CoursePage extends Component {
  static propTypes = {
    showCreateButton: PropTypes.bool,
    courses: PropTypes.array
  }

  constructor () {
    super()
    this.state = {
      searchName: '',
      searchTime: '',
    }
  }

  onSelectSearchTime = (time) => {
    this.setState({ searchTime: time })
  }

  onSearchChange = (e) => {
    this.setState({ searchName: e.target.value })
  }

  renderCourse = (course, key) => {
    return  <tr key={key}>
      <td>{course.name}</td>
      <td>{course.description}</td>
      <td>{course.category}</td>
      <td>{course.subject}</td>
      <td>{course.time}</td>
      <td>{course.numberOfStudent}</td>
    </tr>
  }

  render() {
    const filteredCourse = _.filter(this.props.courses, (course) => {
      return _.includes(course.name, this.state.searchName) && ( course.time === this.state.searchTime || this.state.searchTime === '' )
    })

    return (
      <div className='course-page' style={{ margin: '20px 150px' }}>
        <div
          className='course-page-header'
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h5><b>Search:</b></h5>{' '}
            <div style={{ border: '1px solid #ddd', padding: '5px', borderRadius: '5px' }}>
              <Form inline>
                <FormGroup>
                  <ControlLabel>Name</ControlLabel>
                  {' '}
                  <input type='text' className='form-control' onChange={this.onSearchChange} />
                </FormGroup>
                {' '}
                <FormGroup>
                  <ControlLabel>Time</ControlLabel>
                  {' '}
                  <DropdownButton title={this.state.searchTime || 'Select Time'} id='time-dropdown' onSelect={this.onSelectSearchTime}>
                    {courseTimes.map((time) => <MenuItem key={time} eventKey={time}>{time}</MenuItem>)}
                  </DropdownButton>
                </FormGroup>
              </Form>
            </div>
          </div>
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
            {filteredCourse.map((course, key) => this.renderCourse(course, key))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CoursePage;
