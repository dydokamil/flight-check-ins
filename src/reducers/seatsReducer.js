import seatsData from '../seats.json'

const INITIAL_STATE = { seats: seatsData, basePrice: 50 }

const seatsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default seatsReducer
