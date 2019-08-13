export const setCurrentSongReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SET_CURRENT_SONG':
      return action.song;
    default: 
      return state;
  }
}