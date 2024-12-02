import React, { useState } from 'react';
import { FaUsers, FaCalendarAlt, FaTasks, FaClipboardList, FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { Progress } from 'reactstrap';
import TeamCard from '../../../Components/Team/TeamCard';
import TaskCard from '../../../Components/Task/TaskCard';
import { MdOutlineAddTask } from 'react-icons/md';


const OneProject = () => {
    const project = {
        name: 'Website Redesign',
        start: '2024-01-01',
        deadline: '2024-06-01',
        progress: 60, // Project progress percentage
        teams: [
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
            }
        ]

        ,
        tasks: [
            {
                name: 'Design Homepage',
                assignedTeam: 'Design',
                progress: 90, // Task progress percentage
                start: '2024-01-01',
                end: '2024-03-01',
                modules: [
                    {
                        name: 'Wireframe',
                        assignedTo: 'John Doe',
                        progress: 50, // Module progress percentage
                        start: '2024-01-01',
                        end: '2024-01-15'
                    },
                    {
                        name: 'UI Design',
                        assignedTo: 'Jane Smith',
                        progress: 30,
                        start: '2024-01-16',
                        end: '2024-02-15'
                    },
                    {
                        name: 'User Testing',
                        assignedTo: 'Robert Brown',
                        progress: 20,
                        start: '2024-02-16',
                        end: '2024-03-01'
                    }
                ]
            },
            {
                name: 'Develop Backend',
                assignedTeam: 'Development',
                progress: 50, // Task progress percentage
                start: '2024-01-10',
                end: '2024-04-30',
                modules: [
                    {
                        name: 'API Development',
                        assignedTo: 'Alice Johnson',
                        progress: 60,
                        start: '2024-01-10',
                        end: '2024-02-15'
                    },
                    {
                        name: 'Database Setup',
                        assignedTo: 'James Wilson',
                        progress: 40,
                        start: '2024-02-16',
                        end: '2024-03-31'
                    },
                    {
                        name: 'Security Integration',
                        assignedTo: 'Emily Davis',
                        progress: 20,
                        start: '2024-04-01',
                        end: '2024-04-30'
                    }
                ]
            },
            {
                name: 'SEO Optimization',
                assignedTeam: 'Marketing',
                progress: 30, // Task progress percentage
                start: '2024-02-01',
                end: '2024-05-15',
                modules: [
                    {
                        name: 'Keyword Research',
                        assignedTo: 'Sophia Lee',
                        progress: 50,
                        start: '2024-02-01',
                        end: '2024-02-15'
                    },
                    {
                        name: 'Content Strategy',
                        assignedTo: 'Olivia Martinez',
                        progress: 20,
                        start: '2024-02-16',
                        end: '2024-03-15'
                    },
                    {
                        name: 'Link Building',
                        assignedTo: 'Liam Clark',
                        progress: 10,
                        start: '2024-03-16',
                        end: '2024-05-15'
                    }
                ]
            }
        ]
    };
    const getProgressColor = (progress) => {
        if (progress <= 30) return 'bg-red-600';
        if (progress < 60) return 'bg-orange-400';
        if (progress < 80) return 'bg-green-600';
        return 'bg-site';
    };
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTask = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % project.tasks.length);
    };

    const prevTask = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + project.tasks.length) % project.tasks.length);
    };

    return (
        <div className="p-8  min-h-screen">
            <div className=" p-6 rounded-lg ">
                {/* Project Header */}
                <div className="flex flex-wrap justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-gray-800">{project.name}</h2>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center text-gray-600">
                            <FaCalendarAlt className="mr-2 text-xl" />
                            <span>{new Date(project.start).toLocaleDateString()} - {new Date(project.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FaUsers className="mr-2 text-xl" />
                            <span>{project.teams.length} Teams</span>
                        </div>
                    </div>
                </div>

                {/* Project Progress Bar */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Project Progress</h3>
                    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-400">
                        <div className={`${getProgressColor(project.progress)} text-xs font-medium text-white text-center p-0.5 leading-none rounded-full`} style={{ width: `${project.progress}%` }}>{project.progress}% </div>
                    </div>
                    <div className="text-gray-600 mt-2">{project.progress}% completed</div>
                </div>

                {/* Tasks */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <h3 className="text-xl font-semibold text-gray-700 ">Tasks</h3>
                            <MdOutlineAddTask size={20} className='custom-color mx-1 cursor-pointer' style={{ fontWeight: 'bold' }} />
                        </div>
                        <div>
                            {currentIndex + 1} / {project.tasks.length}
                        </div>

                    </div>
                    <div className="relative">
                        <div className="flex items-center justify-center">
                            <button
                                onClick={prevTask}
                                className="absolute left-0 "
                            >
                                <FaArrowCircleLeft size={25} className='custom-color' />
                            </button>
                            <div className="w-full flex justify-center " >
                                <TaskCard task={project.tasks[currentIndex]} />
                            </div>
                            <button
                                onClick={nextTask}
                                className="absolute right-0 "
                            >
                                <FaArrowCircleRight size={25} className='custom-color' />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Teams */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Teams Working on the Project</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                        {project.teams.map((team, index) => (
                            <TeamCard key={index} team={team} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OneProject;
