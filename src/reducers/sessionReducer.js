import * as types from "../constants/ActionTypes"

const INITIAL_STATE = {
  email: null,
  token: null,
  error: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SIGN_UP_SUCCESS:
    case types.LOG_IN_SUCCESS:
      const { token, email } = action.payload
      return { error: null, token, email }

    case types.SIGN_UP_FAILURE:
    case types.LOG_IN_FAILURE:
      return { ...state, error: action.error }

    case types.LOG_OUT:
      return INITIAL_STATE

    default:
      return state
  }
}
