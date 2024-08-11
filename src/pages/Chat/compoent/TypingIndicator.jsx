import React from 'react';
import { Modal, Switch } from 'antd';

const SettingsModal = ({ visible, onClose }) => {
    return (
        <Modal title="Settings" visible={visible} onCancel={onClose} footer={null}>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <span>Enable Notifications</span>
                    <Switch />
                </div>
                <div className="flex justify-between">
                    <span>Dark Mode</span>
                    <Switch />
                </div>
            </div>
        </Modal>
    );
};

export default SettingsModal;
