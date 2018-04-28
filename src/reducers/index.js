import { combineReducers } from "redux"

import seatsReducer from "./seatsReducer"
import reservationReducer from "./reservationReducer"

export default combineReducers({
  seatsReducer,
  reservationReducer,
})
