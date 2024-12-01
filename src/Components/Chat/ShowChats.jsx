import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const ShowChats = ({ chats, activeTab }) => {
  const [selected, setSelected] = useState(null);
  const [hoveredChat, setHoveredChat] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0, above: false });
  const menuRef = useRef(null); // Reference for the menu div

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

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

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
            onMouseEnter={() => setHoveredChat(chat.id)}
            onMouseLeave={() => setHoveredChat(null)}
            className={`p-3 m-2 rounded hover:bg-gray-200 cursor-pointer flex items-center ${selected === chat.id ? 'bg-gray-200' : ''}`}
          >
            
            <img
              src={`https://randomuser.me/api/portraits/men/${index}.jpg`}
              alt="User Avatar"
              className="mr-2 h-12 w-12 rounded-full object-cover"
            />
            <div className="flex-1 mx-2">
              <div className="flex justify-between items-center">
                <div className="font-bold text-sm">
                  {chat.name}
                </div>
                <div className="text-sm flex items-center text-gray-500">
                  {chat.time}
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
