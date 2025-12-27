import axios from 'misc/requests';
import config from 'config';
import {
  REQUEST_ARTWORKS,
  RECEIVE_ARTWORKS,
  ERROR_ARTWORKS,
  DELETE_ARTWORK_REQUEST,
  DELETE_ARTWORK_SUCCESS,
  DELETE_ARTWORK_ERROR,
} from 'app/constants/actionTypes';

export const fetchArtworks =
  ({
    page = 1,
    size = config.DEFAULT_PAGE_SIZE,
    artistId,
    title,
    sortBy = 'title',
    sortDir = 'asc',
  }) =>
  async (dispatch) => {
    dispatch({ type: REQUEST_ARTWORKS });

    try {
      const data = await axios.post(`${config.ARTWORKS_SERVICE}/artworks/_list`, {
        page,
        size,
        artistId,
        title,
        sortBy,
        sortDir,
      });

      dispatch({ type: RECEIVE_ARTWORKS, payload: data });
      return { payload: data };
    } catch (err) {
      dispatch({ type: ERROR_ARTWORKS, payload: err });
      return { payload: null, error: err };
    }
  };

export const deleteArtwork = (id) => async (dispatch) => {
  dispatch({ type: DELETE_ARTWORK_REQUEST });

  try {
    await axios.delete(`${config.ARTWORKS_SERVICE}/artworks/${id}`);
    dispatch({ type: DELETE_ARTWORK_SUCCESS, payload: id });
    return { payload: id };
  } catch (err) {
    dispatch({ type: DELETE_ARTWORK_ERROR, payload: err });
    return { payload: null, error: err };
  }
};
