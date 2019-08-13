import { setFetchError } from '../actions';

export const sendToPlaylist = (url, song) => {
  return async (dispatch) => {
    const options = {
      method: "POST",
      body: JSON.stringify(song),
      headers: {
        "Content-Type": "application/json"
      }
    } 
    try {
      const response = await fetch(url, options)
      if(!response.ok) {
        throw new Error(response.statusText)
      }
    } catch(error) {
      dispatch(setFetchError(error.message))
    }
  }
}