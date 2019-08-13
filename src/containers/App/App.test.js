import { App, mapStateToProps, mapDispatchToProps } from './App';
import React from 'react';
import { shallow } from 'enzyme';
jest.mock('../../thunks/fetchSongs');

describe('App', () => {
  let wrapper;
  const mockProps = {
    loading: false,
    playlist: [],
    fetchSongs: jest.fn()
  }
  beforeEach(() => {
    wrapper = shallow(
      <App
        loading={mockProps.loading}
        playlist={mockProps.playlist}
        fetchSongs={mockProps.fetchSongs}
      />)
  });

  it('should match the snapshot', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    it('should return a boolean to indicate if loading is true or false', () => {
      const mockState = {
        isLoading: false,
        songs: ['song 1', 'song2'],
        otherThing: 'thing1',
        anotherThing: ['thing2']
      }
      const expected = {
        loading: false
      }
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should return fetchSongs to dispatch', () => {
      const mockDispatch = jest.fn();
      const fetchSongs = jest.fn();
      const actionToDispatch = fetchSongs('www.songs.com');
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchSongs('www.songs.com');
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
