import moment from 'moment'
import React from 'react'
import { Typography, Avatar, Tooltip } from 'antd';
const { Text } = Typography;

function ChatCard(props) {

    
    if(props.senderId == props.userId){

        

        return (
            <div style={{clear: 'both', width: '100%', paddingTop:'10px', paddingBottom:'10px'}}>
                <div style={{width:'45px', float:'right', paddingLeft:'5px'}}>
                    <Avatar size="large" icon="user" />
                </div>
                
                <div style={{float: 'right'}}>
                    {props.read ? <span>읽음</span> : null }
                    
                    <span style={{fontSize:'12px', paddingRight: '7px'}}>{moment(props.time).fromNow()} </span>
                    {props.senderName}
                    
                    <br/>
                    <div style={{float:'right'}}>
                        {props.message.substring(0, 8) === "uploads/" ?
                        // this will be either video or image 

                        props.message.substring(props.message.length - 3, props.message.length) === 'mp4' ?
                            <video
                                style={{ maxWidth: '200px' }}
                                src={`http://localhost:5000/${props.message}`} alt="video"
                                type="video/mp4" controls
                            />
                            :
                            <img
                                style={{ maxWidth: '200px' }}
                                src={`http://localhost:5000/${props.message}`}
                                alt="img"
                            />
                        :
                        <p>
                            {props.message}
                        </p>}
                    </div>
                    
                </div>          
            </div>
            
        )
    } else {
        return (
            <div style={{clear: 'both', width: '100%', paddingTop:'10px', paddingBottom:'10px'}}>
                <div style={{width:'45px', float:'left'}}>
                    <Avatar size="large" icon="user"  />
                </div>

                <div>
                    {props.senderName}
                    <span style={{fontSize:'12px', paddingLeft: '7px'}}>{moment(props.time).fromNow()} </span>
                    <br/>
                    <div >
                        {props.message.substring(0, 8) === "uploads/" ?
                        // this will be either video or image 

                        props.message.substring(props.message.length - 3, props.message.length) === 'mp4' ?
                            <video
                                style={{ maxWidth: '200px' }}
                                src={`http://localhost:5000/${props.message}`} alt="video"
                                type="video/mp4" controls
                            />
                            :
                            <img
                                style={{ maxWidth: '200px' }}
                                src={`http://localhost:5000/${props.message}`}
                                alt="img"
                            />
                        :
                        <p>
                            {props.message}
                        </p>}
                    </div>
                </div>          
            </div>
        )
    }
}

export default ChatCard