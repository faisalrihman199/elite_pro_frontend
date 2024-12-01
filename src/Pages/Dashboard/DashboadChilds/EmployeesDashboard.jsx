import React, { useEffect, useState } from 'react';
import {  FaUsers } from 'react-icons/fa';
import RegularCard from '../../../Components/Dashboards/ChildDashboard/RegularCard';
import RoundedBarChart from '../../../Components/Dashboards/ChildDashboard/Analytics/RoundedBarChart';
import { MdOutlineWorkHistory } from 'react-icons/md';
import { BiNotificationOff } from 'react-icons/bi';
import { LiaUserPlusSolid } from 'react-icons/lia';
import { FaUserPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import EmployeeCard from '../../../Components/Employee/EmployeeCard';
const EmployeesDashboard = () => {
    const [selectedOption, setSelectedOption] = useState('monthly'); 
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
      const employees = [
        {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            department: 'Engineering',
            designation: 'Software Engineer',
            profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'janesmith@example.com',
            department: 'Marketing',
            designation: 'Marketing Manager',
            profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
        {
            id: 3,
            name: 'Samuel Green',
            email: 'samuelgreen@example.com',
            department: 'Human Resources',
            designation: 'HR Manager',
            profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg',
        },
        {
            id: 4,
            name: 'Emily Johnson',
            email: 'emilyjohnson@example.com',
            department: 'Finance',
            designation: 'Financial Analyst',
            profilePicture: 'https://randomuser.me/api/portraits/women/4.jpg',
        },
        {
            id: 5,
            name: 'Michael Brown',
            email: 'michaelbrown@example.com',
            department: 'IT',
            designation: 'System Administrator',
            profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg',
        },
        {
            id: 6,
            name: 'Sophia Wilson',
            email: 'sophiawilson@example.com',
            department: 'Design',
            designation: 'UI/UX Designer',
            profilePicture: 'https://randomuser.me/api/portraits/women/6.jpg',
        },
        {
            id: 7,
            name: 'David Lee',
            email: 'davidlee@example.com',
            department: 'Operations',
            designation: 'Operations Manager',
            profilePicture: 'https://randomuser.me/api/portraits/men/7.jpg',
        },
        {
            id: 8,
            name: 'Olivia Martinez',
            email: 'oliviamartinez@example.com',
            department: 'Sales',
            designation: 'Sales Executive',
            profilePicture: 'https://randomuser.me/api/portraits/women/8.jpg',
        },
        {
            id: 9,
            name: 'James Taylor',
            email: 'jamestaylor@example.com',
            department: 'Legal',
            designation: 'Legal Advisor',
            profilePicture: 'https://randomuser.me/api/portraits/men/9.jpg',
        },
       
    ];
    const handleViewDetails = (employee) => {
        console.log("Show Details of employee :", employee);
        
    };
      
  return (
    <div className='p-8' >
        <div className="flex justify-between">

        <h1 className='text-2xl font-semibold my-2'>Employees Dashboard</h1>
        <Link to='/dashboard/add_employee' className=' bg-site focus:ring-4 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:outline-none text-white font-medium rounded-lg text-sm px-5  text-center flex items-center' >
            <FaUserPlus size={25} style={{fontWeight:'bold'}} />
        </Link>
        </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                <RegularCard
                    data={{
                        icon: FaUsers,
                        bgColor: '#0428f28f',
                        heading: 'Total Employees',
                        para: 3000
                    }}
                />
                <RegularCard
                    data={{
                        icon:MdOutlineWorkHistory                    ,
                        bgColor: '#2ca907a8',
                        heading: 'Active Employees',
                        para: 2560
                    }}
                />
                <RegularCard
                    data={{
                        icon: BiNotificationOff,
                        bgColor: '#f22c36',
                        heading: 'Inactive Employees',
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
                            All Employees
                        </h2>
                        <RoundedBarChart data={total} />
                    </div>
                    <div className="p-4 ">
                        <h2 className='text-lg ms-3 font-semibold'>
                            Working Employees
                        </h2>
                        <RoundedBarChart data={working} />
                    </div>
                    <div className="p-4 ">
                        <h2 className='text-lg ms-3 font-semibold'>
                            Free Employees
                        </h2>
                        <RoundedBarChart data={free} />
                    </div>
                </div>
            </div>
            <div className="my-4">
                <div className="flex justify-between">
                    <h3 className='text-xl font-semibold'>Employees List</h3>
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
                {employees.map((employee) => (
                <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    onViewDetails={handleViewDetails}
                />
            ))}
                </div>
            </div>

    </div>
  )
}

export default EmployeesDashboard