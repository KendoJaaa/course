import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
    console.log('kendo', this.props.showCreateButton)
    return (
      <div className='course-page'>
        {this.props.showCreateButton && (
            <Link to='/create-course'>
              <Button style={{ margin: '20px 0', float: 'right' }}>
                  Create Course
              </Button>
            </Link>
          )
        }
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
