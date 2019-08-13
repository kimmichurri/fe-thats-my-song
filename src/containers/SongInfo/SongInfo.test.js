import React from 'react';
import { shallow } from 'enzyme';
import { SongInfo, mapStateToProps, mapDispatchToProps } from './SongInfo';
jest.mock('../../thunks/fetchSongs');
jest.mock('../../thunks/sendToPlaylist');
import { setCurrentSong } from '../../actions';

describe('SongInfo', () => {
  let wrapper;
  const mockProps = {
    currentCategory: 'Rap',
    currentSong: {title: 'current song', artist: 'current artist', id: 1 },
    songs: [{title: 'a song', artist: 'kim', id: 1}],
    fetchSongs: jest.fn(),
    setCurrentSong: jest.fn(),
    sendToPlaylist: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(
      <SongInfo 
        currentCategory={mockProps.currentCategory}
        currentSong={mockProps.currentSong}
        songs={mockProps.songs}
        fetchSongs={mockProps.fetchSongs}
        setCurrentSong={mockProps.setCurrentSong}
        sendToPlaylist={mockProps.sendToPlaylist}
      />
    )
  });

  it('should match the snapshot', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should call fetchSongs with the correct URL if the value is WILDCARD', () => {
    const url = `http://voiceboxpdx.com/api/v1/songs/roulette`;
    const mockEvent = { target: { value: 'Wildcard' } };
    wrapper.instance().reSpinCategory(mockEvent);
    expect(wrapper.instance().props.fetchSongs).toHaveBeenCalledWith(url);
  });

  it('should call fetchSongs with the correct URL if the value is NOT WILDCARD ', () => {
    const mockEvent = { target: { value: '90s' } };
    const url = `http://voiceboxpdx.com/api/v1/songs/roulette?tag=${mockEvent.target.value}`;
    wrapper.instance().reSpinCategory(mockEvent);
    expect(wrapper.instance().props.fetchSongs).toHaveBeenCalledWith(url);
  });

  it('pickRandomSong should call reSpinCategory with the correct parameters', () => {
    const mockEvent = { target: { value: '90s'} };
    const spy = jest.spyOn(wrapper.instance(), 'reSpinCategory');
    wrapper.instance().pickRandomSong(mockEvent);
    expect(spy).toHaveBeenCalledWith(mockEvent);
  });

  it('should call sendToPlaylist with the correct parameters', () => {
    const url = 'http://localhost:3001/api/v1/playlist/';
    wrapper.instance().addToPlaylist();
    expect(wrapper.instance().props.sendToPlaylist).toHaveBeenCalledWith(url, mockProps.currentSong)
  });

  describe('mapStateToProps', () => {
    it('should return an array of songs, a currentSong and currentCategory', () => {
      const mockState = {
        isLoading: false,
        setSongs: [
          {"title": "Don't Think Twice It's Alright",
            "artist": "Dylan, Bob"},
          {"title": "There's A Light That Never Goes Out",
            "artist": "Smiths, The"}
        ],
        otherThing: 'thing1',
        anotherThing: ['thing2'],
        setCurrentSong: {song: 'currentSong'},
        setCurrentCategory: '80s'
      }
      const expected = {
        songs: [
          {"title": "Don't Think Twice It's Alright",
            "artist": "Dylan, Bob"},
          {"title": "There's A Light That Never Goes Out",
            "artist": "Smiths, The"}
        ],
        currentSong: {song: 'currentSong'},
        currentCategory: '80s',
      }
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should return fetchSongs as props to dispatch', () => {
      const mockDispatch = jest.fn();
      const fetchSongs = jest.fn();
      const actionToDispatch = fetchSongs('www.songs.com');
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchSongs('www.songs.com');
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should return sendToPlaylist as props to dispatch', () => {
      const mockDispatch = jest.fn();
      const sendToPlaylist = jest.fn();
      const actionToDispatch = sendToPlaylist({song: 'a song to send'});
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.sendToPlaylist({song: 'a song to send'});
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