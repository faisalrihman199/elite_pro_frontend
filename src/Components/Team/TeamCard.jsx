import React from 'react';
import { FaUsers, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TeamCard = ({ team }) => {
    // Generate list of employee names for the tooltip
    const remainingEmployees = team.employees.slice(5);
    const navigate=useNavigate();
    const onShowMore=(team)=>{
        console.log("Show more this team :", team);
        navigate('/dashboard/one_team');
    }
    return (
        <div className="max-w-md w-full bg-white border rounded-lg shadow-md p-6 flex flex-col items-center">
            {/* Team Name */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{team.name}</h3>

            {/* Employee Avatars */}
            <div className="flex -space-x-2 relative">
                {team.employees.slice(0, 5).map((employee, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={employee.profilePicture || 'https://via.placeholder.com/50'}
                            alt={employee.name}
                            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                        />
                        {/* Custom Tooltip */}
                        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded-md transition-opacity duration-300">
                            {employee.name}
                        </div>
                    </div>
                ))}
                {remainingEmployees.length > 0 && (
                    <div
                        className="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-700 font-semibold rounded-full border-2 border-white shadow-sm relative group"
                    >
                        +{remainingEmployees.length}
                        <div className="absolute left-1/2 transform -translate-x-1/2 top-12 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded-md max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md transition-opacity duration-300 whitespace-nowrap">
                            {/* Show remaining employee names as comma-separated list */}
                            {remainingEmployees.map((employee, index) => (
                                <span key={index}>
                                    {employee.name}{index < remainingEmployees.length - 1 && ', '}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Employee Count with Icon */}
            <div className="flex items-center text-gray-600 my-4">
                <FaUsers className="text-site mr-2" size={20} />
                <span>{team.employees.length} Employees</span>
            </div>

            {/* Show More Button */}
            <button
                onClick={() => onShowMore(team)}
                className="mt-6 flex items-center justify-center bg-site text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
                Show More <FaArrowRight className="ml-2" />
            </button>
        </div>
    );
};

export default TeamCard;
