import React, { Component } from 'react';
import { Button, Form, FormGroup, Label,
  Col, FormControl, ControlLabel } from 'react-bootstrap'
import './LoginPage.css'

class LoginPage extends Component {
  render() {
    return (
      <div className='login-page'>
        <h1>ABC School</h1>
        <div className='login-form'>
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl type="email" placeholder="Email" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="Password" />
              </Col>
            </FormGroup>
            <div style={{ 'display':'flex', 'justify-content':'center' }}>
              <Button type="submit">
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
