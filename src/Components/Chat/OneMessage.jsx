import React, { useState, useEffect, useRef } from 'react';
import { BiCheck, BiCheckDouble } from 'react-icons/bi';
import { FaDownload } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { MdOutlineDownloading } from 'react-icons/md';
import { useAPI } from '../../Context/APIContext';
import { toast } from 'react-toastify';

const OneMessage = ({ message, handleDelete }) => {
    
    const [showMenu, setShowMenu] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [menuAbove, setMenuAbove] = useState(false);
    const {getUser}=useAPI();
    const menuRef = useRef(null);
    const messageRef = useRef(null);
    const isYou = message.senderId === getUser()?.id;
    const side = isYou ? 'justify-end' : 'justify-start';

    const bubbleColor = isYou ? '#153795' : 'white';
    const textColor = isYou ? 'white' : 'black';
    

    const renderStatusIcon = (status) => {
        switch (status) {
            case 'sent':
                return <BiCheck size={21} className="text-gray-100" />;
            case 'delivered':
                return <BiCheckDouble size={21} className="text-gray-100" />;
            case 'read':
                return <BiCheckDouble size={21} className="text-blue-500" />;
            default:
                return null;
        }
    };

    const statusIcon = renderStatusIcon(message.status);

    const handleRightClick = (event) => {
        event.preventDefault(); // Prevents the default right-click menu
        checkMenuPosition();
        setShowMenu(!showMenu);
    };

    const checkMenuPosition = () => {
        const messageRect = messageRef.current.getBoundingClientRect();
        const menuHeight = 200; // Adjust if your menu height changes
        const spaceBelow = window.innerHeight - messageRect.bottom;

        if (spaceBelow < menuHeight) {
            setMenuAbove(true);
        } else {
            setMenuAbove(false);
        }
    };
    
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(message?.message).then(
          () => {
            toast.success("Message Copied to Clip Board")
          },
          (err) => {
            console.error("Failed to copy text: ", err);
          }
        );
      };
    const handleMenuAction = (action) => {
        if (action === 'Delete') {
            handleDelete(message);
        }   
        else if(action === 'Copy'){
            copyToClipboard()
        }
        setShowMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const renderFile = () => {
        
        let fileName=message.message.split('/');
        fileName=fileName[fileName.length-1]
        const fileUrl=message.message;

        // Check if fileName and fileUrl are defined
        if (!fileName || !fileUrl) {
            return null; // Return nothing if file data is missing
        }

        const fileExtension = fileName.split('.').pop().toLowerCase();

        // If it's an image
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', }}>
                    {/* Image preview */}
                    <img
                        src={fileUrl}
                        alt={fileName}
                        style={{ maxWidth: '220px', maxHeight: '200px', marginBottom: '8px' }}
                    />

                    {/* Download link */}
                    <div className='flex justify-between items-center my-1 '  >
                        <div style={{color:textColor}}>{fileName}</div>


                        <a
                            href={fileUrl}
                            download={fileName}
                            style={{
                                textDecoration: 'none',
                                color:textColor
                            }}
                        >
                            <MdOutlineDownloading size={23} style={{ backgroundColor: 'transparent', color:textColor }} />
                        </a>
                    </div>

                </div>
            );
        }

        // If it's a video
        if (['mp4', 'avi', 'mov','webm'].includes(fileExtension)) {
            return (
                <video controls style={{ maxWidth: '250px', maxHeight: '200px' }}>
                    <source src={fileUrl} type={`video/${fileExtension}`} />
                    Your browser does not support the video element.
                </video>
            );
        }

        // For other file types (e.g., PDF, Word, etc.)
        return (
            <div className='flex justify-between items-center my-1 '  >
                <div style={{color:textColor}}>{fileName}</div>


                <a
                    href={fileUrl}
                    download={fileName}
                    className='mx-3'
                    style={{
                        textDecoration: 'none',
                        color: textColor

                    }}
                >
                    <MdOutlineDownloading size={23} style={{ backgroundColor: 'transparent' }} />
                </a>
            </div>
        );
    };
    const scrollToMessage = (id) => {
        const element = document.getElementById(`message-${id}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      };


    return (
        <div
            ref={messageRef}
            id={`message-${message.id}`}
            className={`flex w-full ${side} my-1 relative`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onContextMenu={handleRightClick}
        >
            {!isYou &&  (
                <span aria-hidden="true" data-icon="tail-out" className="flex items-end">
                    <svg style={{ transform: 'rotate(180deg)' }} viewBox="0 0 8 13" height="13" width="8">
                        <path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path>
                        <path fill={bubbleColor} d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path>
                    </svg>
                </span>
            )}
            <div
                className="px-4 py-2 rounded-lg relative"
                style={{ maxWidth: '70%',minWidth:'200px', backgroundColor: bubbleColor, borderBottomLeftRadius: !isYou ? '0px' : '5px', fontSize: '14.2px', color: '#111B21', position: 'relative' }}
            >
                    {
                        message?.employee &&
                        <div className="flex items-center mb-2 py-2 bg-gray-100 rounded-lg px-1 cursor-pointer" style={{ borderLeft: '5px solid #06CF9C' }} >
                            <div>
                                <p className="text-sm " style={{ color: '#06CF9C' }}>
                                    {message?.employee?.firstName} {message?.employee?.lastName}
                                </p>
                            
                            </div>
                        </div>
                    }
                
                {message.audio ? (
                    // Render audio player if there's a recorded audio
                    <audio controls style={{ width: '220px', maxHeight: '80vw' }}>
                        <source src={URL.createObjectURL(message.audio)} type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                ) : (
                    // Render file or text message if no audio
                    message.message.includes("https://res.cloudinary.com")
                    ?
                    renderFile() : <div style={{color:textColor}} >{message.message}</div>
                )}

                <div className='flex items-center justify-between'  >
                    <p className='m-0' style={{ fontSize: '11px', color: '#667781' }}>
                        {message.time}
                    </p>
                    {isYou && statusIcon}
                </div>

                {/* Top-right arrow dropdown icon (visible on hover) */}
                {hovered && (
                    <div
                        className='bg-white rounded p-1 absolute top-1 right-1 cursor-pointer shadow'
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRightClick(e);
                        }}
                    >
                        <IoIosArrowDown size={12} />
                    </div>
                )}

                {showMenu && (
                    <div
                        ref={menuRef}
                        className={`absolute ${menuAbove ? 'bottom-full mb-1' : 'top-full mt-1'} right-0 bg-white shadow-lg rounded-md text-gray-700 z-10 border border-gray-300`}
                        style={{ width: '150px', maxHeight: '200px', overflowY: 'auto', marginTop: menuAbove ? '-10px' : '' }}
                    >
                        <ul className="text-sm">

                            <li className="py-1 px-4 hover:bg-gray-200 cursor-pointer" onClick={() => handleMenuAction('Copy')}>Copy</li>
                            <li className="py-1 px-4 hover:bg-gray-200 cursor-pointer" onClick={() => handleMenuAction('Delete')}>Delete</li>
                        </ul>
                    </div>
                )}
            </div>
            {isYou && (
                <span aria-hidden="true" data-icon="tail-out" className="flex items-end">
                    <svg style={{ transform: 'rotate(270deg)', marginBottom: '-2px', marginLeft:'-2px' }} viewBox="0 0 8 13" height="13" width="8">
                        <path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path>
                        <path fill={bubbleColor} d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path>
                    </svg>
                </span>
            )}
        </div>
    );
};

export default OneMessage;
