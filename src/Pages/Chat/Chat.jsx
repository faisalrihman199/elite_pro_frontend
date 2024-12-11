import React, { useEffect, useState } from 'react';
import AllChat from '../../Components/Chat/AllChat';
import ChatArea from '../../Components/Chat/ChatArea';
import { useSocket } from '../../Context/SocketContext';

const Chat = () => {
  const {conversations}=useSocket();
  const chats=conversations || []
  
//   const [chats, setChats] = useState([
//     { id: 1, name: 'Ali Khan', lastMessage: 'How have you been? How have you been? How have you been? How have you been? How have you been? How have you been? How have you been?', time: '5:30 PM' },
//     { id: 2, name: 'Omar Malik', lastMessage: 'Are you coming to the event?', time: '4:00 AM' },
//     { id: 3, name: 'Hassan Raza', lastMessage: 'What time is the meeting?', time: 'Yesterday' },
//     { id: 4, name: 'Bilal Siddiqui', lastMessage: 'Let’s discuss the project.', time: 'Monday' },
//     { id: 5, name: 'Kareem Shah', lastMessage: 'Let me know your thoughts.', time: 'Sunday' },
//     { id: 6, name: 'Usman Ahmed', lastMessage: 'How’s your family doing?', time: 'Saturday' },
//     { id: 7, name: 'Fahad Iqbal', lastMessage: 'Did you receive my message?', time: '10/11/2024' },
//     { id: 8, name: 'Saqib Javed', lastMessage: 'Hope to see you soon!', time: '10/10/2024' },
//     { id: 9, name: 'Ahsan Malik', lastMessage: 'Are we still on for tomorrow?', time: '10/09/2024' },
//     { id: 10, name: 'Tariq Hussain', lastMessage: 'Let’s finalize the details.', time: '10/08/2024' },
// ]);
const [newChat,setNewChat]=useState({});


const [selectedChat, setSelectedChat] = useState(chats[0]);

  useEffect(()=>{
    console.log("New Chat is :", newChat);
    
  },[newChat])
  // Handle chat selection
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);

    setNewChat(null);
  };

  // Handle chat deletion
  const handleChatDelete = (chatId) => {
    setChats(chats.filter((chat) => chat.id !== chatId));

    // If the selected chat is deleted, reset selectedChat
    if (selectedChat?.id === chatId) {
      setSelectedChat(null);
    }
  };

  return (
    <div className="flex h-screen">
      {/* AllChat component */}
      <div className={`md:flex ${selectedChat ? 'hidden md:flex' : 'flex'} md:w-1/3 w-full`}>

        <AllChat
          chats={chats}
          onChatSelect={handleChatSelect}
          onChatDelete={handleChatDelete} 
          setNewChat={setNewChat}
        />
      </div>

      {/* ChatArea component */}
      {(selectedChat || newChat) && (
        <div className="flex-1">
          <ChatArea chat={newChat || selectedChat}  onBack={() => setSelectedChat(null)} />
        </div>
      )}
    </div>
  );
};

export default Chat;
