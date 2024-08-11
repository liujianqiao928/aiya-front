import React, { useState, useRef } from 'react';
import { Avatar, Input, Button, Dropdown, Menu } from 'antd';
import { UserAddOutlined, MoreOutlined } from '@ant-design/icons';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

const initialUsers = [
    { id: 'ai', name: 'AI聊天室', lastMessage: 'Welcome to AI Chat Room!', time: '09:00 AM', isPinned: true, isAI: true },
    { id: 'Room1', name: 'User1', lastMessage: 'Hello!', time: '10:00 AM' },
    { id: 'Room2', name: 'User2', lastMessage: 'How are you?', time: '10:01 AM' },
];

const UserList = ({ onRoomChange }) => {
    const [users, setUsers] = useState(initialUsers);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownTimeoutRef = useRef(null);

    const handleMenuClick = (e, userId) => {
        switch (e.key) {
            case 'delete':
                setUsers(users.filter(user => user.id !== userId));
                break;
            case 'favorite':
                console.log(`指定好友 ${userId}`);
                break;
            case 'blacklist':
                console.log(`拉入黑名单 ${userId}`);
                break;
            case 'pin':
                setUsers(users.map(user =>
                    user.id === userId ? { ...user, isPinned: true } : user
                ));
                break;
            default:
                break;
        }
    };

    const handleMouseDown = (userId) => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setDropdownVisible(userId);
        }, 3000); // 3秒
    };

    const handleMouseUp = () => {
        clearTimeout(dropdownTimeoutRef.current);
    };

    const moveUser = (dragIndex, hoverIndex) => {
        const dragUser = users[dragIndex];
        setUsers(
            update(users, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragUser],
                ],
            })
        );
    };

    const menu = (userId) => (
        <Menu onClick={(e) => handleMenuClick(e, userId)}>
            <Menu.Item key="pin">置顶</Menu.Item>
            <Menu.Item key="delete">删除好友</Menu.Item>
            <Menu.Item key="blacklist">拉入黑名单</Menu.Item>
        </Menu>
    );

    const UserItem = ({ user, index, moveUser }) => {
        const ref = useRef(null);

        const [{ isDragging }, drag] = useDrag({
            type: 'USER',
            item: { index },
            canDrag: !user.isAI, // AI聊天室不可拖动
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });

        const [, drop] = useDrop({
            accept: 'USER',
            hover: (draggedItem) => {
                if (draggedItem.index !== index && !user.isAI) {
                    moveUser(draggedItem.index, index);
                    draggedItem.index = index;
                }
            },
        });

        drag(drop(ref));

        return (
            <Dropdown
                overlay={menu(user.id)}
                trigger={['contextMenu']}
                visible={isDropdownVisible === user.id}
                onVisibleChange={() => setDropdownVisible(false)}
            >
                <div
                    ref={ref}
                    className={`flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-lg ${isDragging ? 'opacity-50' : ''}`}
                    onClick={() => onRoomChange(user.id)}
                    onMouseDown={() => handleMouseDown(user.id)}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <Avatar size="large">{user.name[0]}</Avatar>
                    <div className="flex-1">
                        <div className={`font-bold ${user.isAI ? 'text-red-500' : ''}`}>{user.name}</div>
                        <div className="text-sm text-gray-500">{user.lastMessage}</div>
                    </div>
                    <div className="text-xs text-gray-400">{user.time}</div>
                    <Button icon={<MoreOutlined />} type="text" />
                </div>
            </Dropdown>
        );
    };

    const pinnedUsers = users.filter(user => user.isPinned);
    const nonPinnedUsers = users.filter(user => !user.isPinned);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="bg-white shadow-md rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">好友列表</h2>
                    <Button icon={<UserAddOutlined />} type="primary" shape="circle" />
                </div>
                <div className="mb-4">
                    <Input.Search placeholder="搜索好友" />
                </div>
                <div className="space-y-4">
                    {pinnedUsers.map((user, index) => (
                        <UserItem key={user.id} index={index} user={user} moveUser={moveUser} />
                    ))}
                    {nonPinnedUsers.map((user, index) => (
                        <UserItem key={user.id} index={pinnedUsers.length + index} user={user} moveUser={moveUser} />
                    ))}
                </div>
            </div>
        </DndProvider>
    );
};

export default UserList;
