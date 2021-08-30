import axios from 'axios';
import {
    GET_CHAT_LIST,
    AFTER_POST_MESSAGE,
    GET_CHATS,
    READ_MESSAGE,
    MAKE_CHAT_ROOM
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function getChatList(){
    const request = axios.get(`${USER_SERVER}/getchatlist`)
        .then(response => response.data);
    
    return {
        type: GET_CHAT_LIST,
        payload: request
    }
}

export function getChats(socketId){

    const request = axios.get(`${USER_SERVER}/getchats?socketId=${socketId}`)
        .then(response => response.data);
    
    return {
        type: GET_CHATS,
        payload: request
    }
}

export function afterPostMessage(data){
    return {
        type: AFTER_POST_MESSAGE,
        payload: data
        
    }
}

export function makeChatRoom(data){
    return {
        type: MAKE_CHAT_ROOM,
        payload: data
    }
}

export function readMessage(receiverId){

    let body = {
        receiverId: receiverId
    }
    const request = axios.post(`${USER_SERVER}/readmessage`, body)
        .then(response => response.data);

    return {
        type: READ_MESSAGE,
        payload: request
    }
}
