import React from 'react';
import { Avatar } from 'antd';
import { withRouter } from 'react-router-dom';
import { useDispatch } from "react-redux";
import moment from 'moment'; 
import { Typography, Badge, Button } from 'antd';
import { readMessage, outChatRoom, getChatList } from '../../../../_actions/chat_actions';

const { Text } = Typography;

function ChatList(props) {
    
    //채팅방 마지막 시간, 메시지 변수
    let time;
    let message;
    //읽지 않은 메시지 확인 
    let newChat = 0;

    const dispatch = useDispatch();

    //기존에 존재하는 채팅방 입장
    const enterChatRoom = () => {
        
        //메시지 읽음 표시를 위해 dispatch 클릭한 채팅방의 상대방 정보를 전달
        dispatch(readMessage(props.chatData.receiverId));

        props.history.push({
            pathname: "/chat",
            state: {chatData: props.chatData, userData: props.userData.userData }
        })

        props.socket.emit('join', props.chatData.socket);
    }

    //채팅방 삭제
    const outRoom = () => {

        dispatch(outChatRoom(props.chatData.receiverId))

        //DB에서 삭제 된 후의 데이터를 불러오기위해 setTimeout을 이용해 동기 처리
        setTimeout(() => {
            dispatch(getChatList())
        }, 50);
        
    }
    
    //props로 받은 채팅방에서 채팅 내역이 없을 경우 (채팅방만 만들어졌을 경우)
    if(props.chatData.chat.length > 0){
        time = props.chatData.chat[props.chatData.chat.lastIndex].time;
        message = props.chatData.chat[props.chatData.chat.lastIndex].message
    } else { //채팅방은 존재하지만 (친구목록에서 대화하기만 누른 경우) 채팅내역이 존재하지 않을 경우
        time = null;
        message = null;
    }
    
    //채팅 내역에서 읽지 않은 메시지의 갯수
    props.chatData && props.chatData.chat.map((chat, index) => {
            
        //채팅 내역 중 상대방이 보낸 채팅이고 read = flase 일 때 newChat에 + 1 (읽지 않은 메시지)
        if((chat.senderId != props.userData.userData._id) && !chat.read) {
            newChat += 1;
        }
    })
    

    return (
        <div  style={{paddingBottom: '10px', paddingTop: '10px'}}>
            <div onClick={enterChatRoom} style={{width:'45px', float:'left'}}>
                <Avatar size="large" icon="user" />
            </div>

            <div>
                <Text strong={true} style={{fontSize: '15px'}}>{props.chatData.receiverName}</Text>
                
                <div style={{float:'right'}} onClick={enterChatRoom}>
                    {props.chatData.chat.length > 0 ? moment(time).format('M월D일 HH시mm분') : null} 
                </div>
                <br/>
                <span onClick={enterChatRoom}> {message} <Badge count={newChat} /></span>
                <Button icon="export" style={{float: 'right', fontSize: '20px'}} onClick={outRoom}/>
                
                

            </div>
        </div>
    )
}

export default withRouter(ChatList)
