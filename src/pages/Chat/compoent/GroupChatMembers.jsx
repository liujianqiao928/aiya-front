import React, { useState } from 'react';
import { Avatar, Input, Dropdown, Menu, Tooltip, Card } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';

const allMembers = [
    { id: 1, name: 'User1', online: true, bio: 'This is User1, I love coding and gaming.' },
    { id: 2, name: 'User2', online: false, bio: 'This is User2, a music enthusiast.' },
    { id: 3, name: 'User3', online: true, bio: 'This is User3, enjoy traveling around the world.' },
    { id: 4, name: 'User4', online: false, bio: 'This is User4, passionate about photography.' },
    { id: 5, name: 'User4', online: false, bio: 'This is User4, passionate about photography.' },
    { id: 6, name: 'User4', online: false, bio: 'This is User4, passionate about photography.' },
    { id: 4, name: 'User4', online: false, bio: 'This is User4, passionate about photography.' },
    // 模拟更多成员...
];

const PAGE_SIZE = 10; // 每次加载的成员数量

const GroupChatMembers = () => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [page, setPage] = useState(1);

    // 按在线状态排序成员列表
    const sortedMembers = allMembers
        .sort((a, b) => (b.online ? 1 : -1) - (a.online ? 1 : -1))
        .slice(0, page * PAGE_SIZE);

    const handleSearch = (value) => {
        setSearchValue(value);
        if (value) {
            const results = allMembers.filter((member) =>
                member.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredMembers(results);
        } else {
            setFilteredMembers([]);
        }
    };

    const handleMenuClick = (action, member) => {
        console.log(`${action} on ${member.name}`);
        // 在此处实现相应的功能逻辑
    };

    const createMenu = (member) => (
        <Menu onClick={(e) => handleMenuClick(e.key, member)}>
            <Menu.Item key="report">Report</Menu.Item>
            <Menu.Item key="addFriend">Add as Friend</Menu.Item>
            <Menu.Item key="block">Block</Menu.Item>
            <Menu.Item key="blacklist">Add to Blacklist</Menu.Item>
        </Menu>
    );

    const searchMenu = (
        <Menu>
            {filteredMembers.map((member) => (
                <Menu.Item key={member.id} className="flex items-center space-x-4">
                    <Avatar size="small" icon={<UserOutlined />} />
                    <span>{member.name}</span>
                </Menu.Item>
            ))}
        </Menu>
    );

    const loadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold">Group Members</h2>
            <Dropdown overlay={searchMenu} visible={filteredMembers.length > 0}>
                <Input
                    placeholder="Search members"
                    prefix={<SearchOutlined />}
                    value={searchValue}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </Dropdown>
            <div className="overflow-y-auto max-h-[60vh] space-y-4" onScroll={loadMore}>
                {sortedMembers.map((member) => (
                    <Dropdown key={member.id} overlay={createMenu(member)} trigger={['contextMenu']}>
                        <div className="flex items-center space-x-4 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg">
                            <Tooltip
                                placement="top"
                                title={
                                    <Card bordered={false} style={{ width: 200 }}>
                                        <Card.Meta title={member.name} description={member.bio} />
                                    </Card>
                                }
                            >
                                <Avatar size="large" icon={<UserOutlined />} />
                            </Tooltip>
                            <div className="flex-1">
                                <div className="font-medium">{member.name}</div>
                                <div className={`text-sm ${member.online ? 'text-green-500' : 'text-gray-500'}`}>
                                    {member.online ? 'Online' : 'Offline'}
                                </div>
                            </div>
                        </div>
                    </Dropdown>
                ))}
                {sortedMembers.length < allMembers.length && (
                    <div className="text-center">
                        <button className="text-blue-500 hover:underline" onClick={loadMore}>
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroupChatMembers;
