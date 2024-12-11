import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useAPI } from '../../Context/APIContext';
import { useSocket } from '../../Context/SocketContext';

const ShowChats = ({ chats, activeTab,onChatSelect }) => {
  
  
  const [selected, setSelected] = useState(null);
  const [hoveredChat, setHoveredChat] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0, above: false });
  const menuRef = useRef(null); // Reference for the menu div
  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
  
    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    if (isToday) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${(hours % 12 || 12)}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
      return formattedTime;
    }
  
    if (isYesterday) {
      return 'Yesterday';
    }
  
    const dayOfWeek = daysOfWeek[date.getDay()];
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  
    if (diffInDays <= 7) {
      return dayOfWeek;
    }
  
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${month}/${day}/${year}`;
  }
  
  const handleContextMenu = (e, chatId, hv) => {
    e.preventDefault();
    const chatElement = e.currentTarget.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const above = windowHeight - chatElement.bottom < 150;
    const y = above ? chatElement.top - 0 : chatElement.bottom + 5;
    let left = chatElement.left;
    if (hv) {
      left = chatElement.left - 70;
    }
    setMenuPosition({ x: left, y, above });
    setShowMenu(true);
    setSelected(chatId);
  };
  const hanldeShowConversation=(chat)=>{
    console.log("Please Show Conversation :", chat);
    onChatSelect(chat);
  }


  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };
  const {getFilesPath}=useAPI();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {chats.length > 0 ? (
        chats.map((chat, index) => (
          <div
            key={chat.id}
            onContextMenu={(e) => handleContextMenu(e, chat.id)} 
            onClick={() => {hanldeShowConversation(chat)}}
            onMouseEnter={() => setHoveredChat(chat.id)}
            onMouseLeave={() => setHoveredChat(null)}
            className={`p-3 m-2 rounded hover:bg-gray-200 cursor-pointer flex items-center ${selected === chat.id ? 'bg-gray-200' : ''}`}
          >
            
            <img
              src={chat?.otherUser?.profile_image ?getFilesPath(chat?.otherUser?.profile_image) :`https://randomuser.me/api/portraits/men/9.jpg`}
              alt="User Avatar"
              className="mr-2 h-12 w-12 rounded-full object-cover"
            />
            <div className="flex-1 mx-2">
              <div className="flex justify-between items-center">
                <div className="font-bold text-sm">
                  {chat?.otherUser?.name}
                </div>
                <div className="text-sm flex items-center text-gray-500">
                  {chat?.createdAt ? formatDate(chat?.createdAt): ''}
                  {hoveredChat === chat.id && (
                    <IoIosArrowDown
                      size={14}
                      className="ml-2 cursor-pointer bg-white rounded"
                      onClick={(e) => { e.stopPropagation(); handleContextMenu(e, chat.id, true); }}
                    />
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {chat.lastMessage.length > 50 ? `${chat.lastMessage.slice(0, 47)}...` : chat.lastMessage}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="m-4">No {activeTab} Available</div>
      )}

      {showMenu && (
        <div
          ref={menuRef} // Set the menu ref here
          style={{
            position: 'absolute',
            top: menuPosition.y,
            left: menuPosition.x,
            transform: menuPosition.above ? 'translateY(-100%)' : 'none',
            width: '150px',
            zIndex: 10,
          }}
          className="bg-gray-200 border border-gray-300 shadow-md rounded-lg p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="w-full text-left p-2 hover:bg-gray-400 hover:text-white rounded"
            
          >
            Delete
          </button>
          <button className="w-full text-left p-2 hover:bg-gray-400 hover:text-white rounded">
            Mark as unread
          </button>
          <button className="w-full text-left p-2 hover:bg-gray-400 hover:text-white rounded">
            Starred
          </button>
          
        </div>
      )}
    </div>
  );
};

export default ShowChats;
