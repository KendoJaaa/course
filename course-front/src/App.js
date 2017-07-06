import React, { Component } from 'react';
import LoginPage from './LoginPage.js'
import InApp from './InApp.js'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      login: false
    }
  }

  onLogin = (email, password) => {
    console.log('kendo jaa', email, password)
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
