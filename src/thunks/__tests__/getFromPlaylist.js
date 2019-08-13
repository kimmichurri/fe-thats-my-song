import { getFromPlaylist } from '../getFromPlaylist';
import { isLoading, setFetchError, setPlaylistSongs } from '../../actions';

describe('getFromPlaylist', () => {
  let mockUrl;
  let mockDispatch;
  let mockSongs;

  beforeEach(() => {
    mockUrl= 'www.somesongs.com';
    mockDispatch = jest.fn();
    mockSongs = [
      {
        "id": 63303,
        "title": "Don't Think Twice It's Alright",
        "artist": "Dylan, Bob"
      },
      {
        "id": 68158,
        "title": "There's A Light That Never Goes Out",
        "artist": "Smiths, The"
      }
    ]
  });

  it('should dispatch setFetchError if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong'
    }));
    const thunk = getFromPlaylist(mockUrl);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setFetchError('Something went wrong'));
  });

  it('calls dispatch with isLoading(true)', () => {
    const thunk = getFromPlaylist(mockUrl);
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true));
  });

  it('calls dispatch with setPlaylistSongs and isLoading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockSongs)
    }));
    const thunk = await getFromPlaylist(mockUrl);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setPlaylistSongs(mockSongs));
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false));
  });
});