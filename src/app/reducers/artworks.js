import {
  REQUEST_ARTWORKS,
  RECEIVE_ARTWORKS,
  ERROR_ARTWORKS,
  DELETE_ARTWORK,
  REQUEST_ARTWORK,
  RECEIVE_ARTWORK,
  ERROR_ARTWORK,
} from '../constants/actionTypes';

const initialState = {
  items: [],
  artwork: null,
  page: 1,
  size: 8,
  totalPages: 0,
  totalItems: 0,
  isFetching: false,
  errors: [],
};

export default function artworks(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ARTWORKS:
      return { ...state, isFetching: true, errors: [] };

    case RECEIVE_ARTWORKS:
      return {
        ...state,
        isFetching: false,
        items: action.payload.list,
        page: action.payload.page,
        size: action.payload.size,
        totalPages: action.payload.totalPages,
        totalItems: action.payload.totalItems,
      };

    case REQUEST_ARTWORK:
      return { ...state, isFetching: true, errors: [] };

    case RECEIVE_ARTWORK:
      return { ...state, isFetching: false, artwork: action.payload };

    case ERROR_ARTWORK:
      return { ...state, isFetching: false, errors: action.payload };

    case DELETE_ARTWORK:
      return {
        ...state,
        items: state.items.filter((a) => a.id !== action.payload),
        totalItems: state.totalItems - 1,
      };

    case ERROR_ARTWORKS:
      return { ...state, isFetching: false, errors: action.payload };

    default:
      return state;
  }
}
