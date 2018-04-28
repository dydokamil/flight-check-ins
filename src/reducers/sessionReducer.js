import * as actions from "../actions"

const INITIAL_STATE = {
  email: null,
  password: null,
  error: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SIGN_UP_SUCCESS:
      return { ...state, error: null, ...action.payload }

    case actions.SIGN_UP_FAILURE:
      console.log(action)
      return { ...state, error: action.payload }

    default:
      return state
  }
}
