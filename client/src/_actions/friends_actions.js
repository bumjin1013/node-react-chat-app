import axios from 'axios';
import {
    ADD_FRIENDS,
    DELETE_FRIENDS,
    GET_FRIENDS
} from './types';

import { USER_SERVER } from '../components/Config.js';

export function getFriends(){
    
    const request = axios.get(`${USER_SERVER}/getfriends`)
        .then(response => response.data)

    return {
        type: GET_FRIENDS,
        payload: request
    }
}

export function addFriends(body){
    
    const request = axios.post(`${USER_SERVER}/addfriends`, body)
        .then(response => response.data)

    return {
        type: ADD_FRIENDS,
        payload: request
    }
}

export function deleteFriends(body){
    
    const request = axios.post(`${USER_SERVER}/deletefriends`, body)
        .then(response => response.data)

    return {
        type: DELETE_FRIENDS,
        payload: request
    }
}

