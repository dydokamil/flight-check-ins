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
} from "reactstrap"
import { connect } from "react-redux"

export class LogIn extends React.Component {
  state = { email: "", password: "" }
  submitLogin = event => {
    event.preventDefault()
  }

  render() {
    return (
      <Container>
        <Card>
          <CardBody>
            <h1>Log In</h1>
            <hr />
            <Form>
              <FormGroup>
                <Label for="emailInput">Email</Label>
                <Input type="email" name="email" id="emailInput" />
              </FormGroup>
              <FormGroup>
                <Label for="passwordInput">Password</Label>
                <Input
                  type="password"
                  name="passwordInput"
                  id="passwordInput"
                />
              </FormGroup>
              <Button onClick={this.submitLogin}>Log In</Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  email: state.sessionReducer.email,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
