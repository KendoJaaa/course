import React, { Component } from 'react';
import LoginPage from './LoginPage.js'
import InApp from './InApp.js'
import axios from 'axios'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      login: false
    }
  }

  componentDidMount = () => {
    console.log('kendo did mount again')
  }

  onLogin = (email, password) => {
    const instance = axios.create({
      baseURL: 'http://localhost:8080/',
      timeout: 1000,
      headers: {'content-Type': 'application/json'},
    });
    instance.post('/login', JSON.stringify({ email ,password }))
      .then((response) => {
        if (response.data === 'login success') {
          console.log('===== login success before======')
          this.setState({ login: true })
          console.log('===== login success after======')
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
        {this.state.login
          ? <InApp />
          : <LoginPage onLogin={this.onLogin} />
        }
      </div>
    );
  }
}

export default App
