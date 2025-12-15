import axios from 'misc/requests';
import config from 'config';
import {
  REQUEST_ARTWORKS,
  RECEIVE_ARTWORKS,
  ERROR_ARTWORKS,
  DELETE_ARTWORK,
} from '../constants/actionTypes';


const requestArtworks = () => ({ type: REQUEST_ARTWORKS });
const receiveArtworks = (data) => ({ type: RECEIVE_ARTWORKS, payload: data });
const errorArtworks = (errors) => ({ type: ERROR_ARTWORKS, payload: errors });
const deleteArtworkAction = (id) => ({ type: DELETE_ARTWORK, payload: id });


export const fetchArtworks = ({ page = 1, size = config.DEFAULT_PAGE_SIZE }) => async (dispatch) => {
  dispatch(requestArtworks());
  try {
    const data = await axios.post(`${config.ARTWORKS_SERVICE}/artworks/_list`, { page, size });
    dispatch(receiveArtworks(data));
  } catch (err) {
    dispatch(errorArtworks(err));
  }
};

export const deleteArtwork = (id) => async (dispatch) => {
  try {
    await axios.delete(`${config.ARTWORKS_SERVICE}/artworks/${id}`);
    dispatch(deleteArtworkAction(id));
    return true;
  } catch (err) {
    throw err;
  }
};


const artworksActions = {
  fetchArtworks,
  deleteArtwork,
};

export default artworksActions;
