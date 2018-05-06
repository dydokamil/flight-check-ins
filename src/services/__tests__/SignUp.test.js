import React from "react"
import Adapter from "enzyme-adapter-react-16"
import Enzyme, { mount, shallow } from "enzyme"
import { MemoryRouter } from "react-router-dom"
import ReactDOM from "react-dom"
import renderer from "react-test-renderer"
import { Link } from "react-router-dom"

import {
  mapStateToProps,
  mapDispatchToProps,
  SignUp,
} from "../../components/SignUp"

Enzyme.configure({ adapter: new Adapter() })

describe("test SignUp component", () => {
  it("should change the state of `password` when typing into the input", () => {
    const component = shallow(
      <SignUp sessionReducer={{ email: "", error: null }} />,
    )
    const instance = component.instance()
    const password = "Passwd!@#"

    const passwordInput = component.find("#passwordInput")
    passwordInput.simulate("change", { target: { value: password } })
    expect(component.find("#passwordInput").props().value).toEqual(password)
    expect(instance.state.password).toEqual(password)
  })

  it("should call submitSignup when `Sign Up` button is pressed", () => {
    const submitSignUpMock = jest.fn()

    let wrapper = shallow(
      <SignUp
        sessionReducer={{ email: "", error: null }}
        onSignUp={jest.fn()}
      />,
    )
    wrapper.instance().submitSignUp = submitSignUpMock

    const signupButton = wrapper
      .find("#signupButton")
      .simulate("click", { preventDefault: jest.fn() })

    expect(submitSignUpMock).toHaveBeenCalledTimes(1)
  })

  it("should call submitSignup when `Sign Up` button is pressed", () => {
    const preventDefaultMock = jest.fn()

    let wrapper = shallow(
      <SignUp
        sessionReducer={{ email: "", error: null }}
        onSignUp={jest.fn()}
      />,
    )

    const signupButton = wrapper
      .find("#signupButton")
      .simulate("click", { preventDefault: preventDefaultMock })

    expect(preventDefaultMock).toHaveBeenCalledTimes(1)
  })

  it("should change the state of `email` when typing into the input", () => {
    const component = shallow(
      <SignUp sessionReducer={{ email: "", error: null }} />,
    )
    const instance = component.instance()
    const email = "john@doe.com"

    const emailInput = component.find("#emailInput")
    emailInput.simulate("change", { target: { value: email } })
    expect(component.find("#emailInput").props().value).toEqual(email)
    expect(instance.state.email).toEqual(email)
  })

  it("should assign email prop a value from a reducer", () => {
    const INITIAL_STATE = { sessionReducer: { email: "John@doe.com" } }
    expect(mapStateToProps(INITIAL_STATE)).toEqual(INITIAL_STATE)
  })

  it("should call `onSignUp` when signup button is clicked", () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).onSignUp("john@doe.com", "test123")
    expect(dispatch).toHaveBeenCalledTimes(1)
  })
})
