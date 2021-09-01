import React from 'react';
import { Avatar } from 'antd';
import { withRouter } from 'react-router-dom';
import { useDispatch } from "react-redux";
import moment from 'moment'; 
import { Typography, Badge } from 'antd';
import { readMessage } from '../../../../_actions/chat_actions';

const { Text } = Typography;

function ChatList(props) {
    
    //채팅방 마지막 시간, 메시지 변수
    let time;
    let message;
    //읽지 않은 메시지 확인 
    let newChat = 0;

    const dispatch = useDispatch();

    const enterChatRoom = () => {
        
        //메시지 읽음 표시를 위해 dispatch 클릭한 채팅방의 상대방 정보를 전달
        dispatch(readMessage(props.chatData.receiverId));

        props.history.push({
            pathname: "/chat",
            state: {chatData: props.chatData, userData: props.userData.userData }
        })

        props.socket.emit('join', props.chatData.socket);
    }
    
    
    //props로 받은 채팅방에서 채팅 내역이 없을 경우 (채팅방만 만들어졌을 경우)
    if(props.chatData.chat.length > 0){
        time = props.chatData.chat[props.chatData.chat.lastIndex].time;
        message = props.chatData.chat[props.chatData.chat.lastIndex].message
    } else {
        time = null;
        message = null;
    }
    
    
    

    props.chatData && props.chatData.chat.map((chat, index) => {
            
        //채팅 내역 중 상대방이 보낸 채팅이고 read = flase 일 때 newChat에 + 1 (읽지 않은 메시지)
        if((chat.senderId != props.userData.userData._id) && !chat.read) {
            newChat += 1;
        }
    })
    

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
                
                <Badge count={newChat} />

            </div>
        </div>
    )
}

export default withRouter(ChatList)
