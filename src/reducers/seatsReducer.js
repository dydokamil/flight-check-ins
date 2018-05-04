// import _ from'lodash'
import moment from "moment"

import * as actions from "../actions"

const INITIAL_STATE = {
  // seats: seatsData,
  seats: null,
  basePrice: null,
  checkInFee: null,
  reservedSeat: null,
}

const seatsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.FETCH_SEATS_SUCCESS:
      return { ...state, ...action.payload, error: null }

    case actions.FETCH_SEATS_FAILURE:
      return { ...state, error: action.payload }

    default:
      return state
  }
}

export default seatsReducer
