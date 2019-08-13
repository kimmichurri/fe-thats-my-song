import  { Playlist, mapStateToProps, mapDispatchToProps } from './Playlist';
import React from 'react';
import { shallow } from 'enzyme';
jest.mock('../../thunks/getFromPlaylist');
jest.mock('../../thunks/deleteSong');
import { deleteFromPlaylist } from '../../actions';

describe('Playlist', () => {
  let wrapper;
  const mockProps = {
    playlist: [{title: 'a song', artist: 'kim', id: 1}],
    getFromPlaylist: jest.fn(),
    deleteSong: jest.fn(),
    deleteFromPlaylist: jest.fn()
  } 

  beforeEach(() => {
    wrapper = shallow(
      <Playlist 
        playlist={mockProps.playlist}
        getFromPlaylist={mockProps.getFromPlaylist}
        deleteSong={mockProps.deleteSong}
        deleteFromPlaylist={mockProps.deleteFromPlaylist}
      />
    )
  });

  it('should match the snapshot', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should call props function getFromPlaylist with the correct parameters', () => {
    const url = 'http://localhost:3001/api/v1/playlist/';
    wrapper.instance().goToPlaylist();
    expect(wrapper.instance().props.getFromPlaylist).toHaveBeenCalledWith(url);
  });

  it('deleteSongFromPlaylist should call props functions deleteSong and deleteFromPlaylist with correct parameters', () => {
    const mockEvent = { target: { value: '4'} };
    const id = '4';
    const numericId = 4;
    const url = `http://localhost:3001/api/v1/playlist/4`;
    wrapper.instance().deleteSongFromPlaylist(mockEvent);
    expect(wrapper.instance().props.deleteSong).toHaveBeenCalledWith(url, id);
    expect(wrapper.instance().props.deleteFromPlaylist).toHaveBeenCalledWith(numericId);
  });

  describe('mapStateToProps', () => {
    it('should return a playlist of songs', () => {
      const mockState = {
        randomThing: 1,
        anotherThing: 'two',
        setPlaylist: [{song: 'a'}, {song: 'b'}]
      }
      const expected = {
        playlist: [{song: 'a'}, {song: 'b'}]
      }
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should return getFromPlaylist to dispatch', () => {
      const mockDispatch = jest.fn();
      const getFromPlaylist = jest.fn();
      const actionToDispatch = getFromPlaylist('www.playlist.com');
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.getFromPlaylist('www.playlist.com')
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should return deleteSong to dispatch', () => {
      const mockDispatch = jest.fn();
      const deleteSong = jest.fn();
      const actionToDispatch = deleteSong('www.delete.com', '4');
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.deleteSong('www.delete.com', '4');
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should return deleteFromPlaylist to dispatch', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = deleteFromPlaylist(4);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.deleteFromPlaylist(4);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});