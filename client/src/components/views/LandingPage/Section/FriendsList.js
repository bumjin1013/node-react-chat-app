import React from 'react'
import { Avatar, Button } from 'antd';
import { withRouter } from "react-router-dom";


function FriendsList(props) {

    
    const deleteButton = () => {

    }

    console.log(props.data);

    const ChatButton = () => {
        props.history.push({
            pathname: "/chat",
            state: props.socket.id
        })
        
       //대화 누르면 서버에 userId, friendsId, room number, name 를 보냄.
        props.socket.emit("joinRoom", {
            userId: props.userData._id,
            userName: props.userData.name,
            friendsId: props.data.id,
            room: props.socket.id,
            friendsName: props.data.name
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
