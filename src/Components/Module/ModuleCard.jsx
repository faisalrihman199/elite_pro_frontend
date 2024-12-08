import React from 'react'
import { FaCalendarAlt, FaEdit, FaTasks, FaTrash, FaTrashAlt } from 'react-icons/fa'

const ModuleCard = ({key, module}) => {
    console.log("Module is :", module);
    
    const getProgressColor = (progress) => {
        if (progress <= 30) return 'bg-red-600';
        if (progress < 60) return 'bg-orange-400';
        if (progress < 80) return 'bg-green-600';
        return 'bg-site';
    };
    
    return (
        <div key={key} className="mb-4 p-4 border rounded-lg bg-gray-50 w-full">
            <div className="flex flex-wrap justify-between items-center mb-4">
                <h5 className="text-lg flex items-center font-semibold text-gray-800">{module.name} <FaEdit className='mx-2 cursor-pointer' />
                <FaTrashAlt size={15} color='red' className='mx-1 cursor-pointer' />
                 </h5>

                <div className="flex  items-center text-gray-600">
                    <FaTasks className="mr-2" />
                    {
                        module.employees[0] &&
                    <span>{module.employees[0].firstName} {module.employees[0].lastName}</span>
                    }
                </div>
            </div>

            {/* Module Dates */}
            <div className="text-gray-600 mb-4 flex flex-wrap items-center">
                <FaCalendarAlt className="mr-2" />
                <span className='text-sm sm:text-base' >{new Date(module.startDate).toLocaleDateString()} - {new Date(module.endDate).toLocaleDateString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-400">
                <div className={`${getProgressColor(module.completionPercentage)} text-xs font-medium text-white text-center p-0.5 leading-none rounded-full`} style={{ width: `${module.completionPercentage}%` }}>{module.completionPercentage}% </div>
            </div>
            <div className="text-gray-600 my-2">{module.completionPercentage}% completed</div>
        </div>
    )
}

export default ModuleCard