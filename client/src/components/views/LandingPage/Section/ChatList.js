import React, { useEffect } from 'react';
import { Avatar } from 'antd';
import { withRouter } from "react-router-dom";

function ChatList(props) {
    
    const enterChatRoom = () => {
        props.history.push({
            pathname: "/chat"
        })
    }

    return (
        <div onClick={enterChatRoom}>
            <Avatar size="large" icon="user" />
            {props.data.receiverName} <p></p>
            내용
       
            <br />
            <br />
        </div>
    )
}

export default withRouter(ChatList)
