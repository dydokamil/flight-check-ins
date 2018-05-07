import axios from "axios"

import { ROOT_URL } from "../constants/consts"
import * as types from "../constants/ActionTypes"

// clean up>
export const cleanUp = () => ({
  type: types.CLEAN_UP,
})
export const cleanUpLoginError = () => ({
  type: types.CLEAN_UP_LOGIN_ERROR,
})
// <clean up

// fetch seats>
export const fetchSeatsRequest = () => ({
  type: types.FETCH_SEATS_REQUEST,
})

export const fetchSeatsFailure = (error) => ({
  type: types.FETCH_SEATS_FAILURE,
  error,
})

export const fetchSeatsSuccess = (payload) => ({
  type: types.FETCH_SEATS_SUCCESS,
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
export const signUpRequest = () => ({
  type: types.SIGN_UP_REQUEST,
})

export const signUpFailure = (error) => ({
  type: types.SIGN_UP_FAILURE,
  error,
})

export const signUpSuccess = (payload) => ({
  type: types.SIGN_UP_SUCCESS,
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
export const logInRequest = () => ({
  type: types.LOG_IN_REQUEST,
})

export const logInFailure = (error) => ({
  type: types.LOG_IN_FAILURE,
  error,
})

export const logInSuccess = (payload) => ({
  type: types.LOG_IN_SUCCESS,
  payload,
})

export const logIn = (payload) => (dispatch) => {
  dispatch(logInRequest())
  return axios
    .post(`${ROOT_URL}/users/login`, payload)
    .then((res) => dispatch(logInSuccess(res.data)))
    .catch((err) => dispatch(logInFailure(err.response.data.error)))
}

// log out>
export const logOut = () => ({
  type: types.LOG_OUT,
})
// <log out

// make reservation>
export const makeReservationRequest = () => ({
  type: types.MAKE_RESERVATION_REQUEST,
})

export const makeReservationSuccess = (payload) => ({
  type: types.MAKE_RESERVATION_SUCCESS,
  payload,
})

export const makeReservationFailure = (error) => ({
  type: types.MAKE_RESERVATION_FAILURE,
  error,
})

export const makeReservation = (payload) => (dispatch) => {
  dispatch(makeReservationRequest())
  return axios
    .post(`${ROOT_URL}/reservations`, payload)
    .then((res) => dispatch(makeReservationSuccess(res.data)))
    .catch((err) => dispatch(makeReservationFailure(err.response.data.error)))
}

export const makeRandomReservation = (payload) => (dispatch) => {
  dispatch(makeReservationRequest())
  return axios
    .post(`${ROOT_URL}/reservations/random`, payload)
    .then((res) => dispatch(makeReservationSuccess(res.data)))
    .catch((err) => dispatch(makeReservationFailure(err.response.data.error)))
}

// <make reservation

// get reservations>
export const getReservationRequest = () => ({
  type: types.GET_RESERVATION_REQUEST,
})

export const getReservationSuccess = (payload) => ({
  type: types.GET_RESERVATION_SUCCESS,
  payload,
})

export const getReservationFailure = (error) => ({
  type: types.GET_RESERVATION_FAILURE,
  error,
})

export const getReservation = (payload) => (dispatch) => {
  dispatch(getReservationRequest())
  return axios
    .get(`${ROOT_URL}/reservations/mine`, { headers: payload })
    .then((res) => dispatch(getReservationSuccess(res.data)))
    .catch((err) => dispatch(getReservationFailure(err.response.data.error)))
}

// <get reservations

// cancel reservation>
export const cancelReservationRequest = () => ({
  type: types.CANCEL_RESERVATION_REQUEST,
})

export const cancelReservationSuccess = (payload) => ({
  type: types.CANCEL_RESERVATION_SUCCESS,
  payload,
})

export const cancelReservationFailure = (error) => ({
  type: types.CANCEL_RESERVATION_FAILURE,
  error,
})

export const cancelReservation = (payload) => (dispatch) => {
  dispatch(cancelReservationRequest())
  return axios
    .post(`${ROOT_URL}/reservations/cancel`, payload)
    .then((res) => dispatch(cancelReservationSuccess(res.data)))
    .catch((err) => dispatch(cancelReservationFailure(err.response.data.error)))
}
// <cancel reservation
