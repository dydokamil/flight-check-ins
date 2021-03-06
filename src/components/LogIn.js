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

export class LogIn extends React.Component {
  state = { email: '', password: '' }

  componentDidMount = () => {
    this.props.onCleanUpLoginError()
  }
  submitLogin = (event) => {
    event.preventDefault()

    this.props.onLogIn(this.state)
  }

  render () {
    const { email, error } = this.props.sessionReducer

    if (email) this.props.history.push('/')
    return (
      <Container>
        <Card>
          <CardBody>
            <h1>Log In</h1>
            <hr />
            <Form>
              <FormGroup>
                <Label for="emailInput">Email</Label>
                <Input
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                  value={this.state.email}
                  type="email"
                  name="email"
                  id="emailInput"
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
                id="loginButton"
                onClick={(event) => this.submitLogin(event)}
              >
                Log In
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

LogIn.propTypes = {
  onLogIn: PropTypes.func,
  sessionReducer: PropTypes.object,
  history: PropTypes.object,
  onCleanUpLoginError: PropTypes.func,
}

export const mapStateToProps = (state) => ({
  sessionReducer: state.sessionReducer,
})

export const mapDispatchToProps = (dispatch) => ({
  onLogIn: (payload) => dispatch(actions.logIn(payload)),
  onCleanUpLoginError: () => dispatch(actions.cleanUpLoginError()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
