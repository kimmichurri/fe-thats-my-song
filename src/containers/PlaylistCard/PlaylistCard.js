import React from 'react';
import PropTypes from 'prop-types';

export default function PlaylistCard({title, artist, id, deleteSongFromPlaylist }) {
  return (
    <div className='playlist-song-cards'>
      <h3 className='playlist-songs-title'>{title}</h3>
      <p className='playlist-artists-title'>{artist}</p>
      <button 
        className='remove-song-button' 
        onClick={(e) => deleteSongFromPlaylist(e)} 
        value={id}>Remove</button>
    </div>
  )
}

PlaylistCard.propTypes = {
  title: PropTypes.string,
  artist: PropTypes.string,
  id: PropTypes.number
}

