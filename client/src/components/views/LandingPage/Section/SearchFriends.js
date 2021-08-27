import React, { useState }  from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Input, Modal, Button, Avatar } from 'antd';
import { addFriends } from '../../../../_actions/friends_actions';
const { Search } = Input;
function SearchFriends(props) {

    const dispatch = useDispatch();
    const [FriendsName, setFriendsName] = useState("");
    const [IsVisible, setIsVisible] = useState(false);
    const [SearchList, setSearchList] = useState();

    const handleSearchChange = (event) => {
        setFriendsName(event.target.value)
        
    }

    const handleOk = () => {

    }

    const handleCancel = () => {
        setIsVisible(false);
    }

    const searchFriend = (event) => {
        
        setIsVisible(true);

        let body = {
            friendsName: FriendsName
        }

        axios.post('/api/users/search', body)
            .then(response => {
                if(response.data.success){
                    setSearchList(response.data.search)
                } else {
                    alert('검색에 실패하였습니다.');
                }
            })    
    }

    const renderSearchList = SearchList && SearchList.map((list, index) => {

        const addFriendsButton = () => {
            
            //본인 아이디 검색 후 추가 버튼 클릭시 알림
            if(list._id == props.userData._id){
                alert('본인은 추가할 수 없습니다.');
            } else {
                let body = {
                    name: list.name,
                    _id: list._id
                }
            
                dispatch(addFriends(body));
            }
            
        }

        if(list.length != null){
             return (
                "검색하신 아이디가 존재하지 않습니다."
            )
        } else {
            return (
                <div key={index}>
                    <Avatar size="large" icon="user" />
                    &nbsp;&nbsp;&nbsp;{list.name}
                    <Button icon="plus" style={{float: 'right'}} onClick={addFriendsButton}/>
                </div>
                
            )
        }    
    })


    return (
        <div>
            <Search placeholder="검색할 아이디를 입력하세요" onChange={handleSearchChange} onSearch={searchFriend} enterButton />

            <Modal
                title="Basic Modal"
                visible={IsVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                { renderSearchList }

          
            </Modal>
        </div>
    )
}

export default SearchFriends
