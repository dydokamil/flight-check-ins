// import _ from'lodash'
import moment from "moment"

import * as actions from "../actions"

const INITIAL_STATE = {
  loading: false,
  seats: null,
  basePrice: null,
  checkInFee: null,
  reservedSeat: null,
}

const seatsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.FETCH_SEATS_REQUEST:
      return { ...state, loading: true }

    case actions.FETCH_SEATS_SUCCESS:
      return { ...state, ...action.payload, error: null, loading: false }

    case actions.FETCH_SEATS_FAILURE:
      return { ...state, error: action.payload, loading: false }

    case actions.MAKE_RESERVATION_SUCCESS:
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
