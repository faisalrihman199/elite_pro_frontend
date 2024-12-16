import React, { useState } from 'react';
import { FaBuilding, FaBriefcase, FaCalendarAlt, FaPowerOff } from 'react-icons/fa'; // Import icons
import { format } from 'date-fns'; // To format the date
import { useAPI } from '../../Context/APIContext'; // Assuming this is where API functions come from
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmployeeCard = ({ employee }) => {
    const [status, setStatus] = useState(employee.status); // Use state for local status
    const { getFilesPath, deleteEmployee } = useAPI(); // Assuming there's a toggleEmployeeStatus method
    const navigate = useNavigate();

    const onViewDetails = (employee) => {
        navigate('/dashboard/one_employee', { state: employee.id });
    };

    const toggleUserStatus =  () => {
        
        deleteEmployee(employee.id)
        .then((res)=>{
            if(res.success){
                toast.success(res.message);
                setStatus(res.data.newStatus);
            }
            else{
                toast.error(res.message);
            }
        })
        .catch((err)=>{
            console.log("Error :", err);
            toast.error(err.response.data.message || "Could not change Employee Status")
        })

        
    };

    return (
        <div className="max-w-sm w-full bg-white border rounded-lg shadow-md p-4 relative">
            {/* Top Left Corner Status Dot */}
            <div className="absolute top-2 left-2 flex items-center">
                <span
                    className={`h-3 w-3 rounded-full mr-2 ${status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}
                ></span>
                <span className="text-sm text-gray-500">
                    {status === 'active' ? 'Active' : 'Inactive'}
                </span>
            </div>

            {/* Top Right Corner Toggle Button */}
            <div
                onClick={toggleUserStatus}
                className={`absolute top-2 right-2 p-2 rounded-full cursor-pointer ${
                    status === 'active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                }`}
            >
                <FaPowerOff className="text-white text-lg" />
            </div>

            {/* Profile Picture */}
            <img
                src={employee.profile_image ? getFilesPath(employee.profile_image) : 'https://via.placeholder.com/150'}
                alt={`${employee.firstName}'s Profile`}
                className="w-24 h-24 rounded-full mb-4 mx-auto"
            />

            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700">{employee.firstName} {employee.lastName}</h3>

                {/* Department with Icon */}
                <div className="flex items-center justify-center text-gray-500 text-sm mt-1">
                    <FaBuilding className="mr-2" /> {employee.department}
                </div>

                {/* Designation with Icon */}
                <div className="flex items-center justify-center text-gray-500 text-sm mt-1">
                    <FaBriefcase className="mr-2" /> {employee.designation}
                </div>

                {/* Joined At with Icon */}
                <div className="flex items-center justify-center text-gray-500 text-sm mt-1">
                    <FaCalendarAlt className="mr-2" /> 
                    {employee.createdAt ? format(new Date(employee.createdAt), 'MMM d, yyyy') : 'N/A'}
                </div>
            </div>

            {/* View Details Button */}
            <p
                onClick={() => { onViewDetails(employee); }}
                className="mt-4 bg-site text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer text-center"
            >
                View Details
            </p>
        </div>
    );
};

export default EmployeeCard;
