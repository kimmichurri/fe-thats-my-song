export const setFetchErrorReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_FETCH_ERROR':
      return action.message;
    default:  
      return state;
  }
}