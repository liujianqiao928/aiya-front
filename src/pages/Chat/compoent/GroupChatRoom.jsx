import React, { useState } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import GroupChatMembers from './GroupChatMembers';

const GroupChatRoom = () => {
    const [messages, setMessages] = useState([
        { id: 1, user: 'User1', content: 'Hello everyone!', time: '10:00 AM', isCurrentUser: false },
        { id: 2, user: 'User2', content: 'Hi there!', time: '10:01 AM', isCurrentUser: false },
    ]);

    const handleSendMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return (
        <div className="flex h-screen">
            <div className="flex-1 flex flex-col">
                <MessageList messages={messages} />
                <ChatInput onSendMessage={handleSendMessage} />
            </div>
            <div className="w-1/4 bg-gray-100 p-4">
                <GroupChatMembers />
            </div>
        </div>
    );
};

export default GroupChatRoom;
