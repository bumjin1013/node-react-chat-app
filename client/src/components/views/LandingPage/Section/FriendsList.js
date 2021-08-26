import React from 'react'
import { Avatar, Button } from 'antd';
import { withRouter } from "react-router-dom";

function FriendsList(props) {

    const deleteButton = () => {

    }

    const ChatButton = () => {
        props.history.push({
            pathname: "/chat",
            state: { detail: props.data._id }
        })
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
