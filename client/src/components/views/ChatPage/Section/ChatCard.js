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
                    <span style={{float:'right'}}>{props.message}</span>
                    
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
                    {props.message}
                </div>          
            </div>
        )
    }
}

export default ChatCard