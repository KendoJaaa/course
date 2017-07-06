import React, { Component } from 'react';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap'
import PropTypes from 'prop-types'

class TextForm extends Component {

  static propTypes = {
    labels: PropTypes.array,
    values: PropTypes.array,
    buttonLabel: PropTypes.string,
    onSubmit: PropTypes.func,
  }

  renderFormRow = (label) => {
    return (
      <FormGroup controlId="formHorizontalEmail" key={label}>
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
          {this.props.labels.map((label) => this.renderFormRow(label))}
        </Form>
        <div style={{ 'display':'flex', 'justifyContent':'center' }}>
          <Button onClick={this.props.onSubmit} type="submit">
            {this.props.buttonLabel}
          </Button>
        </div>
      </div>
    );
  }
}

export default TextForm;
