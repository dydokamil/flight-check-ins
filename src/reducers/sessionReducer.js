import * as actions from "../actions"

const INITIAL_STATE = {
  email: null,
  token: null,
  error: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SIGN_UP_SUCCESS:
    case actions.LOG_IN_SUCCESS:
      const { token, email } = action.payload
      return { error: null, token, email }

    case actions.SIGN_UP_FAILURE:
    case actions.LOG_IN_FAILURE:
      return { ...state, error: action.payload }

    case actions.LOG_OUT:
      return INITIAL_STATE

    default:
      return state
  }
}
