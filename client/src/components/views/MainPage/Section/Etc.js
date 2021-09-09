import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Modal, Icon, Input, Row } from 'antd';
import axios from 'axios';
import { changeUserInfo } from '../../../../_actions/user_actions'

function Etc(props) {

    const disptach = useDispatch()
    const [Visible, setVisible] = useState(false)
    const [Name, setName] = useState(props.user && props.user.name)
    const [ChangedName, setChangedName] = useState();

    //정보수정 버튼 
    const changeInfo = () => {
        setVisible(true);
    }
    //정보수정 확인 버튼
    const handleOk = () => {
        setVisible(false);

        disptach(changeUserInfo(ChangedName));

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

    const nameChangeHandler = (event) => {
        setChangedName(event.target.value)
    }

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
                    <Input default={Name} style={{width: '100px', textAlign:'center'}} defaultValue={Name} onChange={nameChangeHandler}/>
                </div>   
            </Modal>
            

            <div onClick={logoutHandler}>
                <Icon type="export" style={{fontSize: '25px'}}/> 로그아웃
                
            </div>

            
        </div>

        
    )
}

export default Etc
