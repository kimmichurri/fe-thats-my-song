import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSongs } from '../../thunks/fetchSongs';
import { setCurrentSong } from '../../actions/index';
import { NavLink } from 'react-router-dom'; 
import { sendToPlaylist } from '../../thunks/sendToPlaylist';

export class SongInfo extends Component {

  reSpinCategory = (e) => {
    let url;
    const { value } = e.target
    switch (value) {
      case 'Wildcard':
        url = `http://voiceboxpdx.com/api/v1/songs/roulette?organization=d00d11e681934f4688fdce9cebd5afce&session=2b2bc3b9-6bbc-4a39-b147-0758264985f2`
        this.props.fetchSongs(url)
        break;
      default:
        url = `http://voiceboxpdx.com/api/v1/songs/roulette?tag=${value}&organization=d00d11e681934f4688fdce9cebd5afce&session=2b2bc3b9-6bbc-4a39-b147-0758264985f2`
        this.props.fetchSongs(url)
    }
  }

  pickRandomSong = (e) => {
    this.reSpinCategory(e);
    let randomIndex = Math.floor(Math.random() * 10);
    let randomSong = this.props.songs[randomIndex];
    this.props.setCurrentSong(randomSong);
  }

  addToPlaylist = () => {
    const url = 'http://localhost:3001/api/v1/playlist/';
    const {title, artist, id} = this.props.currentSong;
    this.props.sendToPlaylist(url, {title, artist, id});
  }
  
  render() {
    const { title, artist } = this.props.currentSong;
    return (
      <div className='song-info-wrapper'>
        <p className='song-category secondary'>{this.props.currentCategory}</p>
        <div className='current-spin-wrapper'>
          <h3 className='song-title'>{title}</h3>
          <p className='song-artist secondary'>{artist}</p>
        </div>
        <button
          onClick={this.addToPlaylist}
          className='song-info-page-buttons'>Add to Playlist
        </button>
        <button
          className='song-info-page-buttons'
          value={this.props.currentCategory}
          onClick={this.pickRandomSong}>Spin {this.props.currentCategory} Again
        </button>
        <NavLink to='/' id='return-to-search-navlink'>
          <button className='song-info-page-buttons'>Return to Search</button>
        </NavLink>
      </div>
    )
  }
}

SongInfo.propTypes = {
  currentCategory: PropTypes.string.isRequired,
  currentSong: PropTypes.object.isRequired,
  songs: PropTypes.array.isRequired,
  fetchSongs: PropTypes.func.isRequired,
  setCurrentSong: PropTypes.func.isRequired,
  sendToPlaylist: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
  currentCategory: state.setCurrentCategory,
  currentSong: state.setCurrentSong,
  songs: state.setSongs
});

export const mapDispatchToProps = (dispatch) => ({
  fetchSongs: (url) => dispatch(fetchSongs(url)),
  setCurrentSong: (song) => dispatch(setCurrentSong(song)),
  sendToPlaylist: (url, song) => dispatch(sendToPlaylist(url, song))
});

export default connect(mapStateToProps, mapDispatchToProps)(SongInfo);