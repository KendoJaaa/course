
import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { Button, Form, FormGroup, Col, FormControl, ControlLabel,
  DropdownButton, MenuItem } from 'react-bootstrap'
import { courseTimes, courseCategories} from './courseData.js'

class CreateCoursePage extends Component {
  static propTypes = {
    onCreateCourse: PropTypes.func.isRequired
  }

  constructor (props) {
    super()
    this.state = {
      redirect: false,
      time: '',
      category: '',
    }
  }

  onDropdownSelect = (label) => (value) => {
    this.setState({ [label]: value})
  }

  onCreateCourse = () => {
    const newCourse = {
      name: this.name.value,
      description: this.description.value,
      category: this.state.category,
      subject: this.subject.value,
      time: this.state.time,
      numberOfStudent: this.numberOfStudent.value
    }

    const instance = axios.create({
      baseURL: 'http://localhost:8080/',
      timeout: 1000,
      headers: {'content-Type': 'application/json'},
    });
    instance.post('/create-course', JSON.stringify(newCourse))
      .then((response) => {
        console.log('========= create course successfully ===========')
        this.props.onCreateCourse(newCourse)
        this.setState({ redirect: true })
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  render() {
    return this.state.redirect
      ? <Redirect to='/courses' />
      : (<div
          className='edit-profile-page'
          style={{ width: '600px', margin: 'auto' }}
        >
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail" >
              <Col componentClass={ControlLabel} sm={2}>
                Name
              </Col>
              <Col sm={10}>
                <FormControl inputRef={ref => { this.name = ref }}/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail" >
              <Col componentClass={ControlLabel} sm={2}>
                Discription
              </Col>
              <Col sm={10}>
                <FormControl inputRef={ref => { this.description = ref }}/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail" >
              <Col componentClass={ControlLabel} sm={2}>
                Category
              </Col>
              <Col sm={10}>
                <DropdownButton
                  title={this.state.category || 'Select Category'}
                  id='category'
                  onSelect={this.onDropdownSelect('category')}
                >
                  {courseCategories.map((cat) => <MenuItem key={cat} eventKey={cat}>{cat}</MenuItem>)}
                </DropdownButton>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail" >
              <Col componentClass={ControlLabel} sm={2}>
                Subject
              </Col>
              <Col sm={10}>
                <FormControl inputRef={ref => { this.subject = ref }}/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail" >
              <Col componentClass={ControlLabel} sm={2}>
                Time
              </Col>
              <Col sm={10}>
                <DropdownButton
                  title={this.state.time || 'Select Time'}
                  id='time'
                  onSelect={this.onDropdownSelect('time')}
                >
                  {courseTimes.map((time) => <MenuItem key={time} eventKey={time}>{time}</MenuItem>)}
                </DropdownButton>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail" >
              <Col componentClass={ControlLabel} sm={2}>
                Number Of Student
              </Col>
              <Col sm={10}>
                <FormControl inputRef={ref => { this.numberOfStudent = ref }}/>
              </Col>
            </FormGroup>
          </Form>
          <div style={{ 'display':'flex', 'justifyContent':'center' }}>
            <Button onClick={this.onCreateCourse} type="submit">
              Create
            </Button>
          </div>
        </div>
      )
  }
}

export default CreateCoursePage
