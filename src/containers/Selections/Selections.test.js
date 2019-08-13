import React from 'react';
import { shallow } from 'enzyme';
import { Selections, mapStateToProps, mapDispatchToProps } from './Selections';
jest.mock('../../thunks/fetchSongs');
import { setCurrentCategory, setCurrentSong } from '../../actions';

describe('Selections', () => {
  let wrapper;
  const mockProps = {
    songs: [{title: 'a song', artist: 'kim', id: 1}],
    currentCategory: 'Rap',
    fetchSongs: jest.fn(),
    setCurrentCategory: jest.fn(),
    setCurrentSong: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(
      <Selections 
        songs={mockProps.songs}
        currentCategory={mockProps.currentCategory}
        fetchSongs={mockProps.fetchSongs}
        setCurrentCategory={mockProps.setCurrentCategory}
        setCurrentSong={mockProps.setCurrentSong}
      />
    )
  });

  it('should match the snapshot', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should call setCurrentCategory with a value', () => {
    const mockEvent = {target: { value: '90s'}};
    const { value } = mockEvent.target;
    wrapper.instance().setUrl(mockEvent);
    expect(wrapper.instance().props.setCurrentCategory).toHaveBeenCalledWith(value);
  });

  it('should call fetchSongs with the correct URL if the value is WILDCARD', () => {
    const url = `http://voiceboxpdx.com/api/v1/songs/roulette`;
    const mockEvent = { target: { value: 'Wildcard' } };
    wrapper.instance().setUrl(mockEvent);
    expect(wrapper.instance().props.fetchSongs).toHaveBeenCalledWith(url);
  });

  it('should call fetchSongs with the correct URL if the value is NOT WILDCARD ', () => {
    const mockEvent = { target: { value: '90s' } };
    const url = `http://voiceboxpdx.com/api/v1/songs/roulette?tag=${mockEvent.target.value}`;
    wrapper.instance().setUrl(mockEvent);
    expect(wrapper.instance().props.fetchSongs).toHaveBeenCalledWith(url);
  });

  it.skip('should call setCurrentSong with a randomSong', () => {
    Math.random = jest.fn().mockImplementation(() => .1)
    wrapper.instance().pickRandomSong();
    expect(wrapper.instance().props.setCurrentSong).toHaveBeenCalledWith({song: 'b song'})
  });

  describe('mapStateToProps', () => {
    it('should return songs and current category as props', () => {
      const mockState = {
        setSongs: [{song: 'a'}, {song: 'b'}],
        setCurrentCategory: '90s',
        otherThing: 'thing1',
        anotherThing: ['thing2']
      }
      const expected = {
        songs: [{song: 'a'}, {song: 'b'}],
        currentCategory: '90s'
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

    it('should return setCurrentCategory as props to dispatch', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setCurrentCategory('90s');
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setCurrentCategory('90s');
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should return setCurrentSong as props to dispatch', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setCurrentSong({song: 'some song'});
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setCurrentSong({song: 'some song'});
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});