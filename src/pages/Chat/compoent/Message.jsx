import React from 'react';
import { Avatar } from 'antd';

const Message = ({ message }) => {
    const messageAlignment = message.isCurrentUser ? 'justify-end' : 'justify-start';
    const messageBgColor = message.isCurrentUser ? 'bg-blue-100' : 'bg-gray-100';
    const messageTextColor = message.isCurrentUser ? 'text-blue-500' : 'text-black';

    return (
        <div className={`flex items-start space-x-4 ${messageAlignment}`}>
            {!message.isCurrentUser && <Avatar size="large">{message.user[0]}</Avatar>}
            <div className={`p-3 rounded-lg ${messageBgColor}`}>
                <div className={`text-sm ${messageTextColor}`}>{message.content}</div>
                <div className="text-xs text-gray-400">{message.time}</div>
            </div>
            {message.isCurrentUser && <Avatar size="large">{message.user[0]}</Avatar>}
        </div>
    );
};

export default Message;
