
import React, { Component } from 'react';
import TextForm from './TextForm.js'

class CreateCoursePage extends Component {
  render() {
    return (
      <TextForm
        labels={[ 'Name', 'Discription', 'Category', 'Subject', 'Time', 'Number of Student' ]}
        buttonLabel='Create'
      />
    );
  }
}

export default CreateCoursePage
