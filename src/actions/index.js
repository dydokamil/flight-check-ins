import axios from "axios"

export const ROOT_URL = "http://localhost:4000"

// clean up>
export const CLEAN_UP = "CLEAN_UP"

export const cleanUp = () => ({
  type: CLEAN_UP,
})
// <clean up

// fetch seats>
export const FETCH_SEATS_SUCCESS = "FETCH_SEATS_SUCCESS"
export const FETCH_SEATS_FAILURE = "FETCH_SEATS_FAILURE"

export const fetchSeatsFailure = (err) => ({
  type: FETCH_SEATS_FAILURE,
  payload: err,
})

export const fetchSeatsSuccess = (data) => ({
  type: FETCH_SEATS_SUCCESS,
  payload: data,
})

export const fetchSeats = () => (dispatch) =>
  axios
    .get(`${ROOT_URL}/seats`)
    .then((res) => dispatch(fetchSeatsSuccess(res.data)))
    .catch((err) => dispatch(fetchSeatsFailure(err.message)))

// <fetch seats

// sign up>
export const SIGN_UP = "SIGN_UP"
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS"
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE"

export const signUpFailure = (err) => ({
  type: SIGN_UP_FAILURE,
  payload: err,
})

export const signUpSuccess = (payload) => ({
  type: SIGN_UP_SUCCESS,
  payload,
})

export const signUp = (payload) => (dispatch) =>
  axios
    .post(`${ROOT_URL}/users`, payload)
    .then((res) => {
      dispatch(signUpSuccess(res.data))
    })
    .catch((err) => {
      dispatch(signUpFailure(err.response.data.error))
    })
// <sign up

// log in>
export const LOG_IN = "LOG_IN"
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"
export const LOG_IN_FAILURE = "LOG_IN_FAILURE"

export const logInFailure = (err) => ({
  type: LOG_IN_FAILURE,
  payload: err,
})

export const logInSuccess = (payload) => ({
  type: LOG_IN_SUCCESS,
  payload,
})

export const logIn = (payload) => (dispatch) =>
  axios
    .post(`${ROOT_URL}/users/login`, payload)
    .then((res) => {
      dispatch(logInSuccess(res.data))
    })
    .catch((err) => {
      dispatch(logInFailure(err.response.data.error))
    })

// log out>
export const LOG_OUT = "LOG_OUT"

export const logOut = () => ({
  type: LOG_OUT,
})
// <log out

// make reservation>
export const MAKE_RESERVATION = "MAKE_RESERVATION"
export const MAKE_RESERVATION_SUCCESS = "MAKE_RESERVATION_SUCCESS"
export const MAKE_RESERVATION_FAILURE = "MAKE_RESERVATION_FAILURE"

export const makeReservation = (payload) => (dispatch) => {
  axios
    .post(`${ROOT_URL}/reservations`, payload)
    .then((res) => dispatch(makeReservationSuccess(res.data)))
    .then(() => dispatch(fetchSeats()))
    .catch((err) => dispatch(makeReservationFailure(err.response.data.error)))
}

export const makeReservationSuccess = (payload) => ({
  type: MAKE_RESERVATION_SUCCESS,
  payload,
})

export const makeReservationFailure = (err) => ({
  type: MAKE_RESERVATION_FAILURE,
  payload: err,
})

export const makeRandomReservation = (payload) => {
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/reservations/random`, payload)
      .then((res) => dispatch(makeReservationSuccess(res.data)))
      .then(() => dispatch(fetchSeats()))
      .catch((err) => {
        dispatch(makeReservationFailure(err.response.data.error))
      })
  }
}
// <make reservation

// get reservations>
export const GET_RESERVATION = "GET_RESERVATION"
export const GET_RESERVATION_SUCCESS = "GET_RESERVATION_SUCCESS"
export const GET_RESERVATION_FAILURE = "GET_RESERVATION_FAILURE"

export const getReservationSuccess = (res) => ({
  type: GET_RESERVATION_SUCCESS,
  payload: res,
})

export const getReservationFailure = (err) => ({
  type: GET_RESERVATION_FAILURE,
  payload: err,
})

export const getReservation = (payload) => (dispatch) =>
  axios
    .get(`${ROOT_URL}/reservations/mine`, { headers: payload })
    .then((res) => dispatch(getReservationSuccess(res.data)))
    .catch((err) => dispatch(getReservationFailure(err.response.data.error)))

// <get reservations

// cancel reservation>
export const CANCEL_RESERVATION = "CANCEL_RESERVATION"
export const CANCEL_RESERVATION_SUCCESS = "CANCEL_RESERVATION_SUCCESS"
export const CANCEL_RESERVATION_FAILURE = "CANCEL_RESERVATION_FAILURE"

export const cancelReservationSuccess = (payload) => ({
  type: CANCEL_RESERVATION_SUCCESS,
  payload,
})

export const cancelReservationFailure = (error) => ({
  type: CANCEL_RESERVATION_FAILURE,
  payload: error,
})

export const cancelReservation = (payload) => (dispatch) =>
  axios
    .post(`${ROOT_URL}/reservations/cancel`, payload)
    .then((res) => dispatch(cancelReservationSuccess(res.data)))
    .catch((err) => dispatch(cancelReservationFailure(err.response.data.error)))
// <cancel reservation
