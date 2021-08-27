import moment from 'moment'
import React from 'react'
import { Comment, Avatar, Tooltip } from 'antd';

function ChatCard(props) {

        return (
            <div style={{width: '50%'}}>
                <Comment
                    author={props.senderName}
                    avatar={
                        <Avatar
                            alt={props.senderName}
                    />
                    }
                content={
                    props.message.substring(0, 8) === "uploads/" ?
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
                        {props.message} 오른쪽
                    </p>
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                    </Tooltip>
                }    
                />        
            </div>
        )
}

export default ChatCard