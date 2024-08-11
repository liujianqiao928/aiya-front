import React from 'react';
import { Button } from 'antd';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';

const Header = () => {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-300">
            <h1 className="text-lg font-bold">Chat Room</h1>
            <div className="space-x-2">
                <Button icon={<SettingOutlined />} />
                <Button icon={<LogoutOutlined />} />
            </div>
        </div>
    );
};

export default Header;
