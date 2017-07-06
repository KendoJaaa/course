import React, { Component } from 'react';
import Header from './Header.js'
import EditProfilePage from './EditProfilePage.js'
import CoursePage from './CoursePage.js'
import './InApp.css'

const coursesMock = [
  { name: 'a2202',
    description: 'ddddd',
    category: 'thai',
    subject: 'This is a book',
    time: '5 am to 6pm',
    numberOfStudent: '5'
  },
  { name: 'a2202',
    description: 'ddddd',
    category: 'thai',
    subject: 'This is a book',
    time: '5 am to 6pm',
    numberOfStudent: '5'
  },
  { name: 'a2202',
    description: 'ddddd',
    category: 'thai',
    subject: 'This is a book',
    time: '5 am to 6pm',
    numberOfStudent: '5'
  },
]

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
      return <CoursePage courses={coursesMock}/>
    } else if (this.state.page === 'edit-profile') {
      return <EditProfilePage />
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
