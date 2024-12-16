import React, { useEffect, useState } from 'react';
import AllChat from '../../Components/Chat/AllChat';
import ChatArea from '../../Components/Chat/ChatArea';
import { useSocket } from '../../Context/SocketContext';

const Chat = () => {
  const {conversations,groupChats}=useSocket();
  const [chats,setChats]=useState(conversations || [])
  const [goupsChat,setGroupChat]=useState([])

const [newChat,setNewChat]=useState({});
const [isGroup,setGroup]=useState(false);
const [selectedChat, setSelectedChat] = useState(null);


  // Handle chat selection
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setNewChat(null);
  };
  useEffect(()=>{
    console.log("Is Group is :", isGroup);
    if(isGroup){
      groupChats()
      .then((res)=>{
        console.log("Response :", res);
        setGroupChat(res.data);
      })
      .catch((err)=>{
        console.log("Error :", err);
      })
    }
  },[isGroup])

  

  return (
    <div className="flex h-screen">
      {/* AllChat component */}
      <div className={`md:flex ${selectedChat ? 'hidden md:flex' : 'flex'} md:w-1/3 w-full`}>

        <AllChat
          chats={chats}
          goupsChat={goupsChat}
          onChatSelect={handleChatSelect}
          setNewChat={setNewChat}
          setGroup={setGroup}
        />
      </div>
      {/* ChatArea component */}
      {(selectedChat || newChat) && (
        <div className="flex-1">
          <ChatArea chat={newChat?newChat:selectedChat?selectedChat:null} isGroup={isGroup}  onBack={() => setSelectedChat(null)} />
        </div>
      )}
    </div>
  );
};

export default Chat;
