import SearchFriends from './Section/SearchFriends';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../../../_actions/friends_actions';
import { getChatList } from '../../../_actions/chat_actions';
import FriendsList from './Section/FriendsList';
import { Tabs, Icon } from 'antd';
import ChatList from './Section/ChatList';
import { io } from 'socket.io-client';

const { TabPane } = Tabs;


function LandingPage(props) {

    const callback = (key) => {
    }
    const dispatch = useDispatch();
    const socket = io("http://localhost:5000"); //connet client-to-server
    const friends = useSelector(state => state.friends);
    const user = useSelector(state => state.user);
    const chat = useSelector(state => state.chat);

    useEffect(() => {
        dispatch(getFriends())
        dispatch(getChatList())
    }, [])

    //친구목록 랜더링
    const renderFriends = friends.friendsData && friends.friendsData.friendsList.map((friends, index) => {

        return(
            <FriendsList data={friends} userData={user.userData} socket={socket} key={index}/>
        )
    })

    //채팅목록 랜더링
    const renderChatList = chat.chatData && chat.chatData.chatList.map((chats, index) => {

        return(
            <ChatList data={chats} key={index}/>
        )
    })

    return (
        <div style={{ margin: '20px'}}>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab={<Icon type='user' style={{ fontSize: '20px'}}/>} key="1">
                    <SearchFriends />
                        <br />
                    { renderFriends }
                </TabPane>
                <TabPane tab={<Icon type='message' style={{ fontSize: '20px'}}/>} key="2">
                    { renderChatList }
                </TabPane>
   
            </Tabs>
        </div>
    )
}

export default LandingPage
