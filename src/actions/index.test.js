import * as actions from './index';

describe('actions', () => {
  it('should return a type of IS_LOADING with a boolean', () => {
    const boolean = 'true';
    const expected = {
      type: 'IS_LOADING',
      isLoading: boolean
    }
    const result = actions.isLoading(boolean);
    expect(result).toEqual(expected);
  });

  it('should return a type of SET_SONGS with songs', () => {
    const songs = [
      {
        "id": 63303,
        "title": "Don't Think Twice It's Alright",
        "artist": "Dylan, Bob",
        "tags": [
            "Folk",
            "Pop",
            "Rock"
        ]
      },
      {
        "id": 68158,
        "title": "There's A Light That Never Goes Out",
        "artist": "Smiths, The",
        "tags": [
            "Alternative",
            "Indie",
            "Pop",
            "Rock",
            "80s",
            "British"
        ]
      }
    ]
    const expected = {
      type: 'SET_SONGS',
      songs
    }
    const result = actions.setSongs(songs);
    expect(result).toEqual(expected);
  });

  it('should return a type of SET_CURRENT_SONG with a song', () => {
    const song = {song: 'this is a song'};
    const expected = {
      type: 'SET_CURRENT_SONG',
      song
    }
    const result = actions.setCurrentSong(song);
    expect(result).toEqual(expected);
  });

  it('should return a type of SET_CURRENT_CATEGORY with a category', () => {
    const category = '90s';
    const expected = {
      type: 'SET_CURRENT_CATEGORY',
      category
    }
    const result = actions.setCurrentCategory(category);
    expect(result).toEqual(expected);
  });

  it('should return a type of SET_FETCH_ERROR with a message', () => {
    const message = 'There was a problem fetching the data';
    const expected = {
      type: 'SET_FETCH_ERROR',
      message
    }
    const result = actions.setFetchError(message);
    expect(result).toEqual(expected);
  });

  it('should return a type of SET_PLAYLIST_SONGS with some songs', () => {
    const songs = [
      {
        "id": 63303,
        "title": "Don't Think Twice It's Alright",
        "artist": "Dylan, Bob",
        "tags": [
            "Folk",
            "Pop",
            "Rock"
        ]
      },
      {
        "id": 68158,
        "title": "There's A Light That Never Goes Out",
        "artist": "Smiths, The",
        "tags": [
            "Alternative",
            "Indie",
            "Pop",
            "Rock",
            "80s",
            "British"
        ]
      }
    ]
    const expected = {
      type: 'SET_PLAYLIST_SONGS',
      songs
    }
    const result = actions.setPlaylistSongs(songs);
    expect(result).toEqual(expected);
  });

  it('should return a type of DELETE_FROM_PLAYLIST with an id', () => {
    const id = 4;
    const expected = {
      type: 'DELETE_FROM_PLAYLIST',
      id
    }
    const result = actions.deleteFromPlaylist(id);
    expect(result).toEqual(expected);
  });

});