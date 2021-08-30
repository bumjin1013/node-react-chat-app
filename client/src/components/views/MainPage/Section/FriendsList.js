import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, Empty } from 'antd';
import { withRouter } from "react-router-dom";
import { makeChatRoom } from '../../../../_actions/chat_actions';
import { deleteFriends, getFriends } from '../../../../_actions/friends_actions';


function FriendsList(props) {

    const dispatch = useDispatch();
    const chat = useSelector(state => state.chat);
    const deleteButton = () => {

        dispatch(deleteFriends(props.data.id));
        
        //삭제되고 DB에 Update 된 후의 친구정보를 가져오기 위해 setTimeout 으로 0.05초 delay
        setTimeout( () => {
            dispatch(getFriends());
        },50)
    }
    const ChatButton = () => {
        
        if(chat.chatData && chat.chatData.chatList){
            
            //친구목록에서 대화하기를 누른 친구와의 대화 목록을 검색 - chat State(채팅내역) 에서 recieverId 가 선택한 친구의 id인지 검색
            let chatData = Object.values(chat.chatData.chatList).filter(element => element.receiverId === props.data.id)
            
            // 채팅창이 이미 존재하면
            if(chatData.length > 0){
                
                //존재하는 채팅창으로 감
                props.history.push({
                    pathname: "/chat",
                    state: {chatData: chatData[0], userData: props.userData }
                })
                //채팅창이 존재하지 않으면
                } else {
                    //대화 누르면 서버에 userId, friendsId, room number, name 를 보내서 채팅방 생성
                    props.socket.emit("joinRoom", {
                        userId: props.userData._id,
                        userName: props.userData.name,
                        friendsId: props.data.id,
                        room: props.socket.id,
                        friendsName: props.data.name
                    });

                    //ChatList state update를 위한 data 변수 선언
                    let data = {
                        chat: [],
                        socketId: props.socket.id,
                        receiverId: props.data.id,
                        receiverName: props.data.name
                    }

                dispatch(makeChatRoom(data))
                
                //data 변수 안에 있는 데이터로 채팅방 접속
                props.history.push({
                    pathname: "/chat",
                    state: {chatData: data, userData: props.userData }
                })
            }
        }
    }

    return (
        <div style={{clear: 'both', width: '100%', paddingTop:'10px', paddingBottom:'20px'}}> 
            <div style={{width: '45px', float:'left'}}>
                <Avatar size="large" icon="user" />
            </div>
            
            <span style={{position: 'relative', top:'5px'}}>{props.data.name}</span>
                
           
            <div style={{float:'right'}}> 
                <Button icon="delete"  onClick={deleteButton}/>
                <Button icon="message"  onClick={ChatButton}/>
            </div>
        </div>

    )
}

export default withRouter(FriendsList)
