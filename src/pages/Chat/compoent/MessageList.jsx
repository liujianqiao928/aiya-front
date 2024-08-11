import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import { Button } from 'antd';

const PAGE_SIZE = 10;

const MessageList = ({ messages }) => {
    const [page, setPage] = useState(1);
    const displayedMessages = messages.slice(0, page * PAGE_SIZE);
    const messageListRef = useRef(null);

    const handleScroll = () => {
        if (messageListRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = messageListRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                loadMore();
            }
        }
    };

    const loadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (messageListRef.current) {
                messageListRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [displayedMessages]);

    return (
        <div ref={messageListRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {displayedMessages.map((msg) => (
                <Message key={msg.id} message={msg} />
            ))}
            {displayedMessages.length < messages.length && (
                <div className="text-center">
                    <Button onClick={loadMore}>Load More</Button>
                </div>
            )}
        </div>
    );
};

export default MessageList;
