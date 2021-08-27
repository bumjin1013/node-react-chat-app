import React from 'react';
import { Avatar } from 'antd';
import { withRouter } from "react-router-dom";
import moment from 'moment';
import { Typography } from 'antd';

const { Text } = Typography;

function ChatList(props) {
    
    console.log(props.chatData.chat[props.chatData.chat.lastIndex].message);
    const enterChatRoom = () => {
        props.history.push({
            pathname: "/chat",
            state: {chatData: props.chatData, userData: props.userData.userData }
        })

        props.socket.emit('join', props.chatData.socket);
    }
    let time = props.chatData.chat[props.chatData.chat.lastIndex].time;
    let message = props.chatData.chat[props.chatData.chat.lastIndex].message

    return (
        <div onClick={enterChatRoom} style={{paddingBottom: '10px', paddingTop: '10px'}}>
            <div style={{width:'45px', float:'left'}}>
                <Avatar size="large" icon="user" />
            </div>

            <div>
                <Text strong={true} style={{fontSize: '15px'}}>{props.chatData.receiverName}</Text>
                <div style={{float:'right'}}>
                {moment(time).format('M월D일 HH시mm분')} 
                </div>
                <br/>
                {message}
            </div>
        </div>
    )
}

export default withRouter(ChatList)
