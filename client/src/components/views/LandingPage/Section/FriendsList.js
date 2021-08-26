import React from 'react'
import { Avatar, Button } from 'antd';
import { withRouter } from "react-router-dom";
import { io } from 'socket.io-client';

function FriendsList(props) {

    const socket = io("http://localhost:5000"); //connet client-to-server
    const deleteButton = () => {

    }

    console.log(props.data);

    const ChatButton = () => {
        props.history.push({
            pathname: "/chat",
            state: socket.id
        })
        
       //대화 누르면 서버에 userId, friendsId, room number 를 보냄.
        socket.emit("joinRoom", {
            userId: props.userId,
            friendsId: props.data.id,
            room: socket.id
        });
    

    }

    return (
        <div>
            <Avatar size="large" icon="user" />
            {props.data.name}
            <Button icon="delete" style={{float: 'right'}} onClick={deleteButton}/>
            <Button icon="message" style={{float: 'right'}} onClick={ChatButton}/>
            <br />
            <br />
        </div>
    )
}

export default withRouter(FriendsList)
