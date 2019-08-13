export const setPlaylistSongsReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_PLAYLIST_SONGS':
      return action.songs;
    case 'DELETE_FROM_PLAYLIST':
      const newPlaylist = state.filter((song) => {
        return song.id !== action.id
      });
      return state = newPlaylist;
    default: 
      return state;
  }
}