import React, { useEffect, useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight, FaRProject, FaTasks, FaUsers } from 'react-icons/fa';
import RegularCard from '../../../Components/Dashboards/ChildDashboard/RegularCard';
import RoundedBarChart from '../../../Components/Dashboards/ChildDashboard/Analytics/RoundedBarChart';
import { MdOutlineWorkHistory } from 'react-icons/md';
import { BiNotificationOff } from 'react-icons/bi';
import { LiaUserPlusSolid } from 'react-icons/lia';
import { FaUserPlus } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EmployeeCard from '../../../Components/Employee/EmployeeCard';
import { GoProject } from 'react-icons/go';
import TaskCard from '../../../Components/Task/TaskCard';
import { useAPI } from '../../../Context/APIContext';
import LoadingSkeleton from '../../../Components/Dashboards/ChildDashboard/LoadingSkeleton';
import AddTeam from '../../../Components/Team/AddTeam';
const OneTeam = () => {
    const [selectedOption, setSelectedOption] = useState('monthly');
    const location = useLocation();

    const teamId = location.state;
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(1);
    const [teamData, setTeamData] = useState({});
    const [teamEmployees, setEmployees] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // state to control the modal visibility
    
    const { oneTeam } = useAPI();
    useEffect(() => {
        setLoading(1);
        oneTeam(teamId)
            .then((res) => {
                setTeamData(res.data);
                setEmployees(res?.data?.team?.employees);
                setTasks(res?.data?.runningTasks);

            })
            .catch((err) => {
                console.log("Error is :", err);

            })
            .finally(() => {
                setLoading(0);
            })
    }, [teamId])

    const navigate=useNavigate();
    const handleViewDetails = (employee) => {
        navigate('/dashboard/one_employee',{state:employee.id})
    };
    // const tasks= [
    //     {
    //         name: 'Design Homepage',
    //         assignedTeam: 'Design',
    //         progress: 90, // Task progress percentage
    //         start: '2024-01-01',
    //         end: '2024-03-01',
    //         modules: [
    //             {
    //                 name: 'Wireframe',
    //                 assignedTo: 'John Doe',
    //                 progress: 50, // Module progress percentage
    //                 start: '2024-01-01',
    //                 end: '2024-01-15'
    //             },
    //             {
    //                 name: 'UI Design',
    //                 assignedTo: 'Jane Smith',
    //                 progress: 30,
    //                 start: '2024-01-16',
    //                 end: '2024-02-15'
    //             },
    //             {
    //                 name: 'User Testing',
    //                 assignedTo: 'Robert Brown',
    //                 progress: 20,
    //                 start: '2024-02-16',
    //                 end: '2024-03-01'
    //             }
    //         ]
    //     },
    //     {
    //         name: 'Develop Backend',
    //         assignedTeam: 'Development',
    //         progress: 50, // Task progress percentage
    //         start: '2024-01-10',
    //         end: '2024-04-30',
    //         modules: [
    //             {
    //                 name: 'API Development',
    //                 assignedTo: 'Alice Johnson',
    //                 progress: 60,
    //                 start: '2024-01-10',
    //                 end: '2024-02-15'
    //             },
    //             {
    //                 name: 'Database Setup',
    //                 assignedTo: 'James Wilson',
    //                 progress: 40,
    //                 start: '2024-02-16',
    //                 end: '2024-03-31'
    //             },
    //             {
    //                 name: 'Security Integration',
    //                 assignedTo: 'Emily Davis',
    //                 progress: 20,
    //                 start: '2024-04-01',
    //                 end: '2024-04-30'
    //             }
    //         ]
    //     },
    //     {
    //         name: 'SEO Optimization',
    //         assignedTeam: 'Marketing',
    //         progress: 30, // Task progress percentage
    //         start: '2024-02-01',
    //         end: '2024-05-15',
    //         modules: [
    //             {
    //                 name: 'Keyword Research',
    //                 assignedTo: 'Sophia Lee',
    //                 progress: 50,
    //                 start: '2024-02-01',
    //                 end: '2024-02-15'
    //             },
    //             {
    //                 name: 'Content Strategy',
    //                 assignedTo: 'Olivia Martinez',
    //                 progress: 20,
    //                 start: '2024-02-16',
    //                 end: '2024-03-15'
    //             },
    //             {
    //                 name: 'Link Building',
    //                 assignedTo: 'Liam Clark',
    //                 progress: 10,
    //                 start: '2024-03-16',
    //                 end: '2024-05-15'
    //             }
    //         ]
    //     }
    // ]
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTask = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % tasks.length);
    };

    const prevTask = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + tasks.length) % tasks.length);
    };
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className='p-8' >
            {
                loading === 1 ?
                    <LoadingSkeleton />
                    :
                    teamData ?
                        <>

                            <div className="flex justify-between">

                                <h1 className='text-2xl font-semibold my-2'>Team Name</h1>
                                <button className=' bg-site focus:ring-4 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:outline-none text-white font-medium rounded-lg text-sm px-5  text-center flex items-center' 
                                onClick={toggleModal}>
                                    <FaUserPlus size={25} style={{ fontWeight: 'bold' }} />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                                <RegularCard
                                    data={{
                                        icon: GoProject,
                                        bgColor: '#0428f28f',
                                        heading: 'Total Tasks',
                                        para: teamData?.totalTasks
                                    }}
                                />
                                <RegularCard
                                    data={{
                                        icon: MdOutlineWorkHistory,
                                        bgColor: '#2ca907a8',
                                        heading: 'Running Tasks',
                                        para: teamData?.totalActiveTasks
                                    }}
                                />
                                <RegularCard
                                    data={{
                                        icon: FaTasks,
                                        bgColor: '#ed6724',
                                        heading: 'Pending Tasks',
                                        para: teamData?.totalPendingTasks
                                    }}
                                />
                            </div>
                            {
                                tasks.length>0 &&


                            <div className="my-4">

                                <div className="mb-6">
                                    <div className="flex justify-between">
                                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Running Tasks</h3>
                                        <div>
                                            {currentIndex + 1} / {tasks.length}
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
                                                <TaskCard task={tasks[currentIndex]} />
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
                            </div>
                            }

                            <div className="my-4">
                                <div className="flex justify-between">
                                    <h3 className='text-xl font-semibold ms-2'>Members List</h3>
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
                                    {teamEmployees.map((employee) => (
                                        <EmployeeCard
                                            key={employee.id}
                                            employee={employee}
                                            onViewDetails={handleViewDetails}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                        :
                        <div>No data found</div>

            }
            {isModalOpen && (
                <AddTeam toggleModal={toggleModal} update={teamData?.team} />
            )}

        </div>
    )
}

export default OneTeam