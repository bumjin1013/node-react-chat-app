import {
    GET_CHAT_LIST,
    AFTER_POST_MESSAGE
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case GET_CHAT_LIST:
            return {...state, chatData: action.payload }
        case AFTER_POST_MESSAGE:
            return {...state, chatData: state.chats.concat(action.payload) }
        default:
            return state;
    }
}

