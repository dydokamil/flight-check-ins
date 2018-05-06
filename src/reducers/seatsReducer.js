// import _ from'lodash'
import moment from "moment"

import * as types from "../constants/ActionTypes"

const INITIAL_STATE = {
  loading: false,
  seats: null,
  basePrice: null,
  checkInFee: null,
  error: null,
}

const seatsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_SEATS_REQUEST:
      return { ...state, loading: true }

    case types.FETCH_SEATS_SUCCESS:
      return { ...state, ...action.payload, error: null, loading: false }

    case types.FETCH_SEATS_FAILURE:
      return { ...state, error: action.error, loading: false }

    case types.MAKE_RESERVATION_SUCCESS:
      return {
        ...state,
        seats: state.seats.map((seat) => ({
          ...seat,
          available: action.payload.seat.id !== seat.id,
        })),
      }
    default:
      return state
  }
}

export default seatsReducer
