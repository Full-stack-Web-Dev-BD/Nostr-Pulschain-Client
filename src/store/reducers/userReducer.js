// reducer.js

const initialState = {
    user: {},
    sidebarShow: true,
    theme: 'light',
  }
  
  const CHANGE_STATE = 'CHANGE_STATE'; // Define your action type
  
  const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
      case CHANGE_STATE:
        return { ...state, ...rest };
      default:
        return state;
    }
  };
  
  export { changeState, CHANGE_STATE, initialState };
  