import React from 'react'
import { Tabs, Icon, Alert, Button } from 'antd';

const { TabPane } = Tabs;

function LandingPage(props) {

    const callback = (key) => {}

    return (
        <div style={{ margin: '20px', marginTop:'0' }}>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab={<Icon type='user' style={{ fontSize: '20px' , }}/>} key="1">
                    <Alert
                        message="로그인이 필요합니다"
                        description={<Button type="primary" onClick={() => {props.history.push('/login')}}>로그인</Button>}
                        type="info"
                        showIcon
                        style={{textAlign:'center'}}
                        
                    />
                   
                </TabPane>
            </Tabs>
        </div>
    )
}

export default LandingPage
