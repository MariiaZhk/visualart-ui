import axios from 'misc/requests';
import config from 'config';
import {
  REQUEST_ARTWORKS,
  RECEIVE_ARTWORKS,
  ERROR_ARTWORKS,
  DELETE_ARTWORK,
  REQUEST_ARTWORK,
  RECEIVE_ARTWORK,
  ERROR_ARTWORK,
} from '../constants/actionTypes';
const requestArtwork = () => ({ type: REQUEST_ARTWORK });
const receiveArtwork = (data) => ({ type: RECEIVE_ARTWORK, payload: data });
const errorArtwork = (err) => ({ type: ERROR_ARTWORK, payload: err });
const requestArtworks = () => ({ type: REQUEST_ARTWORKS });
const receiveArtworks = (data) => ({ type: RECEIVE_ARTWORKS, payload: data });
const errorArtworks = (errors) => ({ type: ERROR_ARTWORKS, payload: errors });
const deleteArtworkAction = (id) => ({ type: DELETE_ARTWORK, payload: id });

export const fetchArtworkById = (id) => async (dispatch) => {
  dispatch(requestArtwork());
  try {
    const response = await axios.get(`${config.ARTWORKS_SERVICE}/artworks/${id}`);
    dispatch(receiveArtwork(response.data));
  } catch (err) {
    dispatch(errorArtwork(err));
  }
};
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
    dispatch(requestArtworks());
    try {
      const data = await axios.post(`${config.ARTWORKS_SERVICE}/artworks/_list`, {
        page,
        size,
        artistId,
        title,
        sortBy,
        sortDir,
      });
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
  fetchArtworkById,
  fetchArtworks,
  deleteArtwork,
};

export default artworksActions;
