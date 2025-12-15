import {
  REQUEST_ARTWORKS,
  RECEIVE_ARTWORKS,
  ERROR_ARTWORKS,
  DELETE_ARTWORK, 
} from '../constants/actionTypes';

const initialState = {
  items: [],
  page: 1,
  size: 10,
  totalPages: 0,
  totalItems: 0,
  isFetching: false, // <- тут лоадінг
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
        totalPages: action.payload.totalPages,
        totalItems: action.payload.totalItems,
      };

    case DELETE_ARTWORK:
      return {
        ...state,
        items: state.items.filter(a => a.id !== action.payload),
        totalItems: state.totalItems - 1,
      };

    case ERROR_ARTWORKS:
      return { ...state, isFetching: false, errors: action.payload };

    default:
      return state;
  }
}

