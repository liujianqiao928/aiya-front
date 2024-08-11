import React from 'react';
import { Input } from 'antd';

const CategoryBar = () => {
    // 模拟数据
    const primaryCategories = ['科技', '艺术', '历史'];
    const secondaryCategories = ['计算机', '绘画', '世界历史'];
    const courses = ['React 基础', '现代艺术', '二战全史'];

    return (
        <div className="flex flex-col items-center w-full p-4">
            {/* 定义一个内层容器，确保内容与最宽的元素一致 */}
            <div className="w-full max-w-lg">
                {/* 搜索栏 */}
                <div className="w-full mb-4">
                    <Input placeholder="搜索课程" />
                </div>

                {/* 一级分类 */}
                <div className="flex items-center space-x-4 mb-2 w-full">
                    <span className="font-bold text-red-500">一级分类:</span>
                    {primaryCategories.map((category, index) => (
                        <span key={index} className="text-white text-sm bg-gray-800 rounded px-2 py-1 hover:bg-gray-700 cursor-pointer">{category}</span>
                    ))}
                </div>

                {/* 二级分类 */}
                <div className="flex items-center space-x-4 mb-2 w-full">
                    <span className="font-bold text-red-500">二级分类:</span>
                    {secondaryCategories.map((category, index) => (
                        <span key={index} className="text-white text-sm bg-gray-700 rounded px-2 py-1 hover:bg-gray-600 cursor-pointer">{category}</span>
                    ))}
                </div>

                {/* 具体课程 */}
                <div className="flex items-center space-x-4 w-full">
                    <span className="font-bold text-red-500">课程:</span>
                    {courses.map((course, index) => (
                        <span key={index} className="text-white text-sm bg-gray-600 rounded px-2 py-1 hover:bg-gray-500 cursor-pointer">{course}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryBar;
