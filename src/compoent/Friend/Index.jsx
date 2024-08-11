import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

const FriendList = ({ friends, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="w-64 bg-gray-200 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Friends & Chats</h2>
                <Button icon={<UserAddOutlined />} type="primary" shape="circle" />
            </div>
            <Input
                placeholder="Search friends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
            />
            {/* AI 群聊置顶项 */}
            <div onClick={() => onSelect('AI群聊')} className="p-2 hover:bg-gray-300 cursor-pointer bg-blue-500 text-white font-bold">
                AI群聊
            </div>
            {/* 动态生成好友列表 */}
            {friends.filter(friend => friend.name.toLowerCase().includes(searchTerm.toLowerCase())).map(friend => (
                <div key={friend.id} onClick={() => onSelect(friend.name)} className="flex items-center p-2 hover:bg-gray-300 cursor-pointer">
                    <img src={friend.avatar} alt={friend.name} className="rounded-full w-10 h-10 mr-2" />
                    <div>
                        <div className="font-bold">{friend.name}</div>
                        <div className="text-sm">{friend.lastMessage}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FriendList;
