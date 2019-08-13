import { setCurrentCategoryReducer } from '../setCurrentCategoryReducer';
import * as actions from '../../actions';

describe('setCurrentCategoryReducer', () => {
  const state = '';
  it('should return state by default', () => {
    const action = {}
    const results = setCurrentCategoryReducer(state, action);
    expect(results).toEqual(state);
  });

  it('should return state with a category', () => {
    const category = '90s';
    const action = actions.setCurrentCategory(category);
    const results = setCurrentCategoryReducer(state, action);
    expect(results).toEqual(category);
  });
});