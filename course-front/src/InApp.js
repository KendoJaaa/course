import React, { Component } from 'react';
import Header from './Header.js'
import EditProfilePage from './EditProfilePage.js'
import CreateCoursePage from './CreateCoursePage.js'
import CoursePage from './CoursePage.js'
import PropTypes from 'prop-types'
import './InApp.css'

class InApp extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired
  }

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
      return <CoursePage
        onGotoCreatePage={this.props.role === 'teacher' && (() => this.onChangeMenu('create-course'))}
        courses={this.props.courses}
      />
    } else if (this.state.page === 'create-course') {
      return <CreateCoursePage />
    } else if (this.state.page === 'edit-profile') {
      return <EditProfilePage user={this.props.user}/>
    }
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Header onChangeMenu={this.onChangeMenu} />
        <div style={{ margin: '50px 100px' }}>
          {this.renderPage()}
        </div>
      </div>
    );
  }
}

export default InApp;
