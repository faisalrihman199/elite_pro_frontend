import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaComments, FaStar, FaArchive, FaUsers, FaRegEdit } from 'react-icons/fa';
import ShowChats from './ShowChats';
import GroupModal from './GroupModal';
import { BsChatSquareText, BsFilterCircle } from 'react-icons/bs';
import { HiOutlineUsers } from 'react-icons/hi';
import { GoArchive } from 'react-icons/go';
import { IoIosStarOutline } from 'react-icons/io';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { BiSearch } from 'react-icons/bi';
import Contacts from '../Contacts/Contacts';
import { MdOutlineArrowBackIos, MdOutlineDashboardCustomize } from 'react-icons/md';
import { CiCamera } from 'react-icons/ci';
import { LuCamera } from 'react-icons/lu';
import { TbMessage2 } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useSocket } from '../../Context/SocketContext';


const AllChat = ({ chats, onChatSelect, onChatDelete,setNewChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState([]);
  const [activeTab, setActiveTab] = useState('Chats');
  const [menuVisible, setMenuVisible] = useState(false);
  const isMobile = window.innerWidth <= 768
  const editMenuLeft = isMobile ? '5%' : '40%';
  const [grouping, setGrouping] = useState(false);
  const [createGroup, setCreate] = useState(false);
  const [newGroup, setNewGroup] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [groupIcon, setGroupIcon] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [contacts, setContacts] = useState();
  const {contactList}=useSocket();
  useEffect(()=>{
    contactList()
    .then((res)=>{
      setContacts(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])



  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setGroupIcon(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };


  const toggleContactInGroup = (contactId) => {
    setNewGroup((prevGroup) =>
      prevGroup.includes(contactId)
        ? prevGroup.filter(id => id !== contactId)
        : [...prevGroup, contactId]
    );
  };
  const filteredChats = chats?.filter(
    (chat) =>
      activeTab === 'Chats' &&
      (chat?.otherUser?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat?.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const filteredContacts = contacts?.filter((contact) => {
    if (createGroup) {
      return newGroup.includes(contact.id);
    } else {
      return contact?.name.toLowerCase().includes(searchInput.toLowerCase());
    }
  });
  

  const menuRef = useRef(null);

  const handleChatMenu = () => {
    
    setMenuVisible(!menuVisible);
  };
  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const hanldeNewGroup = () => {
    if (newGroup.length > 0) {
      console.log("Add Following contacts to a group :", newGroup);
      setGrouping(false);
      setCreate(true);
    }
  }
  const handleCreateGroup = () => {
    console.log(`Please Create Group with followings :${groupName} :`, groupIcon, newGroup);

  }
  
 

  return (
    <div className="flex w-full" style={{ backgroundColor: '#153795' }}>
      <style>
        {`
          .active-link {
            background-color: rgba(200, 200, 200, 0.3); 
            border-radius: 13px; 
          }
        `}
      </style>
      <div className="p-4 w-16 flex flex-col items-center border-r border-gray-300">
      <button title='Go to Dashboard' onClick={() => setActiveTab('dashboard')} className={`p-2 mb-4 ${activeTab === 'dashboard' ? 'active-link' : ''}`}>
        <Link to={'/dashboard'} >
        <MdOutlineDashboardCustomize size={24} color='white' />
        
        </Link>

        </button>
        <button onClick={() => setActiveTab('Chats')} className={`p-2 mb-4 ${activeTab === 'Chats' ? 'active-link' : ''}`}>
        <TbMessage2 size={24} color='white' />

        </button>
        
        <button onClick={() => setActiveTab('Groups')} className={`p-2 mb-4 ${activeTab === 'Groups' ? 'active-link' : ''}`}>
          <HiOutlineUserGroup size={24} color='white' />
        </button>
        
        <button onClick={() => setActiveTab('Starred')} className={`p-2 mb-4 ${activeTab === 'Starred' ? 'active-link' : ''}`}>
          <IoIosStarOutline size={24} color='white' />
        </button>
      </div>

      <div className="flex-1 bg-white flex flex-col relative border-r border-gray-300">
        <div className="p-3 px-5 bg-white flex justify-between items-center">
          <div className="font-bold text-2xl">{activeTab}</div>
          <div className="flex flex-row">
            {activeTab === 'Chats' && (
              <>
                <FaRegEdit
                  className="cursor-pointer"
                  color="#8d8d8d"
                  size={22}
                  onClick={handleChatMenu}
                />
                <BsFilterCircle
                  color="#8d8d8d"
                  size={22}
                  className="mx-3 cursor-pointer"
                  onClick={() => setActiveTab('Unread Messages')} 
                />
                {menuVisible && (

                  <div
                    ref={menuRef}
                    className="absolute top-12 p-3 right-20 border border-gray-300 shadow-lg rounded-md z-10"
                    style={{ backgroundColor: '#ededed', width: isMobile ? '90%' : '80%', left: editMenuLeft, maxHeight: '88vh' }}
                  >
                    <ul>
                      <div className={`flex items-center justify-${grouping || createGroup ? 'between' : 'center'}`} >
                        {
                          grouping ?
                            <MdOutlineArrowBackIos size={18} color='#008069' className='cursor-pointer' onClick={() => { setGrouping(false) }} />
                            :
                            createGroup &&
                            <span
                              className={`mx-4 cursor-pointer`}
                              style={{ color: newGroup.length === 0 ? '#A0A0A0' : '#008069' }}
                              onClick={() => { setGrouping(true); setCreate(false); }}
                            >
                              Back
                            </span>

                        }
                        <div className={`text-center text-sm font-bold ${grouping ? 'mt-2' : ''}`} >
                          {
                            grouping ?
                              'Add members' :
                              'New Chat'
                          }
                          <div className='text-gray-400 text-xs ' >
                            {grouping &&
                              `${newGroup.length}/128`
                            }
                          </div>

                        </div>
                        {
                          grouping ?
                            <span
                              className={`mx-4 cursor-pointer`}
                              style={{ color: newGroup.length === 0 ? '#A0A0A0' : '#008069' }}
                              onClick={hanldeNewGroup}
                            >
                              Next
                            </span>
                            :
                            createGroup &&
                            <span
                              className={`mx-4 cursor-pointer`}
                              style={{ color: newGroup.length === 0 ? '#A0A0A0' : '#008069' }}
                              onClick={handleCreateGroup}

                            >
                              Create
                            </span>

                        }

                      </div>
                      {
                        createGroup ?
                          <div className="relative flex flex-col w-full px-1 bg-white border rounded-md my-2 py-3">
                            <div className="flex items-center relative">
                              <input
                                type="text"
                                placeholder="Group Name"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                className="w-full pl-14 text-sm p-1 border-none rounded-md focus:outline-none"
                              />

                              {/* Camera Icon */}
                              <div
                                onClick={handleCameraClick}
                                className={`absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full cursor-pointer ${selectedImage ? 'bg-transparent' : 'bg-gray-200'}`}
                              >
                                <LuCamera className="text-gray-300" size={25} />
                              </div>

                              {/* Hidden File Input */}
                              <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                              />

                              {/* Image and Camera Icon Overlapping */}
                              {selectedImage && (
                                <img
                                  src={selectedImage}
                                  onClick={handleCameraClick}
                                  alt="Selected"
                                  className="h-10 w-10 object-cover rounded-full absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cutsor-pointer"
                                />
                              )}
                            </div>
                          </div>

                          :
                          <div className="relative flex w-full px-1 bg-white border rounded-md my-2 ">
                            <input
                              type="text"
                              placeholder={grouping ? 'Search name or member' : 'Search'}
                              value={searchInput}

                              onChange={(e) => setSearchInput(e.target.value)}
                              className="w-full pl-10 text-sm p-1 border-none rounded-lg focus:outline-none"
                            />
                            <BiSearch className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" size={20} color='#8d8d8d' />
                          </div>

                      }

                      {
                        !grouping && !createGroup &&
                        <div className='flex w-full p-3 bg-white rounded-md  items-center my-2 text-sm cursor-pointer' onClick={() => { setGrouping(true) }}  >
                          <span>

                            <HiOutlineUsers size={18} color='#008069' />
                          </span>

                          <span className='mx-4' style={{ color: '#008069' }} >
                            New group
                          </span>
                        </div>

                      }
                      {
                        grouping && newGroup.length > 0 &&
                        <div className='flex w-full p-3 bg-white rounded-md  items-center my-2 text-sm ' >
                        </div>
                      }
                      <div>
                        <p className=' text-sm text-gray-500 my-3 ms-1 font-bold' >
                          {createGroup ?
                            'Selected ' :
                            'Available '
                          }
                          Contacts
                        </p>
                      </div>
                      <div className="my-2 bg-white rounded-md p-2 scroll-auto " style={{ maxHeight: '46vh', overflow: 'auto' }}>
                        <Contacts newGroup={newGroup} setNewChat={setNewChat} contacts={filteredContacts} grouping={grouping} toggleContactInGroup={toggleContactInGroup} />
                      </div>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="relative w-full px-4 bg-white">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-2 border rounded-lg focus:outline-none"
          />
          <BiSearch className="absolute left-7 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 " size={20} color="#8d8d8d" />
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'Chats' && <ShowChats chats={filteredChats} activeTab={activeTab} onChatSelect={onChatSelect} />}
          {activeTab === 'Groups' && (
            <ShowChats chats={groups.flatMap((group) => group.chats)} activeTab={activeTab} />
          )}
         
          {activeTab === 'Starred' && (
            <ShowChats chats={groups.flatMap((group) => group.chats)} activeTab={activeTab} />
          )}
          {activeTab === 'Unread Messages' && (
            <ShowChats chats={archivedChats} activeTab={activeTab} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllChat;
