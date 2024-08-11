import React, { useState } from 'react';
import { List, Pagination, Select, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const questions = [
    { title: 'What is a binary search tree?', url: 'https://example.com/bst' },
    { title: 'Explain QuickSort algorithm.', url: 'https://example.com/quicksort' },
    // 更多题目...
];

function QuestionList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const pageSize = 10; // 每页显示的题目数量

    // 处理搜索操作
    const handleSearch = () => {
        console.log('Search:', category, difficulty, searchTerm);
        // 实现搜索逻辑
    };

    return (
        <div>
            <div className="flex gap-4 mb-4">
                <Select defaultValue="请选择分类" style={{ width: 200 }} onChange={value => setCategory(value)}>
                    <Option value="algorithms">Algorithms</Option>
                    <Option value="data-structures">Data Structures</Option>
                    // 更多选项...
                </Select>
                <Select defaultValue="请选择难度" style={{ width: 200 }} onChange={value => setDifficulty(value)}>
                    <Option value="easy">Easy</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="hard">Hard</Option>
                </Select>
                <Input placeholder="搜索题目" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ flex: 1 }} />
                <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>搜索</Button>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={questions} // 这里需要根据搜索和筛选结果来动态改变
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>}
                        />
                    </List.Item>
                )}
            />
            <Pagination
                current={currentPage}
                onChange={page => setCurrentPage(page)}
                total={questions.length}
                pageSize={pageSize}
                showSizeChanger={false}
            />
        </div>
    );
}

export default QuestionList;
