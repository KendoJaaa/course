
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Button, Form, FormGroup,
  Col, FormControl, ControlLabel } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'


class LoginPage extends Component {

  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    login: PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      redirectToReferrer: false
    }
  }

  componentWillUpdate = (nextProps) => {
    if (!this.props.login && nextProps.login) {
      this.setState({ redirectToReferrer: true })
    }
  }

  onKeyDown = (e) => {
    if (e.which === 13) {
      this.props.onLogin({ email: this.email.value, password: this.password.value })
    }
  }

  render () {

    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-100%)' }}>
        <h1>ABC School</h1>
        <div style={{ width: '440px', backgroundColor: 'white', padding: '20px',
          border: '1px solid #dddddd', 'borderRadius': '10px' }}
        >
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl
                  inputRef={ref => { this.email = ref }}
                  type="email"
                  placeholder="Email"
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl
                  inputRef={ref => { this.password = ref }}
                  type="password"
                  placeholder="Password"
                  onKeyDown={this.onKeyDown}
                />
              </Col>
            </FormGroup>
            <div style={{ 'display':'flex', 'justifyContent':'center' }}>
              <Button
                onClick={() => this.props.onLogin({ email: this.email.value, password: this.password.value })}
              >
                Log in
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
