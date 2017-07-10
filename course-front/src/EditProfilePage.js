import React, { Component } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

import { Button, Form, FormGroup, Col, FormControl, ControlLabel,
  DropdownButton, MenuItem } from 'react-bootstrap'

class EditProfilePage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    onUpdateUser: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    this['First Name'].value = this.props.user.first_name
    this['Last Name'].value = this.props.user.last_name
    this['Nickname'].value = this.props.user.nickname
    this['Birthday'].value = this.props.user.birthday
    this['Gender'].value = this.props.user.gender
  }

  onUpdateProfile = () => {
    const updatedUser = {
      ...this.props.user,
      first_name: this['First Name'].value,
      last_name: this['Last Name'].value,
      nickname: this['Nickname'].value,
      birthday: this['Birthday'].value,
      gender: this['Gender'].value
    }
    const instance = axios.create({
      baseURL: 'http://localhost:8080/',
      timeout: 1000,
      headers: {'content-Type': 'application/json'},
    });
    instance.post('/update-profile', JSON.stringify(updatedUser))
      .then((response) => {
        console.log('========= update profile successfully ===========')
        this.props.onUpdateUser(updatedUser)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  renderRow = (label) => {
    return <FormGroup controlId="formHorizontalEmail" >
      <Col componentClass={ControlLabel} sm={2}>
        {label}
      </Col>
      <Col sm={10}>
        <FormControl inputRef={ref => { this[label] = ref }}/>
      </Col>
    </FormGroup>
  }

  render() {
    const user = this.props.user
    return (
      <div
          className='edit-profile-page'
          style={{ width: '600px', margin: 'auto' }}
        >
          <Form horizontal>
            {[ 'First Name', 'Last Name', 'Nickname', 'Birthday', 'Gender' ].map((label)=> this.renderRow(label))}
          </Form>
          <div style={{ 'display':'flex', 'justifyContent':'center' }}>
            <Button onClick={this.onUpdateProfile} type="submit">
              Update
            </Button>
          </div>
        </div>
    );
  }
}

export default EditProfilePage;
