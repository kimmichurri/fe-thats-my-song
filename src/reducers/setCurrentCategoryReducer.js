export const setCurrentCategoryReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_CURRENT_CATEGORY':
      return action.category
    default: 
      return state;
  }
}