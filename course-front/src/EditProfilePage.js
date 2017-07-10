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

  onUpdateProfile = (data) => {
    const updatedUser = {
      ...this.props.user,
      first_name: data[0].value,
      last_name: data[1].value,
      nickname: data[2].value,
      birthday: data[3].value,
      gender: data[4].value
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
        <FormControl inputRef={ref => { this.name = ref }}/>
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
            {[ 'First name', 'Last Name', 'Nickname', 'Birthday', 'Gender' ].map((label)=> this.renderRow(label))}
          </Form>
          <div style={{ 'display':'flex', 'justifyContent':'center' }}>
            <Button onClick={() => this.onCreateCourse} type="submit">
              Update
            </Button>
          </div>
        </div>
    );
  }
}

export default EditProfilePage;
