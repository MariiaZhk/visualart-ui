import {
  REQUEST_ARTWORK_BY_ID,
  RECEIVE_ARTWORK_BY_ID,
  ERROR_ARTWORK_BY_ID,
  REQUEST_SAVE_ARTWORK,
  RECEIVE_SAVE_ARTWORK,
  ERROR_SAVE_ARTWORK,
  CLEAR_ARTWORK_DETAILS,
} from 'app/constants/actionTypes';

const initialState = {
  entity: null,
  isLoading: false,
  error: null,
};

export default function artworkDetails(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ARTWORK_BY_ID:
    case REQUEST_SAVE_ARTWORK:
      return { ...state, isLoading: true, error: null };

    case RECEIVE_ARTWORK_BY_ID:
    case RECEIVE_SAVE_ARTWORK:
      return { ...state, isLoading: false, entity: action.payload };

    case ERROR_ARTWORK_BY_ID:
    case ERROR_SAVE_ARTWORK:
      return { ...state, isLoading: false, error: action.payload };

    case CLEAR_ARTWORK_DETAILS:
      return initialState;

    default:
      return state;
  }
}
