import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button } from 'antd';
import { getFriends } from '../../../../_actions/user_actions';

function FriendsList(props) {
    
    const dispatch = useDispatch();
    const [Data, setData] = useState();
    
    useEffect(() => {
        dispatch(getFriends())    
    }, [])
    

    return(
        <div>
            <Avatar size="large" icon="user" />
            &nbsp;&nbsp;&nbsp;{}
            <Button icon="message" style={{float: 'right'}} />
        </div>
    )
}

export default FriendsList
