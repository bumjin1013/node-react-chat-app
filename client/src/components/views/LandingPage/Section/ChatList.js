import React, { useEffect } from 'react';
import { Avatar } from 'antd';
import { withRouter } from "react-router-dom";

function ChatList(props) {
    
    console.log(props.userData);
    const enterChatRoom = () => {
        props.history.push({
            pathname: "/chat",
            state: {chatData: props.chatData, userData: props.userData.userData }
        })

        props.socket.emit('join', props.chatData.socket);
    }

    return (
        <div onClick={enterChatRoom}>
            <Avatar size="large" icon="user" />
            {props.chatData.receiverName} <p></p>
            내용
       
            <br />
            <br />
        </div>
    )
}

export default withRouter(ChatList)
