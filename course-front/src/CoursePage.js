import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

class CoursePage extends Component {
  static propTypes = {
    onGotoCreatePage: PropTypes.any,
    courses: PropTypes.array
  }

  renderCourse = (course) => {
    return  <tr key={course.name}>
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
      <div className='course-page'>
        {this.props.onGotoCreatePage && <Button
          style={{ margin: '20px 0', float: 'right' }}
          onClick={this.props.onGotoCreatePage}
          >
            Create Course
          </Button>
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
