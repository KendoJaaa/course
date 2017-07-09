import React, { Component } from 'react';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap'
import PropTypes from 'prop-types'

class TextForm extends Component {

  static propTypes = {
    labels: PropTypes.array,
    defaultValues: PropTypes.array,
    buttonLabel: PropTypes.string,
    onSubmit: PropTypes.func,
  }

  componentDidMount = () => {
    if (this.props.defaultValues) {
      this.props.defaultValues.map((value, index) => {
        this[index].value = value
      })
    }
  }

  constructor(props) {
    super(props)
  }

  renderFormRow = (label, index) => {
    return (
      <FormGroup controlId="formHorizontalEmail" key={label}>
        <Col componentClass={ControlLabel} sm={2}>
          {label}
        </Col>
        <Col sm={10}>
          <FormControl inputRef={ref => { this[index] = ref }}/>
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
          {this.props.labels.map((label, index) => this.renderFormRow(label, index))}
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
