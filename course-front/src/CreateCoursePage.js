
import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types'
import TextForm from './TextForm.js'
import { Redirect } from 'react-router-dom'

class CreateCoursePage extends Component {
  static propTypes = {
    onCreateCourse: PropTypes.func.isRequired
  }

  constructor (props) {
    super()
    this.state = {
      redirect: false
    }
  }

  onCreateCourse = (data) => {
    const newCourse = {
      name: data[0].value,
      description: data[1].value,
      category: data[2].value,
      subject: data[3].value,
      time: data[4].value,
      numberOfStudent: data[5].value
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
      : <TextForm
          labels={[ 'Name', 'Discription', 'Category', 'Subject', 'Time', 'Number of Student' ]}
          buttonLabel='Create'
          onSubmit={this.onCreateCourse}
        />
  }
}

export default CreateCoursePage
