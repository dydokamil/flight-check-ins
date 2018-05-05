import * as actions from "../actions"

const INITIAL_STATE = {
  error: null,
  reservedSeat: null,
  reservedUntil: null,
  paid: null,
  price: null,
}

const reservationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.MAKE_RESERVATION_SUCCESS:
    case actions.GET_RESERVATION_SUCCESS:
      return {
        error: null,
        ...action.payload,
      }

    case actions.MAKE_RESERVATION_FAILURE:
    case actions.GET_RESERVATION_FAILURE:
      return {
        ...state,
        error: action.error,
      }

    case actions.CANCEL_RESERVATION_SUCCESS:
      return INITIAL_STATE

    case actions.CLEAN_UP:
      return INITIAL_STATE

    default:
      return state
  }
}

export default reservationReducer
