import { createStore } from 'redux'

import rootReducer from '../../reducers'
import seatsReducer from '../../reducers/seatsReducer'
import sessionReducer from '../../reducers/sessionReducer'
import reservationReducer from '../../reducers/reservationReducer'

describe('root reducer', () => {
  it('should test the root reducer', () => {
    const store = createStore(rootReducer)

    expect(store.getState().seatsReducer).toEqual(seatsReducer(undefined, {}))
    expect(store.getState().sessionReducer).toEqual(
      sessionReducer(undefined, {}),
    )
    expect(store.getState().reservationReducer).toEqual(
      reservationReducer(undefined, {}),
    )

    expect(Object.keys(store.getState()).length).toEqual(3)
  })
})
