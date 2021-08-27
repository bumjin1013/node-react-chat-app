import {
    GET_CHAT_LIST,
    AFTER_POST_MESSAGE,
    GET_CHATS
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case GET_CHATS:
            return {...state, currentChat: action.payload}
        case GET_CHAT_LIST:
            return {...state, chatData: action.payload }
        case AFTER_POST_MESSAGE:
            return {...state, currentChat: { chat: state.currentChat.chat.concat(action.payload)}}
        default:
            return state;
    }
}

