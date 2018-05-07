import * as types from "../constants/ActionTypes"

const INITIAL_STATE = {
  email: null,
  token: null,
  error: null,
  loading: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOG_IN_REQUEST:
    case types.SIGN_UP_REQUEST:
      return { ...state, loading: true }

    case types.SIGN_UP_SUCCESS:
    case types.LOG_IN_SUCCESS:
      const { token, email } = action.payload
      return { error: null, token, email, loading: false }

    case types.SIGN_UP_FAILURE:
    case types.LOG_IN_FAILURE:
      return { ...state, error: action.error, loading: false }

    case types.CLEAN_UP_LOGIN_ERROR:
      return { ...state, error: null }

    case types.LOG_OUT:
      return INITIAL_STATE

    default:
      return state
  }
}
