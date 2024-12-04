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
import { GoProject } from 'react-icons/go';
import LoadingSkeleton from '../../../Components/Dashboards/ChildDashboard/LoadingSkeleton';
import { useAPI } from '../../../Context/APIContext';

const ProjectsDashboard = () => {
    const [selectedOption, setSelectedOption] = useState('all');
    const [searchValue, setSearchValue] = useState("");
    const [change, setChange] = useState(false);
    const headNames = ['Sr No', 'Project Title','Budget', 'Action '];
    const navigate = useNavigate();
    const { projectsDashboard,allProjects } = useAPI();
    const [data, setData] = useState(null);
    const [tableProject, setTableProject]=useState([])
    const [loading, setLoading] = useState(0);
    const [page,setPage]=useState(1);
    useEffect(() => {
        setLoading(1)
        projectsDashboard(selectedOption)
            .then((res) => {
                console.log("Main Dashbaord Data is :", res);
                setData(res.data)
            })
            .catch((err) => {
                console.log("Error is :", err);

            })
            .finally(() => {
                setLoading(0);
            })
    }, [selectedOption])

    const handleEdit = (id) => {
        console.log("Edit this project :", id);
        navigate('/dashboard/one_project')
    }
    const handleDelete = (id) => {
        console.log("Delete this project :", id);
    }
    const projects = [
        {
            "id": 6,
            "project_name": "AI Integration",
            "deadline": "2024-12-01"
        },
        {
            "id": 175,
            "project_name": "Blockchain Development",
            "deadline": "2024-12-15"
        },
        {
            "id": 160,
            "project_name": "Cloud Computing Setup",
            "deadline": "2024-11-30"
        },
        {
            "id": 32,
            "project_name": "Cybersecurity Framework",
            "deadline": "2024-11-20"
        },
        {
            "id": 33,
            "project_name": "React Native App Development",
            "deadline": "2024-12-05"
        },
        {
            "id": 161,
            "project_name": "IoT Platform Design",
            "deadline": "2024-11-25"
        },
        {
            "id": 47,
            "project_name": "Data Analytics Tool",
            "deadline": "2024-12-10"
        },
        {
            "id": 166,
            "project_name": "Machine Learning Model",
            "deadline": "2024-12-12"
        },
        {
            "id": 51,
            "project_name": "Web Development Platform",
            "deadline": "2024-11-28"
        },
        {
            "id": 170,
            "project_name": "Augmented Reality App",
            "deadline": "2024-12-07"
        }
    ];
    useEffect(()=>{
        setLoading(2)
        allProjects(page)
        .then((res)=>{
            setTableProject(res.data.projects) ;
         })
        .catch((err)=>{
            console.log("Error :", err);
            
        })
        .finally(()=>{
            setLoading(0)
        })
    },[page])

    

    return (
        <div className="p-8">
            {
                loading===1?
                <LoadingSkeleton />
                :
                data?
                <div >
                    <div className="flex justify-between">

                        <h1 className='text-2xl font-semibold my-2'>Projects Dashboard</h1>
                        <Link to='/dashboard/add_project' className=' bg-site focus:ring-4 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:outline-none text-white font-medium rounded-lg text-sm px-5  text-center flex items-center' >
                            <MdOutlineAddTask size={25} style={{ fontWeight: 'bold' }} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                        <RegularCard
                            data={{
                                icon: GoProject,
                                bgColor: '#0428f28f',
                                heading: 'Total Project',
                                para: data?.TotalProjects
                            }}
                        />
                        <RegularCard
                            data={{
                                icon: AiOutlineFileDone,

                                bgColor: '#2ca907a8',
                                heading: 'Completed',
                                para: data?.TotalCompletedProjects
                            }}
                        />
                        <RegularCard
                            data={{
                                icon: GiProcessor,
                                bgColor: '#ed6724',
                                heading: 'Active',
                                para: data?.TotalActiveProjects
                            }}
                        />
                    </div>
                    <div className="my-5">
                        <div className="flex justify-between items-center">
                            <h3 className='text-xl font-semibold'>Projects Reports</h3>

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
                                    All Projects
                                </h2>
                                <RoundedBarChart data={data?.total} />
                            </div>
                            <div className="p-4 ">
                                <h2 className='text-lg ms-3 font-semibold'>
                                    All Stats
                                </h2>
                                <SecondPieChart data={data?.chartData} />
                            </div>

                        </div>
                    </div>
                    <div className="my-1 mt-5">
                        <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                            <h3 className="text-xl font-semibold">Projects List</h3>
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
                    <div className="my-1">
                        <TableView rows={tableProject} headNames={headNames} handleDelete={handleDelete} handleEdit={handleEdit} />
                    </div>
                </div>
                :
                <div className="flex justify-center">
                    No Data to Display
                </div>

            }


        </div>
    )
}

export default ProjectsDashboard