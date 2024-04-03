import { legacy_createStore as createStore } from 'redux'
import { INIT_USER_PROFILE, SET_THEME } from './actions/actionType'

const initialState = {
  userState: {},
  sidebarShow: true,
  theme: 'light',
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case SET_THEME:
      return { ...state, ...rest }
    case INIT_USER_PROFILE:
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
