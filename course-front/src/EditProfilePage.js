import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextForm from './TextForm.js'
import axios from 'axios'

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

  render() {
    const user = this.props.user
    return (
      <TextForm
        labels={[ 'First name', 'Last Name', 'Nickname', 'Birthday', 'Gender' ]}
        buttonLabel='Update'
        defaultValues={[ user.first_name, user.last_name, user.nickname, user.birthday, user.gender ]}
        onSubmit={this.onUpdateProfile}
      />
    );
  }
}

export default EditProfilePage;
