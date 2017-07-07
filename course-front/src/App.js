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

  onLogin = (email, password) => {

    var instance = axios.create({
      baseURL: 'http://localhost:8080/',
      timeout: 1000,
      headers: {'content-Type': 'application/json'},
    });
    instance.post('/login', JSON.stringify({ email ,password }))
      .then(function (response) {
        console.log('kendo jaa 555', response.data, response.data === 'login success', typeof response.data)
        if (response.data === 'login success') {
          console.log('===== login success ======')
          this.setState({ login: true })
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

export default App;
