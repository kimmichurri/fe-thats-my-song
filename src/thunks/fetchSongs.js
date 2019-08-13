import { isLoading, setSongs, setFetchError } from '../actions';

export const fetchSongs = (url) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      const response = await fetch(url);
      if(!response.ok) {
        throw new Error (response.statusText)
      }
      const results = await response.json();
      const songs = results.songs;
      dispatch(setSongs(songs));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(setFetchError(error.message));
    }
  }
}