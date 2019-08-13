import { isLoading, setFetchError, setPlaylistSongs } from '../actions';

export const getFromPlaylist = (url) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(url);
      if(!response.ok) {
        throw new Error (response.statusText)
      } else {
        const songs = await response.json();
        dispatch(setPlaylistSongs(songs));
        dispatch(isLoading(false));
      }
    } catch (error) {
      dispatch(setFetchError(error.message));
    }
  }
}