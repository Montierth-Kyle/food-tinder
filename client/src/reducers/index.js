import { combineReducers } from 'redux';
import user from './user';
import dietPreference from './dietPreference'

const rootReducer = combineReducers({
  user,
  dietPreference,
});

export default rootReducer;