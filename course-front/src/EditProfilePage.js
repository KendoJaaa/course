import React, { Component } from 'react';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap'
import TextForm from './TextForm.js'

class EditProfilePage extends Component {
  render() {
    return (
      <TextForm
        labels={[ 'First name', 'Last Name', 'Nickname', 'Birthday', 'Gender' ]}
        buttonLabel='Update'
      />
    );
  }
}

export default EditProfilePage;
