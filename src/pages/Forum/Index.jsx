import React, { useState } from 'react';
import Search from "../../compoent/search/index.jsx";

// 模拟帖子数据
const totalPosts = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Post Title ${i + 1}`,
    author: `Author ${i + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
    date: `2023-08-${10 - i % 10}`,
    summary: 'This is a summary of the post content...',
    likes: Math.floor(Math.random() * 100) + 1,
    views: Math.floor(Math.random() * 1000) + 1,
    tags: ['React', 'CSS', 'JavaScript'],
    heat: Math.floor(Math.random() * 500) + 100,
}));

const ForumHomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const postsPerPage = 10;

    // 过滤并计算当前页的帖子
    const filteredPosts = searchTerm.trim() ? totalPosts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase())) : totalPosts;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    // 分页
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // 处理搜索变化
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // 搜索时重置到第一页
    };

    return (
        <div className="min-h-screen ">
            <header className=" shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <nav className="flex justify-between items-center">
                        <div className="flex space-x-4">
                            <a href="#" className="text-sm font-semibold text-blue-500 px-3 py-2">Home</a>
                            <a href="#" className="text-sm font-semibold text-blue-500 px-3 py-2">Topics</a>
                            <a href="#" className="text-sm font-semibold text-blue-500 px-3 py-2">Community</a>
                        </div>
                        {/*<input*/}
                        {/*    type="search"*/}
                        {/*    placeholder="Search posts..."*/}
                        {/*    value={searchTerm}*/}
                        {/*    onChange={handleSearchChange}*/}
                        {/*    className="mt-1 block px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"*/}
                        {/*/>*/}
                        <Search />
                    </nav>
                </div>
            </header>
            <div className="flex max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
                <main className="flex-1">
                    <div className=" shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {currentPosts.map(post => (
                                <li key={post.id} className="block hover:bg-gray-50 p-4">
                                    <div className="flex items-center space-x-4">
                                        <img src={post.avatar} alt="author" className="h-10 w-10 rounded-full" />
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-blue-600">{post.title}</h4>
                                            <p className="text-sm text-gray-500">{post.summary}</p>
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>{post.author}</span>
                                                <span>{post.date}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{post.likes} likes</span>
                                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">{post.views} views</span>
                                                {post.tags.map(tag => (
                                                    <span key={tag} className="text-xs  text-green-800 px-2 py-1 rounded">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200">
                            <div className="flex-1 flex justify-between">
                                {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
                                    <button key={i} onClick={() => paginate(i + 1)} className={`mx-1 px-4 py-2 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'}`}>
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
                <aside className="w-80 ml-6">
                    <div className=" p-4 shadow sm:rounded-lg mb-4">
                        <h3 className="font-semibold text-xl text-red-600">Hot Search</h3>
                        <ul className="mt-4">
                            {totalPosts.slice(0, 5).map(post => (
                                <li key={post.id} className="text-red-600 text-sm mb-2">{post.title} ({post.heat} heat)</li>
                            ))}
                        </ul>
                    </div>
                    <div className=" p-4 shadow sm:rounded-lg">
                        <h3 className="font-semibold text-xl">Recently Viewed</h3>
                        <ul className="mt-4">
                            {totalPosts.slice(0, 5).map(post => (
                                <li key={post.id} className="text-gray-700 text-sm mb-2">{post.title}</li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
            <div className="fixed bottom-0 right-0 p-4 bg-white rounded-tl-lg shadow-lg">
                <div className="font-semibold">Categories:</div>
                <div className="flex flex-wrap">
                    {['React', 'CSS', 'JavaScript', 'Tailwind'].map(tag => (
                        <span key={tag} className="m-1 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ForumHomePage;
