import reducer from "../../reducers/seatsReducer"
import * as types from "../../constants/ActionTypes"
import seatsData from "../../__mockData__/seats.json"

describe("seats reducer", () => {
  it("should return the initial state", () => {
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
      error: "Some error",
    }

    expect(reducer(undefined, {})).toEqual(INITIAL_STATE)

    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_SEATS_REQUEST,
      }),
    ).toEqual(LOADING_STATE)

    expect(
      reducer(LOADING_STATE, {
        type: types.FETCH_SEATS_SUCCESS,
        payload,
      }),
    ).toEqual(SUCCESS_STATE)

    expect(
      reducer(LOADING_STATE, {
        type: types.FETCH_SEATS_FAILURE,
        error: "Some error",
      }),
    ).toEqual(FAILURE_STATE)

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
