import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'

import {
  mapStateToProps,
  mapDispatchToProps,
  Seat,
} from '../../components/Seat'

Enzyme.configure({ adapter: new Adapter() })

describe('test Seats component', () => {
  const INITIAL_STATE = {
    seat: { id: 1 },
    checkInFee: 0,
    basePrice: 0,
    onBookSeat: jest.fn(),
    sessionReducer: {
      token: '123abc',
      email: 'john@doe.com',
    },
  }

  it('should render the component', () => {
    const component = shallow(<Seat {...INITIAL_STATE} />)

    expect(component).toMatchSnapshot()
  })
  it('should assign email prop a value from a reducer', () => {
    expect(mapStateToProps(INITIAL_STATE)).toEqual({
      token: INITIAL_STATE.sessionReducer.token,
      email: INITIAL_STATE.sessionReducer.email,
    })
  })

  it('should call `onBookSeat` when a seat is booked', () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).onBookSeat({})
    expect(dispatch).toHaveBeenCalledTimes(1)
  })

  it('executes `toggle` on button click', () => {
    const wrapper = shallow(<Seat {...INITIAL_STATE} />)

    wrapper.find(`#Popover${INITIAL_STATE.seat.id}`).simulate('click')
    expect(wrapper.instance().state.popoverOpen).toBeTruthy()
  })

  it('executes `toggle` on book', () => {
    const wrapper = shallow(<Seat {...INITIAL_STATE} />)

    wrapper.find(`#Popover${INITIAL_STATE.seat.id}`).simulate('click')
    setTimeout(() => {
      wrapper.find("button[children='Book']").simulate('click')
      expect(wrapper.instance().state.popoverOpen).toBeTruthy()
      expect(INITIAL_STATE.onBookSeat).toHaveBeenCalled()
      expect(wrapper.instance().state.popoverOpen).toBeFalsy()
    }, 100)
  })
})
