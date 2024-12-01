import React from 'react';
import { FaBuilding, FaBriefcase } from 'react-icons/fa'; // Import icons

const EmployeeCard = ({ employee, onViewDetails }) => {
    return (
        <div className="max-w-sm w-full bg-white border rounded-lg shadow-md p-4 flex flex-col items-center">
            {/* Profile Picture */}
            <img
                src={employee.profilePicture || 'https://via.placeholder.com/150'}
                alt={`${employee.name}'s Profile`}
                className="w-24 h-24 rounded-full mb-4"
            />
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700">{employee.name}</h3>

                {/* Department with Icon */}
                <div className="flex items-center justify-center text-gray-500 text-sm">
                    <FaBuilding className="mr-2" /> {employee.department}
                </div>

                {/* Designation with Icon */}
                <div className="flex items-center justify-center text-gray-500 text-sm mt-1">
                    <FaBriefcase className="mr-2" /> {employee.designation}
                </div>
            </div>

            <button
                onClick={() => onViewDetails(employee)}
                className="mt-4 bg-site text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
                View Details
            </button>
        </div>
    );
};

export default EmployeeCard;
