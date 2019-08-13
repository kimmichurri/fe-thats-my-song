import { combineReducers } from 'redux';
import { isLoadingReducer } from './isLoadingReducer';
import { setSongsReducer } from './setSongsReducer';
import { setCurrentSongReducer } from'./setCurrentSongReducer';
import { setCurrentCategoryReducer } from './setCurrentCategoryReducer';
import { setFetchErrorReducer } from './setFetchError';
import { setPlaylistSongsReducer } from './setPlaylistSongsReducer';

const rootReducer = combineReducers({
  isLoading: isLoadingReducer,
  setSongs: setSongsReducer,
  setCurrentSong: setCurrentSongReducer,
  setCurrentCategory: setCurrentCategoryReducer,
  error: setFetchErrorReducer,
  setPlaylist: setPlaylistSongsReducer
});

export default rootReducer;