import { combineReducers } from 'redux';
import user from './user_reducer';
import friends from './friends_reducer';

const rootReducer = combineReducers({
    user, friends
});

export default rootReducer;