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

    mock.onGet(`${ROOT_URL}/seats`).reply(500, { error: "Some error" })

    const expectedActions = [
      { type: actions.FETCH_SEATS_REQUEST },
      { type: actions.FETCH_SEATS_FAILURE, error: "Some error" },
    ]

    const store = mockStore({ seats: {} })
    await store.dispatch(actions.fetchSeats())
    expect(store.getActions()).toEqual(expectedActions)
  })

  // it("should create FETCH_SEATS_SUCCESS when fetching seats is done", () => {
  //   fetchMock.getOnce(`${ROOT_URL}/seats`, {
  //     body: seatsData,
  //     headers: { "content-type": "application/json" },
  //   })

  //   const expectedActions = [
  //     { type: actions.FETCH_SEATS_REQUEST },
  //     { type: actions.FETCH_SEATS_SUCCESS, payload: seatsData },
  //   ]
  //   const store = mockStore({ seats: {} })

  //   return store.dispatch(actions.fetchSeats()).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions)
  //   })
  // })

  // it("should create FETCH_SEATS_FAILURE when fetching seats is done", () => {
  //   const errorMessage = "Mock Network Error"
  //   expect.assertions(1)

  //   fetchMock.getOnce(`${ROOT_URL}/seats`, () => {
  //     throw new Error(errorMessage)
  //   })

  //   const expectedActions = [
  //     { type: actions.FETCH_SEATS_REQUEST },
  //     { type: actions.FETCH_SEATS_FAILURE, error: errorMessage },
  //   ]
  //   const store = mockStore({ seats: {} })

  //   return store.dispatch(actions.fetchSeats()).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions)
  //   })
  // })
})
