import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, List, Avatar, Tooltip } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment'; // 用于时间格式化

const { TextArea } = Input;

const ChatGPTPage = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSend = async () => {
        if (input.trim()) {
            const newMessage = {
                id: Date.now(),
                type: 'user',
                text: input,
                timestamp: new Date(),
                user: { name: 'John Doe', avatar: null }
            };
            setMessages(msgs => [...msgs, newMessage]);
            setInput('');
            try {
                const response = await axios.post('https://your-backend-api/message', { message: input });
                const reply = {
                    id: Date.now(),
                    type: 'bot',
                    text: response.data.reply,
                    timestamp: new Date(),
                    user: { name: 'ChatGPT', avatar: null }
                };
                setMessages(msgs => [...msgs, reply]);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="container mx-auto p-4 h-screen flex flex-col">
            <div className="flex-1 overflow-y-auto">
                <List
                    className="chat-messages"
                    itemLayout="horizontal"
                    dataSource={messages}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined />} src={item.user.avatar} />}
                                title={<span>{item.user.name}</span>}
                                description={
                                    <>
                                        <p>{item.text}</p>
                                        <Tooltip title={moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss')}>
                                            <span className="text-xs text-gray-500">{moment(item.timestamp).fromNow()}</span>
                                        </Tooltip>
                                    </>
                                }
                            />
                        </List.Item>
                    )}
                />
                <div ref={messagesEndRef} />
            </div>
            <div className="input-area fixed bottom-0 left-0 w-full p-4 bg-white shadow-md">
                <TextArea
                    rows={2}
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="mr-2 flex-grow"
                />
                <Button type="primary" icon={<SendOutlined />} onClick={handleSend} className="bg-blue-500 hover:bg-blue-700">
                    发送
                </Button>
            </div>
        </div>
    );
};

export default ChatGPTPage;
