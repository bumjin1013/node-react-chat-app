import { combineReducers } from 'redux';
import user from './user_reducer';
import friends from './friends_reducer';
import chat from './chat_reducer'

const rootReducer = combineReducers({
    user, friends, chat
});

export default rootReducer;