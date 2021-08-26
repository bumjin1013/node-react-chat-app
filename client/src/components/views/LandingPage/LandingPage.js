import SearchFriends from './Section/SearchFriends';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, deleteFriends } from '../../../_actions/friends_actions';
import FriendsList from './Section/FriendsList';
function LandingPage(props) {

    const dispatch = useDispatch();
    const friends = useSelector(state => state.friends)
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getFriends())
    }, [])

    console.log(friends.friends);
    const renderFriends = friends.friendsData && friends.friendsData.friendsList.map((friends, index) => {

        return(
            <FriendsList data={friends} userId={user.userData._id} key={index}/>
        )
    })

    return (
        <div style={{ margin: '20px'}}>
            <SearchFriends />
            <br />
            { renderFriends }
          
        </div>
    )
}

export default LandingPage
