import { deleteSong } from '../deleteSong';
import { setFetchError } from '../../actions';

describe('fetchSongs', () => {
  let mockUrl;
  let id;
  let mockOptions;
  let mockDispatch;

  beforeEach(() => {
    mockUrl = 'www.deletesongs.com';
    id = 63303;
    mockOptions = {
      method: "DELETE",
      id,
      headers: {
        "Content-Type": "application/json"
      }
    };
    mockDispatch = jest.fn();
  });

  it('should dispatch setFetchError if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong'
    }));
    const thunk = deleteSong(mockUrl, mockOptions);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setFetchError('Something went wrong'));
  });

});