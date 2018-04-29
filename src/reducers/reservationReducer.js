import * as actions from "../actions"

const INITIAL_STATE = { error: null, reservedSeat: null, reservedUntil: null }

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
        error: action.payload,
      }

    default:
      return state
  }
}

export default reservationReducer
