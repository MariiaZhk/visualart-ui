import axios from 'misc/requests';
import config from 'config';
import {
  REQUEST_ARTISTS,
  RECEIVE_ARTISTS,
  ERROR_ARTISTS,
} from '../constants/actionTypes';

const requestArtists = () => ({ type: REQUEST_ARTISTS });
const receiveArtists = (data) => ({ type: RECEIVE_ARTISTS, payload: data });
const errorArtists = (errors) => ({ type: ERROR_ARTISTS, payload: errors });

export const fetchArtists = () => async (dispatch) => {
  dispatch(requestArtists());
  try {
    const data = await axios.get(`${config.ARTWORKS_SERVICE}/artists`);
    dispatch(receiveArtists(data));
  } catch (err) {
    dispatch(errorArtists(err));
  }
};

const artistsActions = { fetchArtists };
export default artistsActions;
