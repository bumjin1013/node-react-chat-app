import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button } from 'antd';
import { withRouter } from "react-router-dom";
import { makeChatRoom } from '../../../../_actions/chat_actions';


function FriendsList(props) {

    const dispatch = useDispatch();
    const chat = useSelector(state => state.chat);
    const deleteButton = () => {

    }
    const ChatButton = () => {
        
        if(chat.chatData && chat.chatData.chatList){
            
            //친구목록에서 대화하기를 누른 친구와의 대화 목록을 검색 - chat State(채팅내역) 에서 recieverId 가 선택한 친구의 id인지 검색
            let chatData = Object.values(chat.chatData.chatList).filter(element => element.receiverId === props.data.id)
            
            if(chatData.length > 0){
                console.log('c채팅방 잇ㅎ음')
            //존재하는 채팅창으로 감
            props.history.push({
                pathname: "/chat",
                state: {chatData: chatData[0], userData: props.userData }
            })
            } else {
                console.log('c채팅방 없음')
                console.log(props.chatData);
                //대화 누르면 서버에 userId, friendsId, room number, name 를 보내서 채팅방 생성
                props.socket.emit("joinRoom", {
                    userId: props.userData._id,
                    userName: props.userData.name,
                    friendsId: props.data.id,
                    room: props.socket.id,
                    friendsName: props.data.name
                });

                
                let data = {
                    chat: [],
                    socketId: props.socket.id,
                    receiverId: props.data.id,
                    receiverName: props.data.name
                }

                console.log(data);
                dispatch(makeChatRoom(data))
                
                
        
                props.history.push({
                    pathname: "/chat",
                    state: {chatData: data, userData: props.userData }
                })
            }
        }
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
