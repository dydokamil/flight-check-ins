import { combineReducers } from 'redux'

import seatsReducer from './seatsReducer'
import reservatinoReducer from './reservationReducer'

export default combineReducers({
  seatsReducer,
  reservatinoReducer
})
