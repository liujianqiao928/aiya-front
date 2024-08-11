import React, {useState} from 'react';
import MessageList from './compoent/MessageList';
import ChatInput from './compoent/ChatInput';
import UserList from './compoent/UserList';
import Header from './compoent/Header';
import GroupChatMembers from "./compoent/GroupChatMembers.jsx";


const ChatContainer = () => {
    const [currentRoom, setCurrentRoom] = useState('ai');
    const [isAi, setIsAi] = useState(false);
    const [chatRooms, setChatRooms] = useState({
        ai: [
            { id: 1, user: 'User1', content: 'Hello in ai', time: '10:00 AM', isCurrentUser: false },
        ],
        Room1: [
            { id: 1, user: 'User1', content: 'Hello in Room1!', time: '10:00 AM', isCurrentUser: false },
        ],
        Room2: [
            { id: 2, user: 'User2', content: 'Hello in Room2!', time: '10:01 AM', isCurrentUser: false },
        ],
    });

    const handleSendMessage = (newMessage) => {
        setChatRooms((prevRooms) => ({
            ...prevRooms,
            [currentRoom]: [...prevRooms[currentRoom], newMessage],
        }));
    };

    const handleRoomChange = (room) => {
        setIsAi(room !== "ai"  )
        setCurrentRoom(room);
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-gray-100 p-4">
                <UserList onRoomChange={handleRoomChange} />
            </div>
            <div className="flex-1 flex flex-col relative">
                <Header />
                { isAi ?<div> <MessageList messages={chatRooms[currentRoom] || []}/><ChatInput onSendMessage={handleSendMessage} /> </div>:
                    <div className="flex h-screen">
                        <div className="flex-1 flex flex-col">
                            <MessageList messages={chatRooms[currentRoom] || []} />
                            <ChatInput onSendMessage={handleSendMessage} />
                        </div>
                        <div className="w-1/4 bg-gray-100 p-4">
                            <GroupChatMembers />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};


export default ChatContainer;
