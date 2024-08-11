import React from 'react';
import { Tag } from 'antd';

const tags = ['Easy', 'Medium', 'Hard', 'Array', 'Tree', 'Graph'];

function TagFilter() {
    return (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
            {tags.map(tag => (
                <Tag color="blue" key={tag} className="cursor-pointer hover:scale-110 transition-transform">
                    {tag}
                </Tag>
            ))}
        </div>
    );
}

export default TagFilter;
