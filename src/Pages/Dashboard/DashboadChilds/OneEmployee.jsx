import React, { useEffect, useState } from 'react';
import { FaBriefcase, FaBuilding, FaTasks, FaUser, FaUsers } from 'react-icons/fa';
import { MdOutlineAddTask, MdOutlineWorkHistory } from 'react-icons/md';
import { GoProject } from 'react-icons/go';
import RegularCard from '../../../Components/Dashboards/ChildDashboard/RegularCard';
import ModuleCard from '../../../Components/Module/ModuleCard';
import TableView from '../../../Components/Dashboards/ChildDashboard/TableView';
import { useAPI } from '../../../Context/APIContext';
import LoadingSkeleton from '../../../Components/Dashboards/ChildDashboard/LoadingSkeleton';

const OneEmployee = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('all');
    const [searchValue, setSearchValue] = useState("");
    const [change, setChange] = useState(false);
    const [loading, setLoading] = useState(1);
    const { OneEmployee, getFilesPath,allModules } = useAPI();
    const [data, setData] = useState({});
    const [employeeInfo, setEmployeeInfo] = useState({});
    const [modules,setRunningModule]=useState([]);
    const [tableData,setTableData]=useState([]);
    const employeeId = 5;
    const [page,setPage]=useState(1);

    useEffect(() => {
        setLoading(1);
        OneEmployee(employeeId)
            .then((res) => {
                setData(res?.data);
                setEmployeeInfo(res?.data?.employee);

                setRunningModule(res?.data?.runningModules);

            })
            .catch((err) => {
                console.log("Error is :", err);

            })
            .finally(() => {
                setLoading(0);
            })
    }, []);
    useEffect(()=>{
        setLoading(2)
        allModules(page,employeeId)
        .then((res)=>{
            setTableData(res.data.modules);
         })
        .catch((err)=>{
            console.log("Error :", err);
        })
        .finally(()=>{
            setLoading(0)
        })
    },[page]);


    const headNames = ['Sr No', 'Module Name', 'Deadline ', 'Action'];
    const handleEdit = (id) => {
        console.log("Edit this Module :", id);
    }
    const handleDelete = (id) => {
        console.log("Delete this Module :", id);

    }
    const projects = [
        {
            "id": 6,
            "module_name": "AI Integration",
            "deadline": "2024-12-01"
        },
        {
            "id": 175,
            "module_name": "Blockchain Development",
            "deadline": "2024-12-15"
        },
        {
            "id": 160,
            "module_name": "Cloud Computing Setup",
            "deadline": "2024-11-30"
        },
        {
            "id": 32,
            "module_name": "Cybersecurity Framework",
            "deadline": "2024-11-20"
        },
        {
            "id": 33,
            "module_name": "React Native App Development",
            "deadline": "2024-12-05"
        },
        {
            "id": 161,
            "module_name": "IoT Platform Design",
            "deadline": "2024-11-25"
        },
        {
            "id": 47,
            "module_name": "Data Analytics Tool",
            "deadline": "2024-12-10"
        },
        {
            "id": 166,
            "module_name": "Machine Learning Model",
            "deadline": "2024-12-12"
        },
        {
            "id": 51,
            "module_name": "Web Development Platform",
            "deadline": "2024-11-28"
        },
        {
            "id": 170,
            "module_name": "Augmented Reality App",
            "deadline": "2024-12-07"
        }
    ];
    

    

    return (
        loading === 1 ?
            <LoadingSkeleton />
            :
            <div className="flex flex-col lg:flex-row-reverse scroll-hidden" style={{ height: '92vh' }}>
                {/* Employee Info Sidebar */}
                {
                    employeeInfo &&
                    <div className="w-full lg:w-1/4 h-auto lg:h-full bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                        {/* Profile Image */}
                        <img
                            src={getFilesPath(employeeInfo?.profile_image) || 'https://randomuser.me/api/portraits/men/1.jpg'}
                            alt={`${employeeInfo.firstName}'s profile`}
                            className="w-32 h-32 rounded-full mb-4 border-4 border-primary-500"
                        />

                        {/* Name */}
                        <h2 className="text-2xl font-semibold text-center mb-2">
                            {employeeInfo?.firstName} {employeeInfo?.lastName}
                        </h2>

                        {/* Designation with Icon */}
                        <div className="flex items-center text-gray-600 mb-2">
                            <FaBriefcase className="mr-2 text-primary-500" />
                            <p>{employeeInfo?.designation}</p>
                        </div>

                        {/* Department with Icon */}
                        <div className="flex items-center text-gray-500 mb-2">
                            <FaBuilding className="mr-2 text-primary-500" />
                            <p>{employeeInfo?.department}</p>
                        </div>

                        {/* Teams with Icons */}
                        <div className="w-full">
                            <h4 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                                Teams Enrolled
                            </h4>
                            <ul className="list-disc pl-5">
                                {
                                    employeeInfo?.Teams && employeeInfo.Teams.length > 0
                                        ? employeeInfo.Teams.map((team, index) => (
                                            <li key={index} className="text-gray-600">{team.name}</li>
                                        ))
                                        : <li className="text-gray-500">No teams assigned</li>
                                }
                            </ul>
                        </div>
                    </div>

                }

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-auto scroll-hidden">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        <RegularCard
                            data={{
                                icon: GoProject,
                                bgColor: '#0428f28f',
                                heading: 'Total Modules',
                                para: data?.totalModulesCount,
                            }}
                        />
                        <RegularCard
                            data={{
                                icon: MdOutlineWorkHistory,
                                bgColor: '#2ca907a8',
                                heading: 'Running Modules',
                                para: data?.runningModulesCount,
                            }}
                        />
                        <RegularCard
                            data={{
                                icon: FaTasks,
                                bgColor: '#ed6724',
                                heading: 'Pending Modules',
                                para: data?.pendingModulesCount,
                            }}
                        />
                    </div>

                        { modules.length>0 &&
                        
                            <div className="mt-4">
                                <div className="flex justify-between">
                                    <div className="flex items-center mb-4">
                                        <h3 className="text-xl font-semibold text-gray-700 ">Modules</h3>
                                        <MdOutlineAddTask size={20} className='custom-color mx-1 cursor-pointer' style={{ fontWeight: 'bold' }} />
                                    </div>
                                    <div>
                                        {currentIndex + 1} / {modules.length}
                                    </div>

                                </div>
                                <div className="relative">
                                    <div className="flex items-center justify-center">
                                        <div className="w-full flex justify-center px-5 ">
                                        {modules && <ModuleCard module={modules[currentIndex]} /> }
                                        </div>


                                    </div>
                                    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse ">
                                        {modules.map((_, index) => (
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
                        }
                    {
                        loading === 2 ?
                            <LoadingSkeleton />
                            :
                            <div className="my-1">
                                <TableView rows={tableData} headNames={headNames} handleDelete={handleDelete} handleEdit={handleEdit} />
                            </div>

                    }
                </div>
            </div>


    );
};

export default OneEmployee;
