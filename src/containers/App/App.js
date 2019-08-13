import React, { Component } from 'react';
import Selections from '../Selections/Selections';
import { connect } from 'react-redux';
import { fetchSongs } from '../../thunks/fetchSongs';
import Loader from '../../components/Loader/Loader';
import PropTypes from 'prop-types';
import { Route, NavLink, Switch } from 'react-router-dom';
import SongInfo from '../SongInfo/SongInfo';
import headphones from '../../assets/headphones.png';
import Playlist from '../Playlist/Playlist';
import NotFound from '../../components/NotFound/NotFound';


export class App extends Component {

  render() {
    return (
      <div className="App">
        <header className='header'>
          <NavLink className='playlist-navlink' to='/playlist'>
            <button
              className='playlist-button'>Playlist
              <img className='headphones-icon' src={headphones} alt={'headphones icon for playlist button'}/>
            </button>
          </NavLink>
          {this.props.isLoading? 
            <Loader /> : <h1 className='main-title'>That's My Song</h1>
          }
        </header>
        <Switch>
          <Route exact path='/' component={Selections} />
          <Route path='/song-info' component={SongInfo} />
          <Route path='/playlist' component={Playlist} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  playlist: PropTypes.array.isRequired,
  fetchSongs: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
  loading: state.isLoading,
  playlist: state.setPlaylist
});

export const mapDispatchToProps = (dispatch) => ({
  fetchSongs: (url) => dispatch(fetchSongs(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
