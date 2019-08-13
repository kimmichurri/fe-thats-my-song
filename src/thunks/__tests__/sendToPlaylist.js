import { sendToPlaylist } from '../sendToPlaylist';
import { setFetchError } from '../../actions';

describe('sendToPlaylist', () => {
  let mockUrl;
  let mockDispatch;
  let song;

  beforeEach(() => {
    mockUrl = 'www.yourplaylist.com';
    mockDispatch = jest.fn();
    song = {
      title: 'a song',
      artist: 'some artist',
      id: 1987
    }
  });

  it('should dispatch setFetchError if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong'
    }));
    const thunk = sendToPlaylist(mockUrl, song);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setFetchError('Something went wrong'));
  });


});