import React from 'react';
import { Alert } from 'antd';

const Notification = ({ message }) => {
    return (
        <div className="absolute top-0 right-0 m-4">
            <Alert message={message} type="info" showIcon />
        </div>
    );
};

export default Notification;
