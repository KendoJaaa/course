import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TextForm from './TextForm.js'

class EditProfilePage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render() {
    const user = this.props.user
    return (
      <TextForm
        labels={[ 'First name', 'Last Name', 'Nickname', 'Birthday', 'Gender' ]}
        buttonLabel='Update'
        values={[ user.first_name, user.last_name, user.nickname, user.birthday, user.gender ]}
      />
    );
  }
}

export default EditProfilePage;
