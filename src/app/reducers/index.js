import { combineReducers } from 'redux';

import user from './user';
import artworks from './artworks';

export default combineReducers({
  user,
  artworks
});
