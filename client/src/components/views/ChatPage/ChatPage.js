import React from 'react'
import { Form, Icon, Input, Button, Row, Col } from 'antd';
function ChatPage(props) {

    const submitChatMessage = (event) => {
        event.preventDefault();

    }


    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="infinite-container" style={{ height: '500px', overflowY:' scroll' }}>
               
           
            </div>

            <Row >
                <Form layout="inline" >
                    <Col span={18}>
                         <Input
                            id="message"
                            prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="text"
                            

                        />
                    </Col>
                    <Col span={2}>
                        
                    </Col>

                    <Col span={4}>
                        <Button type="primary" style={{ width: '100%' }} onClick={submitChatMessage} htmlType="submit">
                            <Icon type="enter" />
                        </Button>
                    </Col>
                </Form>
             </Row>
         </div>
    )
}

export default ChatPage
