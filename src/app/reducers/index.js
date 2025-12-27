import { combineReducers } from 'redux';

import user from './user';
import artworksList from './artworksList';
import artworkDetails from './artworkDetails';
import artists from './artists';

export default combineReducers({
  user,
  artworksList,
  artworkDetails,
  artists,
});
