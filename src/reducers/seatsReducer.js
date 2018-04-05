// import _ from'lodash'
import moment from 'moment'

// import seatsData from '../seats.json'
import seatsFlat from '../seatsFlat.json'
import * as actions from '../actions'

const INITIAL_STATE = {
  // seats: seatsData,
  seats: seatsFlat,
  basePrice: 50,
  checkInFee: 10,
  madeReservation: false,
  reservedSeat: null
}

const seatsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.GET_SEATS:
      return state

    case actions.MAKE_RESERVATION:
      const reserved = action.payload.id
      const reservedSeat = state.seats.find(seat => seat.id === reserved)

      return {
        ...state,
        madeReservation: true,
        reservedSeat: reserved,
        seats: [
          ...state.seats.slice(0, reserved - 1),
          Object.assign(
            {},
            {
              ...reservedSeat,
              available: reservedSeat.reservedUntil
                ? reservedSeat.reservedUntil.isBefore(moment.utc())
                : false,
              paid: false,
              reservedUntil: moment.utc().add(3, 'minutes')
            }
          ),
          ...state.seats.slice(reserved)
        ]
      }

    case actions.CANCEL_RESERVATION:
      const cancelSeatId = action.payload.id
      const cancelSeat = state.seats.find(seat => seat.id === cancelSeatId)

      return {
        ...state,
        madeReservation: false,
        reservedSeat: null,
        seats: [
          ...state.seats.slice(0, cancelSeatId - 1),
          Object.assign(
            {},
            {
              ...cancelSeat,
              available: true,
              paid: false,
              reservedUntil: null
            }
          ),
          ...state.seats.slice(cancelSeatId)
        ]
      }

    default:
      return state
  }
}

export default seatsReducer
