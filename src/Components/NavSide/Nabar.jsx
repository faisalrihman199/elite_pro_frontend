import React, { useState, useRef, useEffect } from 'react';
import { FaBell, FaUserCircle, FaSignOutAlt, FaCogs, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAPI } from '../../Context/APIContext';

const Navbar = ({ userName }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState(1); // Example notification count
    const dropdownRef = useRef(null);
    const navigate=useNavigate();
    const {getUser}=useAPI();
    const user=getUser();
    const onLogout = () => {
        localStorage.removeItem('user')
        navigate('/');
      }
    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="sm:fixed top-0 left-0 right-0 md:bg-white sm:site-bg shadow-sm md:p-3 p-2 flex justify-between items-center z-10">
            {/* Logo or App Name */}
            <div className="text-xl font-bold text-blue-600"></div>

            {/* User Info and Icons */}
            <div className="flex items-center space-x-6 ">
                {/* Logged-in User's Name */}
                <span className="md:text-gray-700 font-medium text-white">{user?.name}</span>

                {/* Notification Icon */}
                <div className="relative">
                    <FaBell className="md:text-gray-600 w-6 h-6 cursor-pointer text-white" />
                    {unreadNotifications > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {unreadNotifications}
                        </span>
                    )}
                </div>

                {/* Profile Icon with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <FaUserCircle
                        className="md:text-gray-600 w-8 h-8 cursor-pointer text-white"
                        onClick={toggleDropdown}
                    />
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
                            <ul className="py-2">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                    <FaCogs className="mr-2" /> Settings
                                </li>
                                {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                    <FaEnvelope className="mr-2" /> Messages
                                </li> */}
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-red-500"
                                    onClick={onLogout}
                                >
                                    <FaSignOutAlt className="mr-2" /> Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
