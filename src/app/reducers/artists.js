import {
  REQUEST_ARTISTS,
  RECEIVE_ARTISTS,
  ERROR_ARTISTS,
  CREATE_ARTIST_REQUEST,
  CREATE_ARTIST_SUCCESS,
  CREATE_ARTIST_ERROR,
} from '../constants/actionTypes';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export default function artists(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ARTISTS:
    case CREATE_ARTIST_REQUEST:
      return { ...state, isLoading: true, error: null };

    case RECEIVE_ARTISTS:
      return { ...state, isLoading: false, items: action.payload };

    case CREATE_ARTIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: [...state.items, action.payload],
      };

    case ERROR_ARTISTS:
    case CREATE_ARTIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
