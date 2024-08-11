import React, { useState, useRef, useEffect } from 'react';

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [history, setHistory] = useState(['JavaScript', 'Node.js', 'GraphQL']); // 可变更的搜索历史
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleRemoveHistoryItem = (item) => {
        setHistory(prev => prev.filter(h => h !== item));
    };

    return (
        <div className="relative" ref={ref}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                placeholder="Search..."
                className={`transition-width duration-300 ease-in-out ${isFocused || searchTerm ? 'w-80' : 'w-40'} h-10 border border-gray-300 px-4 rounded-lg focus:outline-none`}
            />
            {isFocused && (
                <div className="absolute w-80 mt-1 p-2 bg-white border border-gray-300 shadow-lg z-10">
                    {searchTerm ? (
                        <ul>
                            {/* 实际项目中应连接至后端搜索结果 */}
                            <li className="p-2 hover:bg-gray-100 cursor-pointer">Result for "{searchTerm}"</li>
                        </ul>
                    ) : (
                        <>
                            <div>
                                <h4 className="font-semibold text-sm text-red-600">Hot Searches</h4>
                                {['React Hooks', 'Tailwind CSS', 'Next.js', 'TypeScript'].map((item, index) => (
                                    <p key={index} className="text-sm text-red-600 p-1 hover:bg-gray-100 cursor-pointer">{item}</p>
                                ))}
                            </div>
                            <div className="mt-2">
                                <h4 className="font-semibold text-sm">Search History</h4>
                                <div className="flex flex-wrap space-x-2">
                                    {history.map((item, index) => (
                                        <div key={index} className="flex items-center bg-gray-200 rounded-full px-2 py-1 text-sm">
                                            <span className="mr-1">{item}</span>
                                            <button onClick={() => handleRemoveHistoryItem(item)} className="text-gray-600 hover:text-red-600">
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBox;
