import React, { useState } from 'react';
import { Card, Pagination } from 'antd';
import { PlayCircleOutlined, CalendarOutlined } from '@ant-design/icons';

const CourseList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8; // 每页显示的课程数量

    // 假设课程数据是静态的
    const courses = [
        { title: "React 基础", description: "学习React基本原理和实践。", cover: "https://via.placeholder.com/400x225", views: "2.3万", date: "2021-01-15" },
        { title: "高级CSS", description: "深入CSS布局和动画。", cover: "https://via.placeholder.com/400x225", views: "1.1万", date: "2021-02-11" },
        // 假设还有更多课程
    ];

    // 计算当前页的课程
    const indexOfLastCourse = currentPage * pageSize;
    const indexOfFirstCourse = indexOfLastCourse - pageSize;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-4">
            <div className="flex flex-wrap justify-center gap-4">
                {currentCourses.map((course, index) => (
                    <div key={index} className="hover:shadow-lg relative">
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt={course.title} src={course.cover} className="h-40 object-cover" />}
                        >
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <h3 className="text-lg font-bold">{course.title}</h3>
                                    <p className="text-gray-500">{course.description}</p>
                                </div>
                                <div className="flex justify-between text-gray-500 text-sm">
                                    <span><PlayCircleOutlined /> {course.views}</span>
                                    <span><CalendarOutlined /> {course.date}</span>
                                </div>
                            </div>
                        </Card>
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-center opacity-0 hover:opacity-100">
                            <p>{course.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <Pagination
                    current={currentPage}
                    onChange={handleChangePage}
                    total={courses.length}
                    pageSize={pageSize}
                    showSizeChanger={false}
                    showQuickJumper={true} // 允许快速跳转至某页
                />
            </div>
        </div>
    );
};

export default CourseList;
