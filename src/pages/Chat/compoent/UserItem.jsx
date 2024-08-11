import React from 'react';
import { Avatar } from 'antd';

const UserItem = ({ user }) => {
    return (
        <div className="flex items-center space-x-4">
            <Avatar size="large">{user.name[0]}</Avatar>
            <div>{user.name}</div>
        </div>
    );
};

export default UserItem;
