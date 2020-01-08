import { fromJS } from 'immutable'

const defaultState = fromJS({})

export default function user(state = defaultState, action) {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return action.user
    case 'USER_LOGGED_OUT':
      return {}
    default:
      return state
  }
}
