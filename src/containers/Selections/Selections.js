import React, { Component } from 'react';
import { fetchSongs } from '../../thunks/fetchSongs';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setCurrentSong, setCurrentCategory } from '../../actions/index';

export class Selections extends Component {

  setUrl = (e) => {
    let url;
    const { value } = e.target;
    this.props.setCurrentCategory(value);
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

  // http://vbsongs.com/api/v1/songs/roulette?organization=d00d11e681934f4688fdce9cebd5afce&session=2b2bc3b9-6bbc-4a39-b147-0758264985f2&language=English

  pickRandomSong = () => {
    let randomIndex = Math.floor(Math.random() * 10); 
    let randomSong = this.props.songs[randomIndex]
    this.props.setCurrentSong(randomSong);
  }

  render() {
    return (
      <section>
        <div className='genre-selection-radio-wrapper'>
          <div className='inputs-wrapper'>
            <label htmlFor='90s' className='genre-selection-labels'>90s</label>
            <input type='radio' name='radio' id='90s' value='90s' onClick={this.setUrl}></input>
          </div>
          <div className='inputs-wrapper'>
            <label htmlFor='00s' className='genre-selection-labels'>00s</label>
            <input type='radio' name='radio' id='00s' value='00s' onClick={this.setUrl}></input>
          </div>
          <div className='inputs-wrapper'>
            <label htmlFor='rap' className='genre-selection-labels'>Rap</label>
            <input type='radio' name='radio' id='rap' value='Rap' onClick={this.setUrl}></input>
          </div>
          <div className='inputs-wrapper'>
            <label htmlFor='rock' className='genre-selection-labels'>Rock</label>
            <input type='radio' name='radio' id='rock' value='Rock' onClick={this.setUrl}></input>
          </div>
          <div className='inputs-wrapper'>
            <label htmlFor='pop' className='genre-selection-labels'>Pop</label>
            <input type='radio' name='radio' id='pop' value='Pop' onClick={this.setUrl}></input>
          </div>
          <div className='inputs-wrapper'>
            <label htmlFor='wildcard' className='genre-selection-labels'>Wildcard</label>
            <input type='radio' name='radio' id='wildcard' value='Wildcard' onClick={this.setUrl}></input>
          </div>
        </div>
        <div className='spin-me-button-wrapper'>
          <NavLink to='/song-info'>
            <button
              disabled={!this.props.songs.length}
              onClick={this.pickRandomSong}
              className='spin-me-button'>Take me to my {this.props.currentCategory} tune!
            </button>
          </NavLink>
          {!this.props.songs.length && <p className='please-select-category'>please select a category first</p>}
        </div>
      </section>
    )
  }
}

Selections.propTypes = {
  songs: PropTypes.array.isRequired,
  currentCategory: PropTypes.string.isRequired,
  fetchSongs: PropTypes.func.isRequired,
  setCurrentCategory: PropTypes.func.isRequired,
  setCurrentSong: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
  songs: state.setSongs,
  currentCategory: state.setCurrentCategory
});

export const mapDispatchToProps = (dispatch) => ({
  fetchSongs: (url) =>  dispatch(fetchSongs(url)),
  setCurrentCategory: (category) => dispatch(setCurrentCategory(category)),
  setCurrentSong: (song) => dispatch(setCurrentSong(song))
});

export default connect(mapStateToProps, mapDispatchToProps)(Selections);

