import React, { useEffect, useRef, useState } from 'react';
import { 
  FaBullhorn, 
  FaDesktop, 
  FaEnvelope, 
  FaGlobe, 
  FaLink, 
  FaTimesCircle, 
  FaUsers, 
  FaSignOutAlt, 
  FaCogs,
  FaUserCircle,
  FaBell
} from 'react-icons/fa';
import SideIcon from "../../assets/Icons/sideIcon.svg"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoProject, GoTasklist } from 'react-icons/go';
import { VscFileSubmodule } from 'react-icons/vsc';
import { GiProgression } from 'react-icons/gi';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { BsMicrosoftTeams } from 'react-icons/bs';
import { useAPI } from '../../Context/APIContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState(1); // Example notification count
    const dropdownRef = useRef(null);
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
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const navigate=useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/');
  }
  
  
  const isActiveLink = (path) => location.pathname === path;

  return (
    <div>
      <style>
        {`
          .active-link {
            background-color: rgba(200, 200, 200, 0.3); 
            border-radius: 13px; 
          }
        `}
      </style>

      <div className="flex justify-between items-center sm:hidden sm:bg-site fixed z-10 " style={{
        background: 'linear-gradient(to right, #0a1e68, #153795)',
        width:'100vw'
      }}>
        <button
          onClick={toggleSidebar}
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
          
        </button>
        
        <div>
        <Link to="/" className="flex items-center mx-2">
          <span className="md:text-gray-700  font-medium text-white">{user?.name}</span>
        </Link>
        </div>
        <div className="flex items-center  space-x-6  px-2">
                {/* Logged-in User's Name */}
                

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
        {/* <button
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={handleLogout}
        
        >
          <FaSignOutAlt size={24} />
          <span className="sr-only">Logout</span>
        </button> */}
      </div>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen z-10 transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto" style={{
          background: 'linear-gradient(to right, #0a1e68, #153795)'
        }}>
          {isOpen && 
            <div className="flex justify-end">
              <FaTimesCircle color='white' onClick={toggleSidebar} />
            </div>
          }
          <Link to="/" className="flex items-center mb-5">
            <img src={SideIcon} alt="" />
          </Link>
          <ul className="space-y-2 font-medium">
          <li>
              <Link
                to="/dashboard"
                className={`flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group ${isActiveLink('/dashboard') ? 'active-link' : ''}`}
              >
                <MdOutlineDashboardCustomize size={25} />
                <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  {sidebardata?.total_messages}
                </span> */}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/employees"
                className={`flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group ${isActiveLink('/dashboard/employees') ? 'active-link' : ''}`}
              >
                <FaUsers size={25} />
                <span className="flex-1 ms-3 whitespace-nowrap">Employees</span>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  
                </span> */}
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/teams"
                className={`flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group ${isActiveLink('/dashboard/teams') ? 'active-link' : ''}`}
              >
                <BsMicrosoftTeams size={25} />
                <span className="flex-1 ms-3 whitespace-nowrap">Teams</span>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  {sidebardata?.total_visitors}
                </span> */}
              </Link>
            </li>
           
            <li>
              <Link
                to="/dashboard/projects"
                className={`flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group ${isActiveLink('/dashboard/projects') ? 'active-link' : ''}`}
              >
                <GoProject size={25} />
                <span className="flex-1 ms-3 whitespace-nowrap">Projects</span>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  {sidebardata?.total_visitors}
                </span> */}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/tasks"
                className={`flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group ${isActiveLink('/dashboard/tasks') ? 'active-link' : ''}`}
              >
                <GoTasklist size={25} />
                <span className="flex-1 ms-3 whitespace-nowrap">Tasks</span>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  {sidebardata?.advertiser_count}
                </span> */}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/modules"
                className={`flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group ${isActiveLink('/dashboard/modules') ? 'active-link' : ''}`}
              >
                <VscFileSubmodule size={25} />
                <span className="flex-1 ms-3 whitespace-nowrap">Modules</span>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                {sidebardata?.space_host_count}
                </span> */}
              </Link>
            </li>
            {/* <li>
              <Link
                to="/dashboard/reports"
                className={`flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group ${isActiveLink('/dashboard/reports') ? 'active-link' : ''}`}
              >
                <GiProgression size={25} />
                <span className="flex-1 ms-3 whitespace-nowrap">Progress</span>
                
              </Link>
            </li> */}
            <li>
              <Link
                to="/chat "
                className={`flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group ${isActiveLink('/dashboard/messages') ? 'active-link' : ''}`}
              >
                <FaEnvelope size={25} />
                <span className="flex-1 ms-3 whitespace-nowrap">Messages</span>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  {sidebardata?.total_messages}
                </span> */}
              </Link>
            </li>
          </ul>

          {/* Logout button at the bottom */}
          <div className="absolute bottom-0 w-full">
            <button
              className="flex items-center p-2 mt-4 mb-4 text-sm text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              onClick={handleLogout}
            >
              <FaSignOutAlt size={24} />
              <span className="flex-1 ms-3 whitespace-nowrap"  >Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
