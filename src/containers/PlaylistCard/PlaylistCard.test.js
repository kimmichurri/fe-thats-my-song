import React from 'react';
import { shallow } from 'enzyme';
import PlaylistCard from './PlaylistCard';

describe('PlaylistCard', () => {
  let wrapper;
  let mockDeleteSongFromPlaylist;
  beforeEach(() => {
    mockDeleteSongFromPlaylist = jest.fn()
    wrapper = shallow(<PlaylistCard deleteSongFromPlaylist={mockDeleteSongFromPlaylist}/>);
  });

  it('should match the snapshot', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should call props function deleteSongFromPlaylist on click', () => {
    wrapper.find('.remove-song-button').simulate('click');
    expect(mockDeleteSongFromPlaylist).toHaveBeenCalled();
  });
});