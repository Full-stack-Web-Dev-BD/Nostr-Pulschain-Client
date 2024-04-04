import { legacy_createStore as createStore } from 'redux'
import { SET_USER_PROFILE, SET_THEME } from './actions/actionType'

const initialState = {
  userState: {},
  sidebarShow: true,
  theme: 'light',
}

const changeState = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_THEME:
      return { ...state, ...payload }
    case SET_USER_PROFILE:
      return { ...state, userState: { ...state.userState,...payload.userState} }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
