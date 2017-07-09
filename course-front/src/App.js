
import './App.css'

import React, { Component } from 'react'
import axios from 'axios'

// navigation
import Header from './Header.js'

// All Pages
import LoginPage from './LoginPage.js'
import CoursePage from './CoursePage.js'
import EditProfilePage from './EditProfilePage.js'
import CreateCoursePage from './CreateCoursePage.js'

// Routing
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute.js'



class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
    }
  }

  componentDidMount = () => {
    console.log('kendo did mount again', localStorage)
    if (localStorage.courseEmail && localStorage.courseAccessToken) {
      this.onLogin({ email: localStorage.courseEmail, accessToken: localStorage.courseAccessToken })
    }
  }

  onUpdateUser = (user) => {
    this.setState({ user })
  }

  onOnAddCourse = (course) => {
    this.setState({ courses: [ ...this.state.courses, course ]})
  }

  onLogin = ({ email, password, accessToken }) => {
    const instance = axios.create({
      baseURL: 'http://localhost:8080/',
      timeout: 1000,
      headers: {'content-Type': 'application/json'},
    });

    let payload
    if (password) {
      payload = { email, password }
    } else {
      payload = { email, accessToken }
    }
    instance.post('/login', JSON.stringify(payload))
      .then((response) => {
        if (response.data !== 'login fail') {
          console.log('===== login successfully ======')
          const user = response.data
          this.setState({ user })
          localStorage.setItem('courseEmail', user.email )
          localStorage.setItem('courseAccessToken', user.access_token)
        } else {
          console.log('===== login failed ======')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    const courses = [{ name: 'fuck', description: 'ja', category: 'her', subject: 'suck', startEndTime: 'kak', numberOfStudent: '20'}]
    return (
      <Router>
        <div>
          <Header />
          <Route
            path='/login'
            render={(props) => <LoginPage onLogin={this.onLogin} login={!!this.state.user} {...props} />}
          />
          <PrivateRoute path='/' exact render={() => (<CoursePage courses={courses} />)} login={!!this.state.user} />
          <PrivateRoute path='/course' render={() => (<CoursePage courses={courses} />)} login={!!this.state.user} />
          <PrivateRoute path='/edit-profile' component={EditProfilePage} login={!!this.state.user} />
          <PrivateRoute path='/create-course' component={CreateCoursePage} login={!!this.state.user} />
        </div>
      </Router>
    );
  }
}

export default App
