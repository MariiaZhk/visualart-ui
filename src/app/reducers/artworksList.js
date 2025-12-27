import {
  REQUEST_ARTWORKS,
  RECEIVE_ARTWORKS,
  ERROR_ARTWORKS,
  DELETE_ARTWORK_REQUEST,
  DELETE_ARTWORK_SUCCESS,
  DELETE_ARTWORK_ERROR,
} from 'app/constants/actionTypes';

const initialState = {
  items: [],
  totalItems: 0,
  isLoading: false,
  error: null,
};

export default function artworksList(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ARTWORKS:
    case DELETE_ARTWORK_REQUEST:
      return { ...state, isLoading: true, error: null };

    case RECEIVE_ARTWORKS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.list,
        totalItems: action.payload.totalItems,
      };

    case DELETE_ARTWORK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: state.items.filter((a) => a.id !== action.payload),
        totalItems: state.totalItems - 1,
      };

    case ERROR_ARTWORKS:
    case DELETE_ARTWORK_ERROR:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
}
