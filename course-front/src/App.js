import React, { Component } from 'react';
import LoginPage from './LoginPage.js'
import InApp from './InApp.js'
import axios from 'axios'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      courses: [],
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
    return (
      <div className="App">
        {this.state.user
          ? <InApp user={this.state.user}/>
          : <LoginPage onLogin={this.onLogin} />
        }
      </div>
    );
  }
}

export default App
