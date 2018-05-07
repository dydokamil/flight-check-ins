import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'

import {
  mapStateToProps,
  mapDispatchToProps,
  Seats,
} from '../../components/Seats'

Enzyme.configure({ adapter: new Adapter() })

describe('test Seats component', () => {
  it('should render the component', () => {
    const component = shallow(
      <Seats fetchSeats={jest.fn()} seatsReducer={{ basePrice: 0 }} />,
    )

    expect(component).toMatchSnapshot()
  })
  it('should assign state from props', () => {
    const INITIAL_STATE = {
      seatsReducer: {},
      sessionReducer: { token: '123abc' },
      reservationReducer: { error: 'Some error' },
    }
    expect(mapStateToProps(INITIAL_STATE)).toEqual({
      seatsReducer: INITIAL_STATE.seatsReducer,
      token: INITIAL_STATE.sessionReducer.token,
      reservationError: INITIAL_STATE.reservationReducer.error,
    })
  })

  it('should call `fetchSeats` when page is loaded', () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).fetchSeats()
    expect(dispatch).toHaveBeenCalledTimes(1)
  })

  it('should call `onRandomReservation` when page is loaded', () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).onRandomReservation({})
    expect(dispatch).toHaveBeenCalledTimes(1)
  })
})
