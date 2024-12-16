import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaUser, FaCheck, FaRegCheckCircle, FaTrashAlt, FaPaperPlane, FaReply } from 'react-icons/fa';
import { TiAttachment } from 'react-icons/ti';
import Wa_Bg from "../../assets/Chat/wa_bg.jpg";
import { BiCheck, BiCheckDouble, BiSearch } from 'react-icons/bi';
import { IoSend } from 'react-icons/io5';
import { FiMic } from 'react-icons/fi';
import OneMessage from './OneMessage';
import { RxCrossCircled } from 'react-icons/rx';
import { useAPI } from '../../Context/APIContext';
import { useSocket } from '../../Context/SocketContext';
import emptyBox from '../../assets/Chat/emptyBox.jpg';
import { toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';
const ChatArea = ({ chat, onBack, isGroup }) => {

  console.log("Chat is:", chat);

  const oldChat = chat?.otherUser;



  const conversation = oldChat ? chat.id : null;

  let [otherUser, setOtherUser] = useState(oldChat || chat)
  useEffect(() => {
    if (oldChat) {
      setOtherUser(oldChat)
    }
    else {
      setOtherUser(chat)
    }
    setMessages([]);
  }, [chat])

  console.log("Other User is :", otherUser);

  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(1);
  const [messages, setMessages] = useState([]);
  const [isSending, setSending] = useState(false);
  const { oneConversation, newMessageData } = useSocket();
  useEffect(() => {
    console.log("New Message Received :", newMessageData);
  }, [newMessageData])
  useEffect(() => {
    const endpoint = isGroup ? 'getGroupChat' : 'getOneConversation'
    if (conversation) {
      oneConversation(conversation, endpoint)
        .then((res) => {
          console.log("One Conversation is :", res);
          setMessages(res?.data?.messages);
          setOtherUser(res?.data?.otherUser);

          
        })
        .catch((err) => {
          console.log("One Conversation is error :", err);
        })
        .finally(()=>{
          setLoading(0)
        })
    }
  }, [conversation, change, newMessageData,isGroup])
  useEffect(() => {
    setLoading(1);
  }, [chat])




  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [isRecordingComplete, setIsRecordingComplete] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const { getFilesPath, getUser } = useAPI();
  const user = getUser();
  const { sendMessage, activeConversation, deleteMessage } = useSocket();
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      // Event triggered when file is successfully read
      reader.onload = () => {
        const base64String = `data:${file.type};base64,${reader.result.split(",")[1]}`;
        resolve(base64String); // Resolve the Base64 string
      };
      // Event triggered if there's an error during file reading
      reader.onerror = (error) => {
        reject(`Error converting file to Base64: ${error}`);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    });
  };
 

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      console.log("Please send new Message :", newMessage);
      setSending(true);
      await sendMessage(newMessage, user?.id, otherUser?.userId,null,isGroup);
      setSending(false);
      setNewMessage('');
      setChange(!change)
    }
  };
  const handleDelete = (message) => {
    deleteMessage(message.id)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          setChange(!change)
        }
        else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log("Error :", err);
        toast.error(err.response.data.message || "Failed to delete message")
      })
  };
  const handleMediaSend = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const fileUrl = URL.createObjectURL(file);
      const fileBase64 = await getBase64(file);
      setSending(true);
      await sendMessage(null, user?.id, otherUser?.userId, fileBase64,isGroup);
      setSending(false);
      setNewMessage('');
      setReplyingTo(null);
      setChange(!change);
    }
  };
  const filteredMessages = messages.filter(
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
  const sendRecordedAudio = async () => {
    setSending(true);
    const base64String = await getBase64(recordedAudio);
    await sendMessage(null, user?.id, otherUser?.userId, base64String, isGroup);
    setSending(false);
    setRecordedAudio(null);
    setIsRecordingComplete(false);
    setNewMessage('');
    setReplyingTo(null);
    setChange(!change);

  };

  const discardRecordedAudio = () => {
    setRecordedAudio(null);
    setIsRecordingComplete(false);
  };



  const getLastSeen = (lastSeen) => {
    if (!lastSeen) {
      return 'Unknown';
    }
    if (lastSeen === 'Online') {
      return 'Online';
    }
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





  return (
    Object.keys(chat).length > 0 ?
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="p-4 py-1 bg-gray-300 border-b border-gray-300 flex justify-between items-center" style={{ backgroundColor: '#ededed' }} >
          <div className="flex">
            <button onClick={onBack} className="md:hidden p-2 bg-gray-200 rounded-full mr-2">
              ←
            </button>
            <div className="font-bold flex items-center">
              <img
                src={otherUser?.profile_image ? getFilesPath(otherUser.profile_image) : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwGsNv23K5shKblMsKePA8o6M2kqBH39PZqA&s`}
                alt="User Avatar"
                className="mr-21 h-12 w-12 rounded-full object-cover me-3"
              />
              <div>

                {otherUser?.name}
                <br />
                <span className="text-sm" style={{ fontSize: '13px', color: '#667781' }}>
                  {
                    !isGroup ?
                      getLastSeen(otherUser?.lastSeen) :
                      otherUser?.names?.map((nm, index) => (
                        <span key={index}>{nm}{index < otherUser.names.length - 1 ? ', ' : ''}</span>
                      ))
                  }
                </span>

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

        {
          loading === 1 ?
            <div className="flex justify-center items-center flex-1 overflow-y-auto p-4 flex flex-col-reverse">
              <FadeLoader color='black' size={40} />
            </div>
            :
            <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse"
              style={{
                backgroundImage: `url(${Wa_Bg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            >
              {
                isSending &&
                <OneMessage
                  message={{ message: "Sending ...", senderId: getUser()?.id }}
                  handleDelete={handleDelete}



                />
              }
              {filteredMessages.reverse().map((msg, index) => (
                <OneMessage
                  message={msg}
                  handleDelete={handleDelete}

                />))}

            </div>}

        <div className="border-t p-4 py-2" style={{ backgroundColor: '#ededed' }}>
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
      :
      <div className="h-full w-full flex justify-center items-center bg-gray-100">
        <img src={emptyBox} alt="" />
      </div>
  );
};

export default ChatArea;
