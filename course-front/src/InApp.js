import React, { Component } from 'react';
import Header from './Header.js'
import EditProfilePage from './EditProfilePage.js'
import CoursePage from './CoursePage.js'
import './InApp.css'

class InApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 'course'
    }
  }

  onChangeMenu = (menu) => {
    this.setState({ page: menu })
  }

  renderPage = () => {
    if (this.state.page === 'course') {
      return <CoursePage />
    } else if (this.state.page === 'edit-profile') {
      return <EditProfilePage />
    }
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Header onChangeMenu={this.onChangeMenu} />
        {this.renderPage()}
      </div>
    );
  }
}

export default InApp;
