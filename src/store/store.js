import { legacy_createStore as createStore } from 'redux'
import {
  SET_USER_PROFILE,
  SET_THEME,
  ADD_NEW_NOTE,
  SEARCH_EVENTS,
  STOCK_EVENTS,
  SET_LOADING,
  RESET_SEARCH_EVENTS,
  SET_USER_PROFILE_EVENT,
  SET_USER_CONVERSATION_LIST,
} from './actions/actionType'

const initialState = {
  userState: {
    userEvents: [],
    searchedEvents: [],
    stockEvents: [],
    userConversationList:{}
  },
  loading: {
    searchLoading: false,
    conversationLoading:false,
    stockLoading: true,
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
    case SET_USER_PROFILE_EVENT:
      return { ...state, userState: { ...state.userState, userEvents:[...state.userState.userEvents , payload.event] } }
    case STOCK_EVENTS:
      return {
        ...state,
        userState: {
          ...state.userState,
          stockEvents: [...state.userState.stockEvents, payload.event],
        },
      }
    case SEARCH_EVENTS:
      return {
        ...state,
        userState: {
          ...state.userState,
          searchedEvents: [...state.userState.searchedEvents, payload.event],
        },
      }

    case RESET_SEARCH_EVENTS:
      return {
        ...state,
        userState: {
          ...state.userState,
          searchedEvents: [],
        },
      }
      // Chat page
      case SET_USER_CONVERSATION_LIST:
        
        return {
          ...state,
          userState: {
            ...state.userState,
            userConversationList: {...state.userState.userConversationList, ...payload.conversationList},
          },
        }
    case SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          ...payload,
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
