import * as actions from "../../actions"

describe("Fetch seats action creators", () => {
  it("should create an action for a successful seats fetch", () => {
    const data = ["seat1", "seat2"]
    const expectedAction = {
      type: actions.FETCH_SEATS_SUCCESS,
      payload: data,
    }
    expect(actions.fetchSeatsSuccess(data)).toEqual(expectedAction)
  })

  it("should create an action for an unsuccessful seats fetch", () => {
    const error = new Error("Some error")
    const expectedAction = {
      type: actions.FETCH_SEATS_FAILURE,
      error,
    }
    expect(actions.fetchSeatsFailure(error)).toEqual(expectedAction)
  })
})

describe("Sign up action creators", () => {
  it("should create an action for a successful signup", () => {
    const data = { email: "Someone", password: "test" }
    const expectedAction = {
      type: actions.SIGN_UP_SUCCESS,
      payload: data,
    }
    expect(actions.signUpSuccess(data)).toEqual(expectedAction)
  })

  it("should create an action for an unsuccessful signup", () => {
    const error = new Error("Some error")
    const expectedAction = {
      type: actions.SIGN_UP_FAILURE,
      error,
    }
    expect(actions.signUpFailure(error)).toEqual(expectedAction)
  })
})

describe("Log in action creators", () => {
  it("should create an action for a successful login", () => {
    const data = { email: "Someone", password: "test" }
    const expectedAction = {
      type: actions.LOG_IN_SUCCESS,
      payload: data,
    }
    expect(actions.logInSuccess(data)).toEqual(expectedAction)
  })

  it("should create an action for an unsuccessful login", () => {
    const error = new Error("Some error")
    const expectedAction = {
      type: actions.LOG_IN_FAILURE,
      error,
    }
    expect(actions.logInFailure(error)).toEqual(expectedAction)
  })
})

describe("Log out action creator", () => {
  it("should create an action for a successful login", () => {
    const expectedAction = {
      type: actions.LOG_OUT,
    }
    expect(actions.logOut()).toEqual(expectedAction)
  })
})

describe("Make reservation action creators", () => {
  it("should create an action for a successful reservation", () => {
    const data = { id: "Someone", price: 50 }
    const expectedAction = {
      type: actions.MAKE_RESERVATION_SUCCESS,
      payload: data,
    }
    expect(actions.makeReservationSuccess(data)).toEqual(expectedAction)
  })

  it("should create an action for an unsuccessful reservation", () => {
    const error = new Error("Some error")
    const expectedAction = {
      type: actions.MAKE_RESERVATION_FAILURE,
      error,
    }
    expect(actions.makeReservationFailure(error)).toEqual(expectedAction)
  })
})

describe("Get reservation action creators", () => {
  it("should create an action for a successful reservation retrieval", () => {
    const data = { id: "Someone", price: 50 }
    const expectedAction = {
      type: actions.GET_RESERVATION_SUCCESS,
      payload: data,
    }
    expect(actions.getReservationSuccess(data)).toEqual(expectedAction)
  })

  it("should create an action for an unsuccessful reservation retrieval", () => {
    const error = new Error("Some error")
    const expectedAction = {
      type: actions.GET_RESERVATION_FAILURE,
      error,
    }
    expect(actions.getReservationFailure(error)).toEqual(expectedAction)
  })
})

describe("Cancel reservation action creators", () => {
  it("should create an action for a successful reservation cancelation", () => {
    const data = { id: "Someone", price: 50 }
    const expectedAction = {
      type: actions.CANCEL_RESERVATION_SUCCESS,
      payload: data,
    }
    expect(actions.cancelReservationSuccess(data)).toEqual(expectedAction)
  })

  it("should create an action for an unsuccessful reservation cancelation", () => {
    const error = new Error("Some error")
    const expectedAction = {
      type: actions.CANCEL_RESERVATION_FAILURE,
      payload: error,
    }
    expect(actions.cancelReservationFailure(error)).toEqual(expectedAction)
  })
})
