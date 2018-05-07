import reducer from '../../reducers/reservationReducer'
import * as types from '../../constants/ActionTypes'

describe('reservation reducer', () => {
  const INITIAL_STATE = {
    error: null,
    loading: false,
    reservedUntil: null,
    paid: null,
    price: null,
  }
  const LOADING_STATE = {
    ...INITIAL_STATE,
    loading: true,
  }
  const payload = {
    reservedUntil: new Date(),
    paid: false,
    price: 0,
  }
  const SUCCESS_STATE = {
    ...LOADING_STATE,
    loading: false,
    ...payload,
  }
  const FAILURE_STATE = {
    ...LOADING_STATE,
    loading: false,
    error: 'Some error',
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE)
  })

  it('should return loading state', () => {
    expect(
      reducer(INITIAL_STATE, { type: types.MAKE_RESERVATION_REQUEST }),
    ).toEqual(LOADING_STATE)
  })

  it('should return loading state', () => {
    expect(
      reducer(INITIAL_STATE, { type: types.CANCEL_RESERVATION_REQUEST }),
    ).toEqual(LOADING_STATE)
  })

  it('should return success state for when making a reservation', () => {
    expect(
      reducer(LOADING_STATE, {
        type: types.MAKE_RESERVATION_SUCCESS,
        payload,
      }),
    ).toEqual(SUCCESS_STATE)
  })

  it('should return success state for when getting a reservation', () => {
    expect(
      reducer(LOADING_STATE, {
        type: types.GET_RESERVATION_SUCCESS,
        payload,
      }),
    ).toEqual(SUCCESS_STATE)
  })

  it('should return failure state for when making a reservation', () => {
    expect(
      reducer(LOADING_STATE, {
        type: types.MAKE_RESERVATION_FAILURE,
        error: 'Some error',
      }),
    ).toEqual(FAILURE_STATE)
  })

  it('should return failure state for when getting a reservation', () => {
    expect(
      reducer(LOADING_STATE, {
        type: types.GET_RESERVATION_FAILURE,
        error: 'Some error',
      }),
    ).toEqual(FAILURE_STATE)
  })

  it('should return failure state for when getting a reservation', () => {
    expect(
      reducer(LOADING_STATE, {
        type: types.GET_RESERVATION_FAILURE,
        error: 'Some error',
      }),
    ).toEqual(FAILURE_STATE)
  })

  it('should return initial state for when cancelling a reservation', () => {
    expect(
      reducer(SUCCESS_STATE, {
        type: types.CANCEL_RESERVATION_SUCCESS,
      }),
    ).toEqual(INITIAL_STATE)
  })

  it('should return initial state for when cleaning up', () => {
    expect(
      reducer(SUCCESS_STATE, {
        type: types.CLEAN_UP,
      }),
    ).toEqual(INITIAL_STATE)
  })
})
