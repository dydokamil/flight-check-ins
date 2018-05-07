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
  LogIn,
} from "../../components/LogIn"

Enzyme.configure({ adapter: new Adapter() })

describe("test login component", () => {
  const INITIAL_STATE = {
    sessionReducer: {
      email: "",
      error: null,
    },
    onCleanUpLoginError: jest.fn(),
    onLogIn: jest.fn(),
  }

  it("should change the state of `password` when typing into the input", () => {
    const component = shallow(<LogIn {...INITIAL_STATE} />)
    const instance = component.instance()
    const password = "Passwd!@#"

    const passwordInput = component.find("#passwordInput")
    passwordInput.simulate("change", { target: { value: password } })
    expect(component.find("#passwordInput").props().value).toEqual(password)
    expect(instance.state.password).toEqual(password)
  })

  it("should call submitLogin when `Log In` button is pressed", () => {
    const submitLoginMock = jest.fn()

    let wrapper = shallow(<LogIn {...INITIAL_STATE} />)
    wrapper.instance().submitLogin = submitLoginMock

    const logInButton = wrapper
      .find("#loginButton")
      .simulate("click", { preventDefault: jest.fn() })

    expect(submitLoginMock).toHaveBeenCalledTimes(1)
  })

  it("should call submitLogin when `Log In` button is pressed", () => {
    const preventDefaultMock = jest.fn()

    let wrapper = shallow(<LogIn {...INITIAL_STATE} />)

    const logInButton = wrapper
      .find("#loginButton")
      .simulate("click", { preventDefault: preventDefaultMock })

    expect(preventDefaultMock).toHaveBeenCalledTimes(1)
  })

  it("should change the state of `email` when typing into the input", () => {
    const component = shallow(<LogIn {...INITIAL_STATE} />)
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

  it("should call `onLogIn` when login button is clicked", () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).onLogIn()
    expect(dispatch).toHaveBeenCalledTimes(1)
  })

  it("should call `onCleanUpLoginError` when error was scheduled for deletion", () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).onCleanUpLoginError()
    expect(dispatch).toHaveBeenCalledTimes(1)
  })
})
