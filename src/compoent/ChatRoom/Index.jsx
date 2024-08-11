import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';

const ChatRoom = ({ currentChat, messages, sendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const messageEndRef = useRef(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            sendMessage(currentChat, newMessage);
            setNewMessage('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="flex-1 flex flex-col">
            <div className="flex-grow overflow-auto">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-start ${msg.self ? 'justify-end' : 'justify-start'} m-2`}>
                        <div className={`flex items-end ${msg.self ? 'flex-row-reverse' : ''}`}>
                            <Button shape="circle" icon={<VideoCameraOutlined />} size="small" className="ml-2 mr-2" />
                            <div className={`p-3 rounded ${msg.self ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                                {!msg.self && <div className="text-sm font-semibold">{msg.author}</div>}
                                <p>{msg.text}</p>
                                <div className="text-xs text-gray-500">{msg.timestamp}</div>
                            </div>
                            <img src={msg.avatar} alt={msg.author} className="h-10 w-10 rounded-full ml-2 mr-2" />
                        </div>
                    </div>
                ))}
                <div ref={messageEndRef} />
            </div>
            <div className="p-4 bg-white shadow fixed inset-x-0 bottom-0 flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 border p-2 rounded focus:outline-none"
                    placeholder="Type your message here..."
                />
                <button onClick={handleSendMessage} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;
