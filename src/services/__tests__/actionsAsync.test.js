import configureStore from "redux-mock-store"
import thunk from "redux-thunk"
// import mockAxios from "axios"
// import fetchMock from "fetch-mock"
// import mock = new MockAdapter(axios)
// import moxios from "moxios"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"

import * as actions from "../../actions"
import * as types from "../../constants/ActionTypes"
import { ROOT_URL } from "../../constants/consts"
import seats from "../../__mockData__/seats.json"
import signupData from "../../__mockData__/signup.json"
import reservationData from "../../__mockData__/reservation.json"
import makeReservationData from "../../__mockData__/makeReservation.json"

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
      { type: types.FETCH_SEATS_REQUEST },
      { type: types.FETCH_SEATS_SUCCESS, payload: seats },
    ]

    const store = mockStore({ seats: {} })
    await store.dispatch(actions.fetchSeats())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it("should create FETCH_SEATS_FAILURE when fetching seats is done", async () => {
    expect.assertions(1)

    mock.onGet(`${ROOT_URL}/seats`).reply(500, { error: "Some seats error" })

    const expectedActions = [
      { type: types.FETCH_SEATS_REQUEST },
      { type: types.FETCH_SEATS_FAILURE, error: "Some seats error" },
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
      { type: types.SIGN_UP_REQUEST },
      { type: types.SIGN_UP_SUCCESS, payload: signupData },
    ]

    const store = mockStore({ email: null, token: null })
    await store.dispatch(actions.signUp(signupData))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it("should create SIGN_UP_FAILURE when signing up is done", async () => {
    expect.assertions(1)

    mock.onPost(`${ROOT_URL}/users`).reply(500, { error: "Some signup error" })

    const expectedActions = [
      { type: types.SIGN_UP_REQUEST },
      { type: types.SIGN_UP_FAILURE, error: "Some signup error" },
    ]

    const store = mockStore({ error: null, token: null, email: null })
    await store.dispatch(actions.signUp(signupData))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it("should create LOG_IN_SUCCESS when log in is done", async () => {
    mock.onPost(`${ROOT_URL}/users/login`).reply(200, {
      ...signupData,
    })

    const expectedActions = [
      { type: types.LOG_IN_REQUEST },
      { type: types.LOG_IN_SUCCESS, payload: signupData },
    ]

    const store = mockStore({ email: null, token: null })
    await store.dispatch(actions.logIn(signupData))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it("should create LOG_IN_FAILURE when log in is done", async () => {
    expect.assertions(1)

    mock
      .onPost(`${ROOT_URL}/users/login`)
      .reply(500, { error: "Some signup error" })

    const expectedActions = [
      { type: types.LOG_IN_REQUEST },
      { type: types.LOG_IN_FAILURE, error: "Some signup error" },
    ]

    const store = mockStore({ error: null, token: null, email: null })
    await store.dispatch(actions.logIn(signupData))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it("should create MAKE_RESERVATION_SUCCESS when reservation is done", async () => {
    mock.onPost(`${ROOT_URL}/reservations`).reply(200, {
      ...reservationData,
    })

    const expectedActions = [
      { type: types.MAKE_RESERVATION_REQUEST },
      { type: types.MAKE_RESERVATION_SUCCESS, payload: reservationData },
    ]

    const store = mockStore({})
    await store.dispatch(actions.makeReservation(makeReservationData))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it("should create MAKE_RESERVATION_SUCCESS when random reservation is done", async () => {
    mock.onPost(`${ROOT_URL}/reservations/random`).reply(200, {
      ...reservationData,
    })

    const expectedActions = [
      { type: types.MAKE_RESERVATION_REQUEST },
      { type: types.MAKE_RESERVATION_SUCCESS, payload: reservationData },
    ]

    const store = mockStore({})
    await store.dispatch(actions.makeRandomReservation(makeReservationData))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it("should create MAKE_RESERVATION_FAILRUE when random reservation is not done", async () => {
    mock.onPost(`${ROOT_URL}/reservations/random`).reply(500, {
      error: "Some random reservation error",
    })

    const expectedActions = [
      { type: types.MAKE_RESERVATION_REQUEST },
      {
        type: types.MAKE_RESERVATION_FAILURE,
        error: "Some random reservation error",
      },
    ]

    const store = mockStore({})
    await store.dispatch(actions.makeRandomReservation(makeReservationData))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it("should create MAKE_RESERVATION_FAILURE when reservation is done", async () => {
    expect.assertions(1)

    mock
      .onPost(`${ROOT_URL}/reservations`)
      .reply(500, { error: "Some reservation error" })

    const expectedActions = [
      { type: types.MAKE_RESERVATION_REQUEST },
      {
        type: types.MAKE_RESERVATION_FAILURE,
        error: "Some reservation error",
      },
    ]

    const store = mockStore({ error: null, token: null, email: null })
    await store.dispatch(actions.makeReservation(makeReservationData))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it("should create GET_RESERVATION_SUCCESS when reservation is fetched", async () => {
    mock.onGet(`${ROOT_URL}/reservations/mine`).reply(200, {
      ...reservationData,
    })

    const expectedActions = [
      { type: types.GET_RESERVATION_REQUEST },
      { type: types.GET_RESERVATION_SUCCESS, payload: reservationData },
    ]

    const store = mockStore({})
    await store.dispatch(actions.getReservation())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it("should create GET_RESERVATION_FAILURE when reservation is not fetched", async () => {
    expect.assertions(1)

    mock
      .onGet(`${ROOT_URL}/reservations/mine`)
      .reply(500, { error: "Some reservation error" })

    const expectedActions = [
      { type: types.GET_RESERVATION_REQUEST },
      {
        type: types.GET_RESERVATION_FAILURE,
        error: "Some reservation error",
      },
    ]

    const store = mockStore({ error: null, token: null, email: null })
    await store.dispatch(actions.getReservation())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it("should create CANCEL_RESERVATION_SUCCESS when reservation is fetched", async () => {
    mock.onPost(`${ROOT_URL}/reservations/cancel`).reply(200, {
      ...reservationData,
    })

    const expectedActions = [
      { type: types.CANCEL_RESERVATION_REQUEST },
      { type: types.CANCEL_RESERVATION_SUCCESS, payload: reservationData },
    ]

    const store = mockStore({})
    await store.dispatch(actions.cancelReservation())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it("should create CANCEL_RESERVATION_FAILURE when reservation is not fetched", async () => {
    expect.assertions(1)

    mock
      .onPost(`${ROOT_URL}/reservations/cancel`)
      .reply(500, { error: "Some cancel error" })

    const expectedActions = [
      { type: types.CANCEL_RESERVATION_REQUEST },
      {
        type: types.CANCEL_RESERVATION_FAILURE,
        error: "Some cancel error",
      },
    ]

    const store = mockStore({})
    await store.dispatch(actions.cancelReservation())
    expect(store.getActions()).toEqual(expectedActions)
  })
})
