import { setFetchError } from '../actions';

export const deleteSong = (url, id) => {
  return async (dispatch) => {
    const options = {
      method: "DELETE",
      id,
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