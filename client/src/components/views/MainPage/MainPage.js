import SearchFriends from './Section/SearchFriends';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../../../_actions/friends_actions';
import { getChatList } from '../../../_actions/chat_actions';
import FriendsList from './Section/FriendsList';
import { Tabs, Icon, Badge, Empty, Avatar, Divider } from 'antd';
import ChatList from './Section/ChatList';
import { io } from 'socket.io-client';
import axios from 'axios';

const { TabPane } = Tabs;


function LandingPage(props) {

    
    const callback = (key) => {
    }

    const dispatch = useDispatch();
    const socket = io("http://localhost:5000"); //connet client-to-server
    const friends = useSelector(state => state.friends); //친구목록 state
    const user = useSelector(state => state.user); //user정보 state
    const chat = useSelector(state => state.chat); //채팅내역 state

    //읽지 않은 총 메시지 개수를 위한 변수 선언
    let newChat = 0;

    useEffect(() => {
        //친구목록, 채팅내역 불러옴
        dispatch(getFriends());
        dispatch(getChatList());

        //채팅방에 있지 않아도 새로운 채팅이 오면 채팅방 내역에 새로운 채팅내역 추가
        socket.on("Output Chat Message", messageFromBackEnd => {
            dispatch(getChatList()); 
        })
    }, [])

    //로그인 유저 렌더링
    const renderUser = () => {

        if(user.userData){
            return (
                <div style={{clear: 'both', width: '100%'}}> 
                    <div style={{width: '45px', float:'left'}}>
                    <Avatar size="large" icon="user" />
                    </div>
                    <span style={{position: 'relative', top:'5px'}}>{user.userData.name}</span>
                    <Divider />
                </div>
                
            )
        }
    }
  
    //친구목록 랜더링
    const renderFriends = friends.friendsData && friends.friendsData.friendsList.map((friends, index) => {
        
       return (
        <FriendsList data={friends} userData={user.userData} socket={socket} key={index}/>
       )
    })

    //채팅목록 랜더링
    const renderChatList = chat.chatData && chat.chatData.chatList.map((chats, index) => {

        //read: false 인 메시지의 개수를 셈
        chats.chat.map((chatlist, index) => {
            if(chatlist.read == false){
                newChat = newChat + 1;
            }
        })
        
        return(
            <ChatList chatData={chats} userData={user} socket={socket} key={index}/>
        )
    })

    //로그아웃
    const logoutHandler = () => {
        axios.get('/api/users/logout').then(response => {
          if (response.status === 200) {
            props.history.push("/login");
          } else {
            alert('Log Out Failed')
          }
        });
      };


    return (
        <div style={{ margin: '20px', marginTop:'0'}}>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab={<Icon type='user' style={{ fontSize: '20px'}}/>} key="1">
                    { renderUser() }
                    <span>친구 {friends.friendsData && Object.keys(friends.friendsData.friendsList).length}</span>
                    { friends.friendsData && Object.keys(friends.friendsData.friendsList).length > 0 ? renderFriends : <Empty description={'No Friends'}/>}
                </TabPane>

                <TabPane tab={<Badge count={newChat} ><Icon type='message' style={{ fontSize: '20px'}}/></Badge>} key="2">
                    { chat.chatData && Object.keys(chat.chatData.chatList).length > 0 ? renderChatList : <Empty description={'No Chat'}/> }
                </TabPane>
                
                <TabPane tab={<Icon type='search' style={{ fontSize: '20px'}}/>} key="3">
                    <SearchFriends userData={user.userData} friendsData={friends.friendsData}/>
                </TabPane>

                <TabPane tab={<Icon type='ellipsis' style={{ fontSize: '20px'}}/>} key="4">
                    <div onClick={logoutHandler}>
                        <Icon type="export" /> 로그아웃
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default LandingPage
