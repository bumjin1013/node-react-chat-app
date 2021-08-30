import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { io } from 'socket.io-client';
import ChatCard from './Section/ChatCard';
import moment from 'moment';
import { afterPostMessage, getChatList, getChats, readMessage } from '../../../_actions/chat_actions';

function ChatPage(props) {

    const dispatch = useDispatch();
    const socket = io("http://localhost:5000"); //connet client-to-server
    const chat = useSelector(state => state.chat.currentChat);
    const user = useSelector(state => state.user.userData);
    const [ChatMessage, setChatMessage] = useState("")
    const messagesEnd = useRef(null);
    const handleSearchCHange = (event) => {
        setChatMessage(event.target.value);
    }

    const renderCards = () => 
        chat.chat && chat.chat.map((chats, index) => (
            <ChatCard key={index} userId={user._id} {...chats} />
    ));
    

    useEffect(() => {
        
        console.log('state', props.location.state)
        dispatch(getChats(props.location.state.chatData.socketId))
   
        socket.on("Output Chat Message", messageFromBackEnd => {
            
            //채팅 페이지에 있으면 메시지를 받을경우 읽음처리 
            if(window.location.href == 'http://localhost:3000/chat'){
                console.log('상대방이 채팅 페이지에 있음')
                dispatch(readMessage(props.location.state.chatData.receiverId))
    
            } 
            dispatch(afterPostMessage(messageFromBackEnd));
            dispatch(getChatList());
        })
    }, [])

    useEffect(() => {

        messagesEnd.current.scrollIntoView({behavior: 'smooth'});
  
      }, [renderCards])



    const submitChatMessage = (event) => {

        
        event.preventDefault();

        let chatMessage = ChatMessage;
        let userId = props.location.state.userData._id;
        let userName = props.location.state.userData.name;
        let receiverId = props.location.state.chatData.receiverId
        let socketId = props.location.state.chatData.socketId;
        let nowTime = Date();
        let type = "Text";
        

        socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userName,
            nowTime,
            type,
            socketId,
            receiverId
        
        });
        setChatMessage("");
    }

    return (
        <div>

        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>


        <div className="infinite-container" style={{ height: '600px', overflowY:' scroll' }}>
                {chat && (
                    <div>{renderCards()}</div>
                )} 
            <div
                ref={messagesEnd}
                style={{ float: "left", clear: "both" }}
                
            />
            </div>

            <Row >
                <Form layout="inline" >
                    <Col span={18}>
                         <Input
                            id="message"
                            prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="text"
                            value={ChatMessage}
                            onChange={handleSearchCHange}

                        />
                    </Col>
                    <Col span={2}>
                        
                    </Col>

                    <Col span={4}>
                        <Button type="primary" style={{ width: '100%' }} onClick={submitChatMessage} htmlType="submit">
                            <Icon type="enter" />
                        </Button>
                    </Col>
                </Form>
             </Row>
         </div>
         </div>
    )
}

export default ChatPage
