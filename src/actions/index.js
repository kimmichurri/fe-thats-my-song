export const isLoading = (boolean) => ({
  type: 'IS_LOADING',
  isLoading: boolean
});

export const setSongs = (songs) => ({  
  type: 'SET_SONGS',
  songs
});

export const setCurrentSong = (song) => ({
  type: 'SET_CURRENT_SONG',
  song
});

export const setCurrentCategory = (category) => ({
  type: 'SET_CURRENT_CATEGORY',
  category
});

export const setFetchError = (message) => ({
  type: 'SET_FETCH_ERROR',
  message
});

export const setPlaylistSongs = (songs) => ({
  type: 'SET_PLAYLIST_SONGS',
  songs
});

export const deleteFromPlaylist = (id) => ({
  type: 'DELETE_FROM_PLAYLIST',
  id
});