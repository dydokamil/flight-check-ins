import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  CardBody,
  Button,
  Alert,
} from 'reactstrap'
import { connect } from 'react-redux'

import * as actions from '../actions'

export class SignUp extends React.Component {
  state = { email: '', password: '' }

  componentDidMount () {
    this.props.onCleanUpLoginError()
  }

  submitSignUp = (event) => {
    event.preventDefault()

    this.props.onSignUp(this.state.email, this.state.password)
  }

  render () {
    const { email, error } = this.props.sessionReducer

    if (email) this.props.history.push('/')
    return (
      <Container>
        <Card>
          <CardBody>
            <h1>Sign Up</h1>
            <hr />
            <Form>
              <FormGroup>
                <Label for="emailInput">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="emailInput"
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                  value={this.state.email}
                />
              </FormGroup>
              <FormGroup>
                <Label for="passwordInput">Password</Label>
                <Input
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                  value={this.state.password}
                  type="password"
                  name="passwordInput"
                  id="passwordInput"
                />
              </FormGroup>
              <Button
                id="signupButton"
                onClick={(event) => this.submitSignUp(event)}
              >
                Sign Up
              </Button>
            </Form>
          </CardBody>
        </Card>
        {error && (
          <Alert style={{ marginTop: '1rem' }} color="danger">
            {error}
          </Alert>
        )}
      </Container>
    )
  }
}

SignUp.propTypes = {
  onSignUp: PropTypes.func,
  sessionReducer: PropTypes.object,
  history: PropTypes.object,
  onCleanUpLoginError: PropTypes.func,
}

export const mapStateToProps = (state) => ({
  sessionReducer: state.sessionReducer,
})

export const mapDispatchToProps = (dispatch) => ({
  onSignUp: (email, password) => dispatch(actions.signUp({ email, password })),
  onCleanUpLoginError: () => dispatch(actions.cleanUpLoginError()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
