import { REQUEST_ARTISTS, RECEIVE_ARTISTS, ERROR_ARTISTS } from '../constants/actionTypes';

const initialState = {
  items: [],
  isFetching: false,
  errors: [],
};

export default function artists(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ARTISTS:
      return { ...state, isFetching: true, errors: [] };
    case RECEIVE_ARTISTS:
      return { ...state, isFetching: false, items: action.payload };
    case ERROR_ARTISTS:
      return { ...state, isFetching: false, errors: action.payload };
    default:
      return state;
  }
}
