import * as actions from "../actions"

const INITIAL_STATE = { reservedSeat: null, reservedUntil: null }

const reservationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.MAKE_RESERVATION_SUCCESS:
      return {
        reservedSeat: action.payload.seat.id,
        reservedUntil: action.payload.reservedUntil,
        paid: action.payload.paid,
      }

    default:
      return state
  }
}

export default reservationReducer
