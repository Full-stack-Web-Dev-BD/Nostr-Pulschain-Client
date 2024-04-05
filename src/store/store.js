import { legacy_createStore as createStore } from 'redux'
import {
  SET_USER_PROFILE,
  SET_THEME,
  ADD_NEW_NOTE,
  SEARCH_EVENTS,
  STOCK_EVENTS,
} from './actions/actionType'

const initialState = {
  userState: {
    userEvents: [],
    searchedEvents: [],
    stockEvents: [],
  },
  sidebarShow: true,
  theme: 'light',
}

const changeState = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_THEME:
      return { ...state, ...payload }
    case SET_USER_PROFILE:
      return { ...state, userState: { ...state.userState, ...payload.userState } }
    case STOCK_EVENTS:
      return {
        ...state,
        userState: {
          ...state.userState,
          stockEvents: payload.events,
        },
      }
    case SEARCH_EVENTS:
      return {
        ...state,
        userState: {
          ...state.userState,
          searchedEvents: payload.events,
        },
      }
    case ADD_NEW_NOTE:
      return {
        ...state,
        userState: {
          ...state.userState,
          userEvents: [payload.note, ...state.userState.userEvents],
        },
      }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
