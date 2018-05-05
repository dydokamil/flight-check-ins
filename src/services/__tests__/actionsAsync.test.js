import configureStore from "redux-mock-store"
import thunk from "redux-thunk"
// import mockAxios from "axios"
// import fetchMock from "fetch-mock"
// import mock = new MockAdapter(axios)
// import moxios from "moxios"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"

import * as actions from "../../actions"
import { ROOT_URL } from "../../consts"
import seats from "../../__mockData__/seats.json"
import signupData from "../../__mockData__/signup.json"

// jest.mock("axios")

describe("async actions", () => {
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)

  let mock = new MockAdapter(axios)

  beforeEach(() => {
    // mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  it("should create FETCH_SEATS_SUCCESS when fetching seats is done", async () => {
    mock.onGet(`${ROOT_URL}/seats`).reply(200, {
      ...seats,
    })

    const expectedActions = [
      { type: actions.FETCH_SEATS_REQUEST },
      { type: actions.FETCH_SEATS_SUCCESS, payload: seats },
    ]

    const store = mockStore({ seats: {} })
    await store.dispatch(actions.fetchSeats())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it("should create FETCH_SEATS_FAILURE when fetching seats is done", async () => {
    expect.assertions(1)

    mock.onGet(`${ROOT_URL}/seats`).reply(500, { error: "Some seats error" })

    const expectedActions = [
      { type: actions.FETCH_SEATS_REQUEST },
      { type: actions.FETCH_SEATS_FAILURE, error: "Some seats error" },
    ]

    const store = mockStore({ seats: {} })
    await store.dispatch(actions.fetchSeats())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it("should create SIGN_UP_SUCCESS when signing up is done", async () => {
    mock.onPost(`${ROOT_URL}/users`).reply(200, {
      ...signupData,
    })

    const expectedActions = [
      { type: actions.SIGN_UP_REQUEST },
      { type: actions.SIGN_UP_SUCCESS, payload: signupData },
    ]

    const store = mockStore({ email: null, token: null })
    await store.dispatch(actions.signUp(signupData))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it("should create SIGN_UP_FAILURE when signing up is done", async () => {
    expect.assertions(1)

    mock.onPost(`${ROOT_URL}/users`).reply(500, { error: "Some signup error" })

    const expectedActions = [
      { type: actions.SIGN_UP_REQUEST },
      { type: actions.SIGN_UP_FAILURE, error: "Some signup error" },
    ]

    const store = mockStore({ error: null, token: null, email: null })
    await store.dispatch(actions.signUp(signupData))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it("should create LOG_IN_SUCCESS when signing up is done", async () => {
    mock.onPost(`${ROOT_URL}/users/login`).reply(200, {
      ...signupData,
    })

    const expectedActions = [
      { type: actions.LOG_IN_REQUEST },
      { type: actions.LOG_IN_SUCCESS, payload: signupData },
    ]

    const store = mockStore({ email: null, token: null })
    await store.dispatch(actions.logIn(signupData))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it("should create LOG_IN_FAILURE when signing up is done", async () => {
    expect.assertions(1)

    mock
      .onPost(`${ROOT_URL}/users/login`)
      .reply(500, { error: "Some signup error" })

    const expectedActions = [
      { type: actions.LOG_IN_REQUEST },
      { type: actions.LOG_IN_FAILURE, error: "Some signup error" },
    ]

    const store = mockStore({ error: null, token: null, email: null })
    await store.dispatch(actions.logIn(signupData))
    expect(store.getActions()).toEqual(expectedActions)
  })
})
