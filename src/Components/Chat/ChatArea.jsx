import React, { useState, useRef } from 'react';
import { FaMicrophone, FaStop, FaUser, FaCheck, FaRegCheckCircle, FaTrashAlt, FaPaperPlane, FaReply } from 'react-icons/fa';
import { TiAttachment } from 'react-icons/ti';
import Wa_Bg from "../../assets/Chat/wa_bg.jpg";
import { BiCheck, BiCheckDouble, BiSearch } from 'react-icons/bi';
import { IoSend } from 'react-icons/io5';
import { FiMic } from 'react-icons/fi';
import OneMessage from './OneMessage';
import { RxCrossCircled } from 'react-icons/rx';
const ChatArea = ({ chat, onBack }) => {
  const [dummyMessages, setDummyMessages] = useState([
    { sender: 'You', message: 'I’m good! How about you?I’m good! How about you?I’m good! How about you?I’m good! How about you?I’m good! How about you?', time: '10:05 AM', status: 'sent' },
    { sender: 'You', message: 'I’m good! How about you?', time: '10:05 AM', status: 'delivered' },
    { sender: 'John Doe', message: 'Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?', time: '10:00 AM', status: 'read' },
    { sender: 'You', message: 'I’m good! How about you?', time: '10:05 AM', status: 'read' },
    { sender: 'John Doe', message: 'Doing well, thanks!', time: '10:10 AM', status: 'read' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [isRecordingComplete, setIsRecordingComplete] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMessageObj = {
        id: dummyMessages.length + 1,
        sender: 'You',
        message: newMessage,
        time,
        status: 'sent',
        replyTo: replyingTo,
      };
      setDummyMessages([...dummyMessages, newMessageObj]);
      setNewMessage('');
      setReplyingTo(null);
    }
  };
  const handleReply = (message) => {
    setReplyingTo(message); // Set the selected message as the reply target
  };
  const cancelReply = () => setReplyingTo(null);
  const handleMediaSend = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const fileUrl = URL.createObjectURL(file);

      setDummyMessages([
        ...dummyMessages,
        {
          sender: 'You',
          message: '',
          fileName: file.name,
          fileUrl,
          time,
          status: 'sent',
          replyTo: replyingTo,
        },
      ]);
      setNewMessage('');
      setReplyingTo(null);
    }
  };
  const filteredMessages = dummyMessages.filter(
    (message) =>
      (message.message.toLowerCase().includes(searchQuery.toLowerCase()))
      || message.fileName && (message.fileName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const startRecording = async () => {
    setIsRecording(true);
    setIsRecordingComplete(false);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      setRecordedAudio(audioBlob);
      setIsRecordingComplete(true);
      audioChunksRef.current = [];
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const discardSelection = () => {
    setSelectedMessages(new Set());
    setIsSelecting(false);
    setMenuVisible(false);
  };

  const sendRecordedAudio = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setDummyMessages([
      ...dummyMessages,
      {
        sender: 'You',
        message: 'Sent a voice message',
        audio: recordedAudio,
        time,
        status: 'sent',
        replyTo: replyingTo,
      },
    ]);
    setRecordedAudio(null);
    setIsRecordingComplete(false);
    setNewMessage('');
    setReplyingTo(null);
  };

  const discardRecordedAudio = () => {
    setRecordedAudio(null);
    setIsRecordingComplete(false);
  };



  const getLastSeen = (lastSeen) => {
    const now = new Date();
    const lastSeenDate = new Date(lastSeen);
    const diffInMs = now - lastSeenDate;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return 'Online';
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days < 30) {
      return `${days}d ago`;
    } else {
      return lastSeenDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); // Fallback to full date
    }
  };


  const lastSeenTime = new Date(Date.now() - 0 * 60 * 60 * 1000).toISOString();

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 py-1 bg-gray-300 border-b border-gray-300 flex justify-between items-center" style={{ backgroundColor: '#ededed' }} >
        <div className="flex">
          <button onClick={onBack} className="md:hidden p-2 bg-gray-200 rounded-full mr-2">
            ←
          </button>
          <div className="font-bold flex items-center">
            <img
              src={`https://randomuser.me/api/portraits/men/14.jpg`}
              alt="User Avatar"
              className="mr-21 h-12 w-12 rounded-full object-cover me-3"
            />
            <div>
              {chat.name}
              <br />
              <span className="text-sm" style={{ fontSize: '13px', color: '#667781' }}>{getLastSeen(lastSeenTime)}</span> {/* Display last seen status */}
            </div>
          </div>
        </div>
        <div className='cursor-pointer' onClick={() => { setShowSearch(!showSearch) }} >
          {
            showSearch ?
              <RxCrossCircled size={20} color='red' />
              :
              <BiSearch size={20} color='#8d8d8d' />

          }
        </div>


        {/* <div className="space-x-2 relative">
          <button onClick={toggleMenu} className="p-2 bg-gray-200 rounded-full">
            ⋮
          </button>
          {menuVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <ul>
                <li onClick={handleSelect} className="p-2 hover:bg-gray-200 cursor-pointer">Select Messages</li>

                {
                  isSelecting &&

                  <>

                    <li onClick={handleDelete} className="p-2 hover:bg-gray-200 cursor-pointer">Delete</li>
                    <li onClick={handleForward} className="p-2 hover:bg-gray-200 cursor-pointer">Forward Messages</li>
                    <li onClick={discardSelection} className="p-2 hover:bg-gray-200 cursor-pointer">Discard Selection</li>
                  </>
                }
              </ul>
            </div>
          )}
        </div> */}
      </div>
      {
        showSearch &&
        <div className="relative flex w-full px-4 bg-white p-2">

          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-1 border rounded-lg focus:outline-none"
          />
          <BiSearch className="absolute left-7 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" size={20} color='#8d8d8d' />
          <button className="btn px-3 rounded mx-2 bg-green-500 text-white hover:bg-green-600" onClick={() => { setShowSearch(false) }}>
            Done
          </button>


        </div>
      }

      <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse"
        style={{
          backgroundImage: `url(${Wa_Bg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        {filteredMessages.reverse().map((msg, index) => (
          <OneMessage
            message={msg}
            handleReply={handleReply}
            lastMessage={
              (filteredMessages[index + 1] && msg.sender !== filteredMessages[index + 1].sender)}
          />))}
      </div>

      <div className="border-t p-4 py-2" style={{ backgroundColor: '#ededed' }}>
        {replyingTo && (
          <div className="flex items-center mb-2 p-2 bg-gray-100 rounded-lg px-5" style={{ borderLeft: '5px solid #06CF9C' }}>
            <div>
              <p className="text-sm " style={{ color: '#06CF9C' }}>{replyingTo.sender}</p>
              <p className="text-sm text-gray-500" style={{ width: '90%', maxHeight: '40px', overflow: 'hidden' }}>{replyingTo.message}</p>
            </div>
            <button onClick={cancelReply} className="ml-auto text-gray-500 hover:text-gray-700">✕</button>
          </div>
        )}
        <div className="flex items-center">
          <label htmlFor="fileInput" className="p-2 rounded-full cursor-pointer mx-1 ">
            <TiAttachment size={24} className="text-gray-600" />
          </label>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            style={{ borderRadius: '20px' }}
            rows="1"

            className="flex-1 border border-gray-300  px-4 py-2 mr-2 focus:outline-none resize-none overflow-auto"

          />
          <input type="file" onChange={handleMediaSend} className="hidden" id="fileInput" />
          {
            !isRecordingComplete &&
            <>

              {
                !newMessage &&

                <button onClick={isRecording ? stopRecording : startRecording} className="p-2 rounded-full">
                  {isRecording ? <FaStop className="text-red-500" /> :

                    <FiMic size={24} />


                  }
                </button>

              }
            </>

          }
          <div className="flex items-center">
            {isRecordingComplete && (
              <div className="flex space-x-2">
                <button onClick={sendRecordedAudio} className="p-2 bg-site text-white rounded-full">
                  <IoSend />
                </button>
                <button onClick={discardRecordedAudio} className="p-2 bg-red-500 text-white rounded-full">
                  <FaTrashAlt />
                </button>
              </div>
            )}
            {!isRecordingComplete && (
              newMessage &&
              <button onClick={handleSendMessage} className="p-2 bg-site text-white rounded-full mx-1">
                <IoSend />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
