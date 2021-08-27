import {
    ADD_FRIENDS,
    DELETE_FRIENDS,
    GET_FRIENDS
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case GET_FRIENDS:
            return {...state, friendsData: action.payload}
        case ADD_FRIENDS:
            return {...state, friendsData: {friendsList: state.friendsData.friendsList.concat(action.payload.friends)}}
        case DELETE_FRIENDS:
            return {...state, friendsData: action.payload}
        default:
            return state;
    }
}