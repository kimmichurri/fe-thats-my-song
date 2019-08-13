import { setCurrentSongReducer } from '../setCurrentSongReducer';
import * as actions from '../../actions';

describe('setCurrentSongReducer', () => {
  const state = {};
  it('should return state by default', () => {
    const action = {}
    const result = setCurrentSongReducer(state, action);
    expect(result).toEqual(state);
  });

  it('should return state with a current song', () => {
    const currentSong = {song: 'some song'};
    const action = actions.setCurrentSong(currentSong);
    const result = setCurrentSongReducer(state, action);
    expect(result).toEqual(currentSong);
  });
});