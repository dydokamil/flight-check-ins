import React from "react"
import Adapter from "enzyme-adapter-react-16"
import Enzyme, { mount, shallow } from "enzyme"
import { MemoryRouter } from "react-router-dom"
import ReactDOM from "react-dom"
import renderer from "react-test-renderer"
import { Link } from "react-router-dom"

import {
  mapStateToProps,
  mapDispatchToProps,
  Reservation,
} from "../../components/Reservation"

Enzyme.configure({ adapter: new Adapter() })

describe("test Reservation component", () => {
  const INITIAL_STATE_MAP = {
    sessionReducer: {
      email: "john@doe.com",
      token: "123abc",
    },
    reservationReducer: {
      paid: false,
      price: 0,
      reservedUntil: new Date(),
      seat: { id: 1 },
    },
  }

  const INITIAL_STATE = {
    email: "john@doe.com",
    token: "123abc",
    paid: false,
    price: 0,
    reservedUntil: new Date(),
    seat: { id: 1 },
    onGetReservation: jest.fn(),
    onCancelReservation: jest.fn(),
  }

  it("should assign state from props", () => {
    expect(mapStateToProps(INITIAL_STATE_MAP)).toEqual({
      email: INITIAL_STATE_MAP.sessionReducer.email,
      token: INITIAL_STATE_MAP.sessionReducer.token,

      paid: INITIAL_STATE_MAP.reservationReducer.paid,
      price: INITIAL_STATE_MAP.reservationReducer.price,
      reservedUntil: INITIAL_STATE_MAP.reservationReducer.reservedUntil,
      seat: INITIAL_STATE_MAP.reservationReducer.seat,
    })
  })

  it("should execute `cancelReservation` when cancel reservation button is clicked", () => {
    const wrapper = shallow(<Reservation {...INITIAL_STATE} />)
    const cancelReservationMock = jest.fn()
    wrapper.instance().cancelReservation = cancelReservationMock

    wrapper.find("#cancelButton").simulate("click")

    expect(cancelReservationMock).toHaveBeenCalledTimes(1)
  })

  it("should call `onCancelReservation` when cancelling a reservation", () => {
    const wrapper = shallow(<Reservation {...INITIAL_STATE} />)

    wrapper.find("#cancelButton").simulate("click")

    expect(INITIAL_STATE.onCancelReservation).toHaveBeenCalledTimes(1)
  })

  it("should call `onGetReservation` when page is loaded", () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).onGetReservation()
    expect(dispatch).toHaveBeenCalledTimes(1)
  })

  it("should call `onCancelReservation` when reservation is cancelled", () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).onCancelReservation()
    expect(dispatch).toHaveBeenCalledTimes(1)
  })
})
