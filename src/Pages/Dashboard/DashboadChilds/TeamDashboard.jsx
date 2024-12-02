import React, { useEffect, useState } from 'react';
import { FaTimes, FaUsers } from 'react-icons/fa';
import RegularCard from '../../../Components/Dashboards/ChildDashboard/RegularCard';
import RoundedBarChart from '../../../Components/Dashboards/ChildDashboard/Analytics/RoundedBarChart';
import { MdOutlineSwitchAccessShortcutAdd, } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { BsMicrosoftTeams } from 'react-icons/bs';
import { TbMedicalCrossOff, TbUsersPlus } from 'react-icons/tb';
import AddTeam from '../../../Components/Team/AddTeam';
import TeamCard from '../../../Components/Team/TeamCard';

const TeamDashboard = () => {
    const [selectedOption, setSelectedOption] = useState('monthly');
    const [isModalOpen, setIsModalOpen] = useState(false); // state to control the modal visibility
    const [searchValue, setSearchValue] = useState("");

    const total = [
        { name: "Jan", value: 450 },
        { name: "Feb", value: 1200 },
        { name: "Mar", value: 800 },
        { name: "Apr", value: 1500 },
        { name: "May", value: 670 },
        { name: "Jun", value: 1900 },
        { name: "Jul", value: 360 },
        { name: "Aug", value: 1420 },
        { name: "Sep", value: 720 },
        { name: "Oct", value: 1750 },
        { name: "Nov", value: 890 },
        { name: "Dec", value: 540 },
    ];

    const working = [
        { name: "Jan", value: 1320 },
        { name: "Feb", value: 780 },
        { name: "Mar", value: 640 },
        { name: "Apr", value: 1150 },
        { name: "May", value: 1420 },
        { name: "Jun", value: 430 },
        { name: "Jul", value: 1990 },
        { name: "Aug", value: 1530 },
        { name: "Sep", value: 930 },
        { name: "Oct", value: 1370 },
        { name: "Nov", value: 620 },
        { name: "Dec", value: 820 },
    ];

    const free = [
        { name: "Jan", value: 720 },
        { name: "Feb", value: 1360 },
        { name: "Mar", value: 420 },
        { name: "Apr", value: 1520 },
        { name: "May", value: 1890 },
        { name: "Jun", value: 380 },
        { name: "Jul", value: 1070 },
        { name: "Aug", value: 1240 },
        { name: "Sep", value: 460 },
        { name: "Oct", value: 890 },
        { name: "Nov", value: 1940 },
        { name: "Dec", value: 1560 },
    ];
    const teamsData = [
        {
            name: 'Marketing Team',
            employees: [
                { name: 'John Doe', profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg' },
                { name: 'Jane Smith', profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg' },
                { name: 'Samantha Brown', profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg' },
                { name: 'Michael Johnson', profilePicture: 'https://randomuser.me/api/portraits/men/2.jpg' },
                { name: 'David White', profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg' },
                { name: 'Emily Green', profilePicture: 'https://randomuser.me/api/portraits/women/3.jpg' },
            ]
        },
        {
            name: 'Engineering Team',
            employees: [
                { name: 'Alice Williams', profilePicture: 'https://randomuser.me/api/portraits/women/4.jpg' },
                { name: 'Bob Brown', profilePicture: 'https://randomuser.me/api/portraits/men/4.jpg' },
                { name: 'Charlie Davis', profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg' },
                { name: 'Diana Wilson', profilePicture: 'https://randomuser.me/api/portraits/women/5.jpg' },
                { name: 'Ethan Harris', profilePicture: 'https://randomuser.me/api/portraits/men/6.jpg' },
                { name: 'Grace Lee', profilePicture: 'https://randomuser.me/api/portraits/women/6.jpg' },
            ]
        },
        {
            name: 'Sales Team',
            employees: [
                { name: 'James Taylor', profilePicture: 'https://randomuser.me/api/portraits/men/7.jpg' },
                { name: 'Olivia Martin', profilePicture: 'https://randomuser.me/api/portraits/women/7.jpg' },
                { name: 'Lucas Walker', profilePicture: 'https://randomuser.me/api/portraits/men/8.jpg' },
                { name: 'Sophia King', profilePicture: 'https://randomuser.me/api/portraits/women/8.jpg' },
                { name: 'Benjamin Scott', profilePicture: 'https://randomuser.me/api/portraits/men/9.jpg' },
                { name: 'Charlotte Young', profilePicture: 'https://randomuser.me/api/portraits/women/9.jpg' },
            ]
        },
        {
            name: 'Design Team',
            employees: [
                { name: 'Megan Adams', profilePicture: 'https://randomuser.me/api/portraits/women/10.jpg' },
                { name: 'Ryan Clark', profilePicture: 'https://randomuser.me/api/portraits/men/10.jpg' },
                { name: 'Lily Martinez', profilePicture: 'https://randomuser.me/api/portraits/women/11.jpg' },
                { name: 'Daniel Garcia', profilePicture: 'https://randomuser.me/api/portraits/men/11.jpg' },
                { name: 'Matthew Perez', profilePicture: 'https://randomuser.me/api/portraits/men/12.jpg' },
                { name: 'Ava Hernandez', profilePicture: 'https://randomuser.me/api/portraits/women/12.jpg' },
            ]
        },
        {
            name: 'HR Team',
            employees: [
                { name: 'Zoe Lewis', profilePicture: 'https://randomuser.me/api/portraits/women/13.jpg' },
                { name: 'Oscar Martinez', profilePicture: 'https://randomuser.me/api/portraits/men/13.jpg' },
                { name: 'Hannah Walker', profilePicture: 'https://randomuser.me/api/portraits/women/14.jpg' },
                { name: 'Jackson Green', profilePicture: 'https://randomuser.me/api/portraits/men/14.jpg' },
                { name: 'Isla King', profilePicture: 'https://randomuser.me/api/portraits/women/15.jpg' },
                { name: 'Noah Perez', profilePicture: 'https://randomuser.me/api/portraits/men/15.jpg' },
            ]
        },
        {
            name: 'Product Team',
            employees: [
                { name: 'Chloe Scott', profilePicture: 'https://randomuser.me/api/portraits/women/16.jpg' },
                { name: 'Samuel Evans', profilePicture: 'https://randomuser.me/api/portraits/men/16.jpg' },
                { name: 'Grace Thomas', profilePicture: 'https://randomuser.me/api/portraits/women/17.jpg' },
                { name: 'Aiden Hall', profilePicture: 'https://randomuser.me/api/portraits/men/17.jpg' },
                { name: 'Harper Allen', profilePicture: 'https://randomuser.me/api/portraits/women/18.jpg' },
                { name: 'Matthew Nelson', profilePicture: 'https://randomuser.me/api/portraits/men/18.jpg' },
            ]
        },
    ];

    
    // Function to toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className='p-8'>
            <div className="flex justify-between">
                <h1 className='text-2xl font-semibold my-2'>Teams Dashboard</h1>
                <button
                    className=' bg-site focus:ring-4 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:outline-none text-white font-medium rounded-lg text-sm px-5 text-center flex items-center'
                    onClick={toggleModal}
                >
                    <TbUsersPlus size={25} style={{ fontWeight: 'bold' }} />
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                <RegularCard
                    data={{
                        icon: BsMicrosoftTeams,
                        bgColor: '#0428f28f',
                        heading: 'Total Teams',
                        para: 3000
                    }}
                />
                <RegularCard
                    data={{
                        icon: MdOutlineSwitchAccessShortcutAdd,
                        bgColor: '#2ca907a8',
                        heading: 'Working Teams',
                        para: 2560
                    }}
                />
                <RegularCard
                    data={{
                        icon: TbMedicalCrossOff,
                        bgColor: '#f22c36',
                        heading: 'Inactive Teams',
                        para: 440
                    }}
                />
            </div>
            <div className="my-4">
                <div className="flex justify-between items-center">
                    <h3 className='text-xl font-semibold'>Messages Reports</h3>
                    <select
                        className="border border-gray-100 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={selectedOption} // Bind the state to the dropdown
                        onChange={(e) => setSelectedOption(e.target.value)} // Update state on change
                    >
                        <option value="all">All</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
            </div>
            <div className="my-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 my-4">
                    <div className="p-4 ">
                        <h2 className='text-lg ms-3 font-semibold'>
                            All Teams
                        </h2>
                        <RoundedBarChart data={total} />
                    </div>
                    <div className="p-4 ">
                        <h2 className='text-lg ms-3 font-semibold'>
                            Working Teams
                        </h2>
                        <RoundedBarChart data={working} />
                    </div>
                    <div className="p-4 ">
                        <h2 className='text-lg ms-3 font-semibold'>
                            Free Teams
                        </h2>
                        <RoundedBarChart data={free} />
                    </div>
                </div>
            </div>
            <div className="my-4">
            <div className="flex justify-between">
                    <h3 className='text-xl font-semibold'>Teams List</h3>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="rounded-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-5 pl-3 flex items-center " onClick={() => { setChange(!change) }} style={{ cursor: 'pointer' }} >
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                    </div>

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {teamsData.map((team, index) => (
                        <TeamCard key={index} team={team}  />
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <AddTeam toggleModal={toggleModal} />
            )}
        </div>
    );
}

export default TeamDashboard;
