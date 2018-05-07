import reducer from "../../reducers/sessionReducer"
import * as types from "../../constants/ActionTypes"
// import seatsData from "../../__mockData__/seats.json"

describe("session reducer", () => {
  const INITIAL_STATE = {
    email: null,
    token: null,
    error: null,
    loading: false,
  }
  const LOADING_STATE = {
    ...INITIAL_STATE,
    loading: true,
  }
  const payload = {
    email: "John@doe.com",
    token: "123abc",
    error: null,
  }
  const SUCCESS_STATE = {
    ...LOADING_STATE,
    loading: false,
    ...payload,
  }
  const FAILURE_STATE = {
    ...LOADING_STATE,
    loading: false,
    error: "Some error",
  }
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE)
  })

  it("should return `loading` after signup request", () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.SIGN_UP_REQUEST,
      }),
    ).toEqual({
      ...INITIAL_STATE,
      loading: true,
    })
  })

  it("should return `loading` after login request", () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.LOG_IN_REQUEST,
      }),
    ).toEqual({
      ...INITIAL_STATE,
      loading: true,
    })
  })

  it("should return credentials after signup success", () => {
    expect(
      reducer(LOADING_STATE, {
        type: types.SIGN_UP_SUCCESS,
        payload,
      }),
    ).toEqual(SUCCESS_STATE)
  })

  it("should return credentials after signup failure", () => {
    expect(
      reducer(LOADING_STATE, {
        type: types.SIGN_UP_FAILURE,
        error: "Some error",
      }),
    ).toEqual(FAILURE_STATE)
  })

  it("should return credentials after login failure", () => {
    expect(
      reducer(LOADING_STATE, {
        type: types.LOG_IN_FAILURE,
        error: "Some error",
      }),
    ).toEqual(FAILURE_STATE)
  })

  it("should return the initial state after log out", () => {
    expect(
      reducer(SUCCESS_STATE, {
        type: types.LOG_OUT,
      }),
    ).toEqual(INITIAL_STATE)
  })

  it("should clean up the login error", () => {
    expect(
      reducer(FAILURE_STATE, {
        type: types.CLEAN_UP_LOGIN_ERROR,
      }),
    ).toEqual({ ...FAILURE_STATE, error: null })
  })
})
