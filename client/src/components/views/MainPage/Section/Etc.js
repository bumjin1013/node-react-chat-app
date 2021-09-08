import React, { useState } from 'react';
import { Avatar, Modal, Icon, Input, Row } from 'antd';
import axios from 'axios';

function Etc(props) {

    const [Visible, setVisible] = useState(false)
    const [Name, setName] = useState(props.user && props.user.name)
    //정보수정 버튼 
    const changeInfo = () => {
        setVisible(true);
    }
    //정보수정 확인 버튼
    const handleOk = () => {
        setVisible(false);
    }
    //정보수정 취소 버튼
    const handleCancel = () => {
        setVisible(false);
    }

    //로그아웃
    const logoutHandler = () => {
        axios.get('/api/users/logout').then(response => {
            if (response.status === 200) {
                props.history.push("/");
            } else {
                alert('Log Out Failed')
            }
        });
    };

    console.log(props.user);
   

    return (
        <div>
            <div onClick={changeInfo} style={{paddingBottom: '10px'}}>
                <Icon type="user" style={{fontSize: '25px'}}/> 정보수정
            </div>
            <Modal  title="정보수정" visible={Visible} onOk={handleOk} onCancel={handleCancel}>
                <div style={{textAlign: 'center'}}>
                    <Avatar size="large" icon="user" />
                    <br/>
                    <br/>
                    <Input default={Name} style={{width: '200px'}}/>
                </div>   
            </Modal>
            

            <div onClick={logoutHandler}>
                <Icon type="export" style={{fontSize: '25px'}}/> 로그아웃
                
            </div>

            
        </div>

        
    )
}

export default Etc
