import FriendsList from './Section/FriendsList';
import SearchFriends from './Section/SearchFriends';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../../../_actions/user_actions';
function LandingPage(props) {

    console.log(props.user.userData);
    return (
        <div style={{ margin: '50px'}}>

            <SearchFriends />
            <FriendsList />
        </div>
    )
}

export default LandingPage
