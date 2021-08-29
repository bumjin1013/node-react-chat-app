import React from 'react'
import { Avatar, Button } from 'antd';
import { withRouter } from "react-router-dom";


function FriendsList(props) {

    
    const deleteButton = () => {

    }

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
        <div style={{clear: 'both', width: '100%', paddingTop:'10px', paddingBottom:'20px'}}> 
            <div style={{width: '40px', float:'left'}}>
                <Avatar size="large" icon="user" />
            </div>
            
            <span style={{textAlign: 'center'}}>{props.data.name}</span>
                
           
            <div style={{float:'right'}}> 
                    <Button icon="delete"  onClick={deleteButton}/>
                    <Button icon="message"  onClick={ChatButton}/>
                </div>
        </div>

    )
}

export default withRouter(FriendsList)
