import React, { useState }  from 'react'
import axios from 'axios';
import { Input, Modal, Button, Avatar } from 'antd';

const { Search } = Input;
function SearchFriends() {

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

        const addFriends = () => {
    
            let body = {
                name: list.name,
                email: list.email
            }

            console.log(body);
    
            axios.post('/api/users/addfriends', body)
                .then(response => {
                    if(response.data.success){
                        alert('친구 추가 성공');
                    } else {
                        alert('검색에 실패하였습니다.');
                    }
                })    
        }

        if(list.length != null){
             return (
                "검색하신 아이디가 존재하지 않습니다."
            )
        } else {
            return (
                <div>
                    <Avatar size="large" icon="user" />
                    &nbsp;&nbsp;&nbsp;{list.name}
                    <Button icon="plus" style={{float: 'right'}} onClick={addFriends}/>
                </div>
                
            )
        }    
    })
    

    console.log(SearchList);
    
    

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
