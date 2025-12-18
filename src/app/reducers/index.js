import { combineReducers } from 'redux';

import user from './user';
import artworks from './artworks';
import artists from './artists';

export default combineReducers({
  user,
  artworks,
  artists
});
