import React from "react"
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
} from "reactstrap"
import { connect } from "react-redux"

import * as actions from "../actions"

export class LogIn extends React.Component {
  state = { email: "", password: "" }
  submitLogin = event => {
    event.preventDefault()

    this.props.onLogIn(this.state)
  }

  render() {
    if (this.props.email) this.props.history.push("/")
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
                  onChange={event =>
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
                  onChange={event =>
                    this.setState({ password: event.target.value })
                  }
                  value={this.state.password}
                  type="password"
                  name="passwordInput"
                  id="passwordInput"
                />
              </FormGroup>
              <Button onClick={this.submitLogin}>Log In</Button>
            </Form>
          </CardBody>
        </Card>
        {this.props.error && (
          <Alert style={{ marginTop: "1rem" }} color="danger">
            {this.props.error}
          </Alert>
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  email: state.sessionReducer.email,
  error: state.sessionReducer.error,
})

const mapDispatchToProps = dispatch => ({
  onLogIn: payload => dispatch(actions.logIn(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
