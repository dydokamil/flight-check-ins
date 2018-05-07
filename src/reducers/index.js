import { combineReducers } from 'redux'

import seatsReducer from './seatsReducer'
import reservationReducer from './reservationReducer'
import sessionReducer from './sessionReducer'

export default combineReducers({
  seatsReducer,
  reservationReducer,
  sessionReducer,
})
