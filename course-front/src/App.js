
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
      courses: [],
      error: false,
    }
  }

  componentDidMount = () => {
    if (localStorage.courseEmail && localStorage.courseAccessToken) {
      this.onLogin({ email: localStorage.courseEmail, accessToken: localStorage.courseAccessToken })
    }
  }

  onUpdateUser = (user) => {
    this.setState({ user })
  }

  onCreateCourse = (course) => {
    this.setState({ courses: [ ...this.state.courses, course ]})
  }

  onLogOut = () => {
    this.setState({ user: null, courses: [ ] })
    localStorage.setItem('courseEmail', undefined)
    localStorage.setItem('courseAccessToken', undefined)
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
          console.log('===== login successfully ======', response.data)
          const user = response.data.user
          const courses = response.data.courses
          this.setState({ user, courses })
          localStorage.setItem('courseEmail', user.email )
          localStorage.setItem('courseAccessToken', user.access_token)
        } else {
          console.log('===== login failed ======')
          if (!accessToken) { this.setState({ error: true }) }
        }
      })
      .catch(function (error) {
        if (!accessToken) { this.setState({ error: true }) }
        console.error(error)
      })
  }

  render () {
    const renderCoursePage = () => (<CoursePage
        courses={this.state.courses} showCreateButton={this.state.user && this.state.user.role === 'teacher'} />
    )
    const login = !!this.state.user
    return (
      <Router>
        <div>
          <Header
            onLogOut={this.onLogOut}
            login={login}
          />
          <Route
            path='/login'
            render={(props) => <LoginPage
              onLogin={this.onLogin}
              login={login}
              error={this.state.error}
              {...props}
            />}
          />
          <PrivateRoute path='/' exact render={renderCoursePage} login={login} />
          <PrivateRoute path='/courses' render={renderCoursePage} login={login} />
          <PrivateRoute path='/edit-profile' render={() =>
            (<EditProfilePage user={this.state.user} onUpdateUser={this.onUpdateUser} />)} login={login} />
          <PrivateRoute path='/create-course' render={() =>
            (<CreateCoursePage onCreateCourse={this.onCreateCourse} />)} login={login} />
        </div>
      </Router>
    )
  }
}

export default App
