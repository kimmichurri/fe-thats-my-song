import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFromPlaylist } from '../../thunks/getFromPlaylist';
import PlaylistCard from '../../containers/PlaylistCard/PlaylistCard';
import { deleteSong } from '../../thunks/deleteSong';
import { deleteFromPlaylist } from '../../actions';

export class Playlist extends Component {

  goToPlaylist = () => {
    const url = 'http://localhost:3001/api/v1/playlist/';
    this.props.getFromPlaylist(url);
  }

  componentDidMount = () => {
   this.goToPlaylist();
  }

  deleteSongFromPlaylist = (e) => {
    const id = e.target.value
    const numericId = parseInt(e.target.value);
    const url = `http://localhost:3001/api/v1/playlist/${id}`;
    this.props.deleteSong(url, id);
    this.props.deleteFromPlaylist(numericId);
  }

  render() {
    let playlistCards = this.props.playlist.map(song => {
      return (
        <PlaylistCard
          key={song.id}
          id={song.id}
          title={song.title}
          artist={song.artist}
          deleteSongFromPlaylist={this.deleteSongFromPlaylist}
        />
      )
    });

    return (
      <div className='playlist-wrapper'>
        <h2 className='playlist-title'>Welcome to your Playlist!</h2>
        <div className='playlist-songs-cards-display'>
          {playlistCards}
        </div>
        <NavLink to='/' id='return-to-search-navlink'>
          <button className='song-info-page-buttons'>Return to Search</button>
      </NavLink> 
      </div>
    )
  }
}

Playlist.propTypes = {
  playlist: PropTypes.array.isRequired,
  getFromPlaylist: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
  playlist: state.setPlaylist,
});

export const mapDispatchToProps = (dispatch) => ({
  getFromPlaylist: (url) => dispatch(getFromPlaylist(url)),
  deleteSong: (url, id) => dispatch(deleteSong(url, id)),
  deleteFromPlaylist: (id) => dispatch(deleteFromPlaylist(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);