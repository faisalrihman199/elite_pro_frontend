import React, { useState } from 'react'
import { FaArrowCircleLeft, FaArrowCircleRight, FaCalendarAlt, FaEdit, FaUsers } from 'react-icons/fa'
import ModuleCard from '../Module/ModuleCard'
import { MdOutlineAddTask } from 'react-icons/md';

const TaskCard = ({ key, task }) => {
    const getProgressColor = (progress) => {
        if (progress <= 30) return 'bg-red-600';
        if (progress < 60) return 'bg-orange-400';
        if (progress < 80) return 'bg-green-600';
        return 'bg-site';
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextModule = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % task?.modules?.length);
    };

    const prevModule = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + task?.modules?.length) % task?.modules?.length);
    };

    return (
        <div key={key} className="mb-4 p-6 border rounded-lg w-full">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg flex items-center font-semibold text-gray-800">{task.name} <FaEdit className='mx-2 cursor-pointer' /> </h4>
                <div className="flex items-center text-gray-600">
                    <FaUsers className="mr-2" />
                    <span>{task.name}</span>
                </div>
            </div>

            {/* Task Dates */}
            <div className="text-gray-600 mb-4 flex items-center flex-wrap">
                <FaCalendarAlt className="mr-2" />
                <span>{new Date(task?.startDate).toLocaleDateString()} - {new Date(task?.endDate).toLocaleDateString()}</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-400">
                <div className={`${getProgressColor(task.progress)} text-xs font-medium text-white text-center p-0.5 leading-none rounded-full`} style={{ width: `${task.progress}%` }}>
                    {task.progress}%
                </div>
            </div>
            <div className="text-gray-600">{task.progress}% completed</div>

            {/* Modules (Carousel) */}
            <div className="mt-4">
                <div className="flex justify-between">
                    <div className="flex items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-700 ">Modules</h3>
                        <MdOutlineAddTask size={20} className='custom-color mx-1 cursor-pointer' style={{ fontWeight: 'bold' }} />
                    </div>
                    <div>
                        {currentIndex + 1} / {task.modules.length}
                    </div>

                </div>
                <div className="relative">
                    <div className="flex items-center justify-center">


                        {/* Carousel Item: Module Card */}
                        <div className="w-full flex justify-center px-5 ">
                            <ModuleCard module={task.modules[currentIndex]} />
                        </div>


                    </div>
                    {/* Carousel Indicators (Optional) */}
                    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse ">
                        {task.modules.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`w-3 mt-5 h-3 rounded-full ${currentIndex === index ? 'bg-site' : 'bg-gray-400'}`}
                                aria-current={currentIndex === index ? 'true' : 'false'}
                                onClick={() => setCurrentIndex(index)}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
