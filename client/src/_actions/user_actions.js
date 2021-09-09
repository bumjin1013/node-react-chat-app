import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_FRIENDS,
    DELETE_FRIENDS,
    GET_FRIENDS,
    CHANGE_USER_INFO
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function getFriends(body){
    
    const request = axios.get('/api/users/getfriends')
        .then(response => response.data)

    return {
        type: GET_FRIENDS,
        payload: request
    }
}

export function addFriends(body){
    
    const request = axios.post('/api/users/addfriends', body)
        .then(response => response.data)

    return {
        type: ADD_FRIENDS,
        payload: request
    }
}

export function deleteFriends(body){
    
    const request = axios.post('/api/users/deletefriends', body)
        .then(response => response.data)

    return {
        type: DELETE_FRIENDS,
        payload: request
    }
}

export function changeUserInfo(name){

    let body = { name }
    const request = axios.post('/api/users/changeinfo', body)
    .then(response => response.data)

    return {
        type: CHANGE_USER_INFO,
        payload: request
    }
}

