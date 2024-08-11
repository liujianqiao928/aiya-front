import React, { useRef, useState, useEffect } from 'react';
import { Menu, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

function Navbar() {
    const menuRef = useRef(null);
    const [showArrows, setShowArrows] = useState(false);

    const categories = [
        "Category 1", "Category 2", "Category 3", "Category 4", "Category 5",
        "Category 6", "Category 7", "Category 8", "Category 9", "Category 10","swws"
    ];

    useEffect(() => {
        const checkIfArrowsNeeded = () => {
            const isOverflowing = menuRef.current && menuRef.current.scrollWidth > menuRef.current.clientWidth;
            setShowArrows(categories.length > 8 && isOverflowing);
        };

        checkIfArrowsNeeded();
        window.addEventListener('resize', checkIfArrowsNeeded);
        return () => window.removeEventListener('resize', checkIfArrowsNeeded);
    }, []);

    const scrollMenu = (direction) => {
        if (menuRef.current) {
            const currentScroll = menuRef.current.scrollLeft;
            const scrollAmount = direction === 'left' ? -menuRef.current.offsetWidth : menuRef.current.offsetWidth;
            menuRef.current.scrollTo({
                left: currentScroll + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-200 text-gray-800">
            {showArrows && (
                <Button icon={<LeftOutlined />} onClick={() => scrollMenu('left')} className="text-gray-600" />
            )}
            <div ref={menuRef} className="flex overflow-x-auto scrollbar-hide items-center justify-center flex-grow scroll-container">
                <Menu mode="horizontal" theme="light" className="flex justify-center items-center w-full">
                    {categories.map((category, index) => (
                        <Menu.Item key={index} className="text-center">
                            {category}
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
            {showArrows && (
                <Button icon={<RightOutlined />} onClick={() => scrollMenu('right')} className="text-gray-600" />
            )}
        </div>
    );
}

export default Navbar;
