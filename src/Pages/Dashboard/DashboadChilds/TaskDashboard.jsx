import React, { useEffect, useState } from 'react';
import { FaBullhorn, FaDesktop, FaUsers } from 'react-icons/fa';
import RegularCard from '../../../Components/Dashboards/ChildDashboard/RegularCard';
import RoundedBarChart from '../../../Components/Dashboards/ChildDashboard/Analytics/RoundedBarChart';
import SecondPieChart from '../../../Components/Dashboards/ChildDashboard/Analytics/SecondPieChart';
import TableView from '../../../Components/Dashboards/ChildDashboard/TableView';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineFileDone, AiTwotoneProject } from 'react-icons/ai';
import { GiProcessor } from 'react-icons/gi';
import { MdOutlineAddTask } from 'react-icons/md';
import { GoProject, GoTasklist } from 'react-icons/go';
import { useAPI } from '../../../Context/APIContext';
import LoadingSkeleton from '../../../Components/Dashboards/ChildDashboard/LoadingSkeleton';
import { toast } from 'react-toastify';
import Pagination from '../../../Components/Dashboards/ChildDashboard/Pagination';

const TaskDashboard = () => {
    const [selectedOption, setSelectedOption] = useState('all');
    const [searchValue, setSearchValue] = useState("");
    const [change, setChange] = useState(false);
    const [loading, setLoading] = useState(0);
    const [tasksData, setTasksdata] = useState({});
    const [tableData, settableData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { tasksDashboard, allTasks, deleteTask } = useAPI();
    useEffect(() => {
        setLoading(0)
        tasksDashboard(selectedOption)
            .then((res) => {
                setTasksdata(res?.data)
            })
            .catch((err) => {
                console.log("ERROR :", err);

            })
            .finally(() => {
                setLoading(0)
            })

    }, [selectedOption])
    useEffect(() => {
        setLoading(2)
        allTasks(currentPage)
            .then((res) => {
                settableData(res.data.tasks);

            setCurrentPage(res?.data?.currentPage)
            setTotalPages(res?.data?.totalPages);
            })
            .catch((err) => {
                console.log("Error :", err);

            })
            .finally(() => {
                setLoading(0)
            })
    }, [currentPage, change])


    const navigate = useNavigate();
    const headNames = ['Sr No', 'Task Name', 'Project Name', 'Deadline ', 'Action'];
    const handleEdit = (id) => {
        navigate('/dashboard/add_task', { state: id })
    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleDelete = (id) => {
        console.log("Delete this Task :", id);
        deleteTask(id)
            .then((res) => {
                if (res.success) {
                    toast.success(res.message);
                    setChange(!change)
                }
                else {
                    toast.error(res.message);
                }
            })
            .catch((err) => {
                console.log("Error :", err);
                toast.error(err?.response?.data?.message || "Error While Delete")
            })
    }
    const fileteredData = tableData?.filter(task =>
        task.name.toLowerCase().includes(searchValue.toLowerCase()) 
    );

    return (
        <div className='p-8' >
            {
                loading === 1 ?
                    <LoadingSkeleton />
                    :
                    tasksData ?
                        <>
                            <div className="flex justify-between">

                                <h1 className='text-2xl font-semibold my-2'>Tasks Dashboard</h1>
                                {/* <Link to='/dashboard/add_task' className=' bg-site focus:ring-4 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:outline-none text-white font-medium rounded-lg text-sm px-5  text-center flex items-center' >
                                <MdOutlineAddTask size={25} style={{ fontWeight: 'bold' }} />
                            </Link> */}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                                <RegularCard
                                    data={{
                                        icon: GoTasklist,
                                        bgColor: '#0428f28f',
                                        heading: 'Total Tasks',
                                        para: tasksData?.TotalTasks
                                    }}
                                />
                                <RegularCard
                                    data={{
                                        icon: AiOutlineFileDone,

                                        bgColor: '#2ca907a8',
                                        heading: 'Completed',
                                        para: tasksData?.TotalCompletedTasks
                                    }}
                                />
                                <RegularCard
                                    data={{
                                        icon: GiProcessor,
                                        bgColor: '#ed6724',
                                        heading: 'Active',
                                        para: tasksData?.TotalActiveTasks
                                    }}
                                />
                            </div>
                            <div className="my-5">
                                <div className="flex justify-between items-center">
                                    <h3 className='text-xl font-semibold'>Tasks Reports</h3>

                                    <select
                                        className="border border-gray-100 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={selectedOption} // Bind the state to the dropdown
                                        onChange={(e) => setSelectedOption(e.target.value)}
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
                                            All Tasks
                                        </h2>
                                        <RoundedBarChart data={tasksData?.taskCounts} />
                                    </div>
                                    <div className="p-4 ">
                                        <h2 className='text-lg ms-3 font-semibold'>
                                            All Stats
                                        </h2>
                                        <SecondPieChart data={tasksData?.chartData} />
                                    </div>

                                </div>
                            </div>
                            <div className="my-1 mt-5">
                                <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                                    <h3 className="text-xl font-semibold">Tasks List</h3>
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
                            </div>
                        </>
                        :
                        <div className="flex justify-center">
                            No Data Found
                        </div>

            }
            {
                loading === 1 ?
                    <LoadingSkeleton />
                    :
                    fileteredData.length > 0 ?
                        <div className="my-1">
                            <TableView rows={fileteredData} headNames={headNames} handleDelete={handleDelete} handleEdit={handleEdit} />
                        </div>
                        :
                        <div className="flex justify-content-center">
                            No Record Found
                        </div>
            }
            <div className="my-4">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    )
}

export default TaskDashboard