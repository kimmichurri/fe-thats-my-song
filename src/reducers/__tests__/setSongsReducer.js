import { setSongsReducer } from '../setSongsReducer';
import * as actions from '../../actions';

describe('setSongsReducer', () => {
  const state = []; 
  it('should return default state', () => {
    const action = {
    }
    const results = setSongsReducer(state, action);
    expect(results).toEqual(state);
  });

  it('should return state with an array of songs', () => {
    const songs = [
      {
        "id": 63303,
        "title": "Don't Think Twice It's Alright",
        "artist": "Dylan, Bob"
      },
      {
        "id": 68158,
        "title": "There's A Light That Never Goes Out",
        "artist": "Smiths, The"
      }
    ]
    const action = actions.setSongs(songs);
    const results = setSongsReducer(state, action);
    expect(results).toEqual(songs);
  });
});