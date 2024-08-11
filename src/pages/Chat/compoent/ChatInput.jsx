import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const ChatInput = ({ onSendMessage }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            const newMessage = {
                id: Date.now(),
                user: 'CurrentUser',  // 假设当前用户的用户名为 CurrentUser
                content: input,
                time: new Date().toLocaleTimeString(),
                isCurrentUser: true,
            };
            onSendMessage(newMessage);
            setInput('');
        }
    };

    return (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90">
            <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onPressEnter={handleSend}
                suffix={
                    <Button type="primary" icon={<SendOutlined />} onClick={handleSend}>
                        Send
                    </Button>
                }
            />
        </div>
    );
};

export default ChatInput;
