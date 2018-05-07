import reducer from '../../reducers/seatsReducer'
import * as types from '../../constants/ActionTypes'
import seatsData from '../../__mockData__/seats.json'

describe('seats reducer', () => {
  const INITIAL_STATE = {
    loading: false,
    seats: null,
    basePrice: null,
    checkInFee: null,
    error: null,
  }
  const LOADING_STATE = {
    ...INITIAL_STATE,
    loading: true,
  }
  const payload = {
    seats: [],
    basePrice: 0,
    checkInFee: 0,
    error: null,
  }
  const SUCCESS_STATE = {
    ...payload,
    loading: false,
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
      reducer(INITIAL_STATE, {
        type: types.FETCH_SEATS_REQUEST,
      }),
    ).toEqual(LOADING_STATE)
  })

  it('should return success state', () => {
    expect(
      reducer(LOADING_STATE, {
        type: types.FETCH_SEATS_SUCCESS,
        payload,
      }),
    ).toEqual(SUCCESS_STATE)
  })

  it('should return failure state', () => {
    expect(
      reducer(LOADING_STATE, {
        type: types.FETCH_SEATS_FAILURE,
        error: 'Some error',
      }),
    ).toEqual(FAILURE_STATE)
  })

  it('should return available `false` on one of the seats', () => {
    expect(
      reducer(seatsData, {
        type: types.MAKE_RESERVATION_SUCCESS,
        payload: { seat: { id: 1 } },
      }),
    ).toEqual({
      ...seatsData,
      seats: [{ ...seatsData.seats[0], available: false }, seatsData.seats[1]],
    })
  })
})
