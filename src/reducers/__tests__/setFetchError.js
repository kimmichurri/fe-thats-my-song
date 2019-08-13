import { setFetchErrorReducer } from '../setFetchError';
import * as actions from '../../actions';

describe('setFetchErrorReducer', () => {
  const state = '';
  it('should return state by default', () => {
    const action = {};
    const results = setFetchErrorReducer(state, action);
    expect(results).toEqual(state);
  });

  it('should return state with an error message', () => {
    const message = 'There was an error fetching the data';
    const action = actions.setFetchError(message);
    const results = setFetchErrorReducer(state, action);
    expect(results).toEqual(message);
  });
});