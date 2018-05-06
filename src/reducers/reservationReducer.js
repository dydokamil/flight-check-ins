import * as types from "../constants/ActionTypes"

const INITIAL_STATE = {
  error: null,
  reservedUntil: null,
  paid: null,
  price: null,
}

const reservationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.MAKE_RESERVATION_SUCCESS:
    case types.GET_RESERVATION_SUCCESS:
      return {
        error: null,
        ...action.payload,
      }

    case types.MAKE_RESERVATION_FAILURE:
    case types.GET_RESERVATION_FAILURE:
      return {
        ...state,
        error: action.error,
      }

    case types.CANCEL_RESERVATION_SUCCESS:
      return INITIAL_STATE

    case types.CLEAN_UP:
      return INITIAL_STATE

    default:
      return state
  }
}

export default reservationReducer
