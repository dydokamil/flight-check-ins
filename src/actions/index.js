import axios from "axios"

export const ROOT_URL = "http://localhost:4000"

export const MAKE_RESERVATION = "MAKE_RESERVATION"
export const CANCEL_RESERVATION = "CANCEL_RESERVATION"

// fetch seats>
export const FETCH_SEATS_SUCCESS = "FETCH_SEATS_SUCCESS"
export const FETCH_SEATS_FAILURE = "FETCH_SEATS_FAILURE"

export const fetchSeatsFailure = err => ({
  type: FETCH_SEATS_FAILURE,
  payload: err,
})

export const fetchSeatsSuccess = data => ({
  type: FETCH_SEATS_SUCCESS,
  payload: data,
})

export function fetchSeats() {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/seats`)
      .then(res => dispatch(fetchSeatsSuccess(res.data)))
      .catch(err => dispatch(fetchSeatsFailure(err.message)))
  }
}
// <fetch seats

// sign up>
export const SIGN_UP = "SIGN_UP"
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS"
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE"

export const signUpFailure = err => ({
  type: SIGN_UP_FAILURE,
  payload: err,
})

export const signUpSuccess = payload => ({
  type: SIGN_UP_SUCCESS,
  payload,
})

export function signUp(payload) {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/users`, payload)
      .then(res => {
        dispatch(signUpSuccess({ ...payload }))
      })
      .catch(err => {
        dispatch(signUpFailure(err.response.data.error))
      })
  }
}
// <sign up
