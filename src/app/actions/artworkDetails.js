import axios from 'misc/requests';
import {
  REQUEST_ARTWORK_BY_ID,
  RECEIVE_ARTWORK_BY_ID,
  ERROR_ARTWORK_BY_ID,
  REQUEST_SAVE_ARTWORK,
  RECEIVE_SAVE_ARTWORK,
  ERROR_SAVE_ARTWORK,
  CLEAR_ARTWORK_DETAILS,
} from 'app/constants/actionTypes';
import config from 'config';

export const fetchArtworkById = (id) => async (dispatch) => {
  dispatch({ type: REQUEST_ARTWORK_BY_ID });

  try {
    const data = await axios.get(`${config.ARTWORKS_SERVICE}/artworks/${id}`);
    console.log('FETCH ARTWORK BY ID:', data);
    dispatch({ type: RECEIVE_ARTWORK_BY_ID, payload: data });
    return { payload: data };
  } catch (err) {
    dispatch({ type: ERROR_ARTWORK_BY_ID, payload: err });
    return { payload: null, error: err };
  }
};

export const saveArtwork =
  (artwork, isNew = false) =>
  async (dispatch) => {
    dispatch({ type: REQUEST_SAVE_ARTWORK });

    try {
      const data = isNew
        ? await axios.post(`${config.ARTWORKS_SERVICE}/artworks`, artwork)
        : await axios.put(`${config.ARTWORKS_SERVICE}/artworks/${artwork.id}`, artwork);

      dispatch({ type: RECEIVE_SAVE_ARTWORK, payload: data });
      return { payload: data };
    } catch (err) {
      dispatch({ type: ERROR_SAVE_ARTWORK, payload: err });
      return { payload: null, error: err };
    }
  };

export const clearArtworkDetails = () => ({ type: CLEAR_ARTWORK_DETAILS });
