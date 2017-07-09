
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
      login: false,
      role: ''
    }
  }

  componentDidMount = () => {
    console.log('kendo did mount again')
  }

  onUpdateUser = (user) => {
    this.setState({ user })
  }

  onOnAddCourse = (course) => {
    this.setState({ courses: [ ...this.state.courses, course ]})
  }

  onLogin = (email, password) => {
    const instance = axios.create({
      baseURL: 'http://localhost:8080/',
      timeout: 1000,
      headers: {'content-Type': 'application/json'},
    });
    instance.post('/login', JSON.stringify({ email ,password }))
      .then((response) => {
        if (response.data === 'login success teacher') {
          console.log('===== login success teacher ======')
          this.setState({
            login: true,
            role: 'teacher'
          })
        } else if (response.data === 'login success student') {
          console.log('===== login success student ======')
          this.setState({
            login: true,
            role: 'student'
          })
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
            render={(props) => <LoginPage onLogin={this.onLogin} login={this.state.login} {...props} />}
          />
          <PrivateRoute path='/' exact render={() => (<CoursePage courses={courses} />)} login={this.state.login} />
          <PrivateRoute path='/course' render={() => (<CoursePage courses={courses} />)} login={this.state.login} />
          <PrivateRoute path='/edit-profile' component={EditProfilePage} login={this.state.login} />
          <PrivateRoute path='/create-course' component={CreateCoursePage} login={this.state.login} />
        </div>
      </Router>
    );
  }
}

export default App
