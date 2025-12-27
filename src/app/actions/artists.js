import axios from 'misc/requests';
import config from 'config';
import {
  REQUEST_ARTISTS,
  RECEIVE_ARTISTS,
  ERROR_ARTISTS,
  CREATE_ARTIST_REQUEST,
  CREATE_ARTIST_SUCCESS,
  CREATE_ARTIST_ERROR,
} from 'app/constants/actionTypes';

export const fetchArtists = () => async (dispatch) => {
  dispatch({ type: REQUEST_ARTISTS });

  try {
    const data = await axios.get(`${config.ARTWORKS_SERVICE}/artists`);
    console.log('FETCH ARTISTS DATA:', data);
    dispatch({ type: RECEIVE_ARTISTS, payload: data });
    return { payload: data };
  } catch (err) {
    dispatch({ type: ERROR_ARTISTS, payload: err });
    return { payload: null, error: err };
  }
};

export const createArtist = (artist) => async (dispatch) => {
  dispatch({ type: CREATE_ARTIST_REQUEST });

  try {
    const data = await axios.post(`${config.ARTWORKS_SERVICE}/artists`, artist);
    console.log('CREATE ARTIST DATA:', data);
    dispatch({ type: CREATE_ARTIST_SUCCESS, payload: data });

    return { payload: data };
  } catch (err) {
    dispatch({ type: CREATE_ARTIST_ERROR, payload: err });
    return { payload: null, error: err.response?.data || err };
  }
};
