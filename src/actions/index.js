import axios from "axios"

import { ROOT_URL } from "../consts"

// clean up>
export const CLEAN_UP = "CLEAN_UP"

export const cleanUp = () => ({
  type: CLEAN_UP,
})
// <clean up

// fetch seats>
export const FETCH_SEATS_REQUEST = "FETCH_SEATS_REQUEST"
export const FETCH_SEATS_SUCCESS = "FETCH_SEATS_SUCCESS"
export const FETCH_SEATS_FAILURE = "FETCH_SEATS_FAILURE"

export const fetchSeatsRequest = () => ({
  type: FETCH_SEATS_REQUEST,
})

export const fetchSeatsFailure = (error) => ({
  type: FETCH_SEATS_FAILURE,
  error,
})

export const fetchSeatsSuccess = (payload) => ({
  type: FETCH_SEATS_SUCCESS,
  payload,
})

export const fetchSeats = () => (dispatch) => {
  dispatch(fetchSeatsRequest())
  return axios
    .get(`${ROOT_URL}/seats`)
    .then((body) => dispatch(fetchSeatsSuccess(body.data)))
    .catch((err) => dispatch(fetchSeatsFailure(err.response.data.error)))
}
// <fetch seats

// sign up>
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST"
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS"
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE"

export const signUpRequest = () => ({
  type: SIGN_UP_REQUEST,
})

export const signUpFailure = (error) => ({
  type: SIGN_UP_FAILURE,
  error,
})

export const signUpSuccess = (payload) => ({
  type: SIGN_UP_SUCCESS,
  payload,
})

export const signUp = (payload) => (dispatch) => {
  dispatch(signUpRequest())
  return axios
    .post(`${ROOT_URL}/users`, payload)
    .then((body) => dispatch(signUpSuccess(body.data)))
    .catch((err) => dispatch(signUpFailure(err.response.data.error)))
}
// <sign up

// log in>
export const LOG_IN_REQUEST = "LOG_IN_REQUEST"
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"
export const LOG_IN_FAILURE = "LOG_IN_FAILURE"

export const logInRequest = () => ({
  type: LOG_IN_REQUEST,
})

export const logInFailure = (error) => ({
  type: LOG_IN_FAILURE,
  error,
})

export const logInSuccess = (payload) => ({
  type: LOG_IN_SUCCESS,
  payload,
})

export const logIn = (payload) => (dispatch) => {
  dispatch(logInRequest())
  return axios
    .post(`${ROOT_URL}/users/login`, payload)
    .then((res) => {
      dispatch(logInSuccess(res.data))
    })
    .catch((err) => {
      dispatch(logInFailure(err.response.data.error))
    })
}

// log out>
export const LOG_OUT = "LOG_OUT"

export const logOut = () => ({
  type: LOG_OUT,
})
// <log out

// make reservation>
export const MAKE_RESERVATION_REQUEST = "MAKE_RESERVATION_REQUEST"
export const MAKE_RESERVATION_SUCCESS = "MAKE_RESERVATION_SUCCESS"
export const MAKE_RESERVATION_FAILURE = "MAKE_RESERVATION_FAILURE"

export const makeReservationRequest = () => ({
  type: MAKE_RESERVATION_REQUEST,
})

export const makeReservationSuccess = (payload) => ({
  type: MAKE_RESERVATION_SUCCESS,
  payload,
})

export const makeReservationFailure = (err) => ({
  type: MAKE_RESERVATION_FAILURE,
  payload: err,
})

export const makeReservation = (payload) => (dispatch) => {
  dispatch(makeReservationRequest())
  axios
    .post(`${ROOT_URL}/reservations`, payload)
    .then((res) => dispatch(makeReservationSuccess(res.data)))
    // .then(() => dispatch(fetchSeats()))
    .catch((err) => dispatch(makeReservationFailure(err.response.data.error)))
}

export const makeRandomReservation = (payload) => (dispatch) => {
  dispatch(makeReservationRequest())
  axios
    .post(`${ROOT_URL}/reservations/random`, payload)
    .then((res) => dispatch(makeReservationSuccess(res.data)))
    .then(() => dispatch(fetchSeats()))
    .catch((err) => {
      dispatch(makeReservationFailure(err.response.data.error))
    })
}

// <make reservation

// get reservations>
export const GET_RESERVATION_REQUEST = "GET_RESERVATION_REQUEST"
export const GET_RESERVATION_SUCCESS = "GET_RESERVATION_SUCCESS"
export const GET_RESERVATION_FAILURE = "GET_RESERVATION_FAILURE"

export const getReservationRequest = () => ({
  type: MAKE_RESERVATION_REQUEST,
})

export const getReservationSuccess = (res) => ({
  type: GET_RESERVATION_SUCCESS,
  payload: res,
})

export const getReservationFailure = (err) => ({
  type: GET_RESERVATION_FAILURE,
  payload: err,
})

export const getReservation = (payload) => (dispatch) => {
  dispatch(getReservationRequest())
  axios
    .get(`${ROOT_URL}/reservations/mine`, { headers: payload })
    .then((res) => dispatch(getReservationSuccess(res.data)))
    .catch((err) => dispatch(getReservationFailure(err.response.data.error)))
}

// <get reservations

// cancel reservation>
export const CANCEL_RESERVATION_REQUEST = "CANCEL_RESERVATION_REQUEST"
export const CANCEL_RESERVATION_SUCCESS = "CANCEL_RESERVATION_SUCCESS"
export const CANCEL_RESERVATION_FAILURE = "CANCEL_RESERVATION_FAILURE"

export const cancelReservationRequest = () => ({
  type: MAKE_RESERVATION_REQUEST,
})

export const cancelReservationSuccess = (payload) => ({
  type: CANCEL_RESERVATION_SUCCESS,
  payload,
})

export const cancelReservationFailure = (error) => ({
  type: CANCEL_RESERVATION_FAILURE,
  payload: error,
})

export const cancelReservation = (payload) => (dispatch) => {
  dispatch(cancelReservationRequest())
  axios
    .post(`${ROOT_URL}/reservations/cancel`, payload)
    .then((res) => dispatch(cancelReservationSuccess(res.data)))
    .catch((err) => dispatch(cancelReservationFailure(err.response.data.error)))
}
// <cancel reservation
