import React, { Component } from 'react';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap'
import PropTypes from 'prop-types'

const labels = [ 'First name', 'Last Name', 'Nickname', 'Birthday', 'Gender' ]

class TextForm extends Component {

  static propTypes = {
    labels: PropTypes.array,
    values: PropTypes.array,
    buttonLabel: PropTypes.string,
    onSubmit: PropTypes.func,
  }

  renderFormRow = (label) => {
    return (
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={2}>
          {label}
        </Col>
        <Col sm={10}>
          <FormControl type="email" placeholder="Email" />
        </Col>
      </FormGroup>
    )
  }

  render() {
    return (
      <div
        className='edit-profile-page'
        style={{ width: '600px', margin: 'auto' }}
      >
        <Form horizontal>
          {labels.map((label) => this.renderFormRow(label))}
        </Form>
        <div style={{ 'display':'flex', 'justify-content':'center' }}>
          <Button onClick={this.props.onSubmit} type="submit">
            Update
          </Button>
        </div>
      </div>
    );
  }
}

export default TextForm;
