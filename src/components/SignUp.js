import React from "react"
import {
  Card,
  CardBlock,
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

export class SignUp extends React.Component {
  state = { email: "", password: "" }
  submitSignUp = event => {
    event.preventDefault()

    this.props.onSignUp(this.state.email, this.state.password)
  }

  render() {
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
                  onChange={event =>
                    this.setState({ email: event.target.value })
                  }
                  value={this.email}
                />
              </FormGroup>
              <FormGroup>
                <Label for="passwordInput">Password</Label>
                <Input
                  onChange={event =>
                    this.setState({ password: event.target.value })
                  }
                  value={this.password}
                  type="password"
                  name="passwordInput"
                  id="passwordInput"
                />
              </FormGroup>
              <Button onClick={this.submitSignUp}>Sign Up</Button>
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
  onSignUp: (email, password) => {
    dispatch(actions.signUp({ email, password }))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
