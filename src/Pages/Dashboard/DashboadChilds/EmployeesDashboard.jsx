import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import RegularCard from '../../../Components/Dashboards/ChildDashboard/RegularCard';
import RoundedBarChart from '../../../Components/Dashboards/ChildDashboard/Analytics/RoundedBarChart';
import { MdOutlineWorkHistory } from 'react-icons/md';
import { BiNotificationOff } from 'react-icons/bi';
import { LiaUserPlusSolid } from 'react-icons/lia';
import { FaUserPlus } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeCard from '../../../Components/Employee/EmployeeCard';
import { useAPI } from '../../../Context/APIContext';
import LoadingSkeleton from '../../../Components/Dashboards/ChildDashboard/LoadingSkeleton';
import Pagination from '../../../Components/Dashboards/ChildDashboard/Pagination';
const EmployeesDashboard = () => {
    const [selectedOption, setSelectedOption] = useState('monthly');
    const [searchValue, setSearchValue] = useState("");
    const { employeeDashboard, employeesList } = useAPI();
    const [allEmployees, setEmployees] = useState([]);
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setLoading(1)
        employeeDashboard(selectedOption)
            .then((res) => {
                console.log("Employee Dashbaord Data is :", res);
                setData(res.data)
            })
            .catch((err) => {
                console.log("Error is :", err);

            })
            .finally(() => {
                setLoading(0);
            })
    }, [selectedOption]);
    const filteredEmployees = allEmployees?.filter(employee =>
        employee.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchValue.toLowerCase())
    );
    useEffect(() => {
        setLoading(2);
        employeesList(currentPage)
            .then((res) => {
                console.log("EMployees :", res.data);
                setEmployees(res.data.employees);
                setCurrentPage(res?.data?.currentPage)
                setTotalPages(res?.data?.totalPages);

            })
            .catch((err) => {
                console.log("Errror :", err);
            })
            .finally(() => {
                setLoading(0);
            })
    }, [currentPage])
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-8">
            {loading === 1 ?
                <LoadingSkeleton />
                :
                <div>
                    <div className="flex justify-between">

                        <h1 className='text-2xl font-semibold my-2'>Employees Dashboard</h1>
                        <Link to='/dashboard/add_employee' className=' bg-site focus:ring-4 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:outline-none text-white font-medium rounded-lg text-sm px-5  text-center flex items-center' >
                            <FaUserPlus size={25} style={{ fontWeight: 'bold' }} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                        <RegularCard
                            data={{
                                icon: FaUsers,
                                bgColor: '#0428f28f',
                                heading: 'Total Employees',
                                para: data?.TotalEmployees
                            }}
                        />
                        <RegularCard
                            data={{
                                icon: MdOutlineWorkHistory,
                                bgColor: '#2ca907a8',
                                heading: 'Active Employees',
                                para: data?.TotalActiveEmployeeCount
                            }}
                        />
                        <RegularCard
                            data={{
                                icon: BiNotificationOff,
                                bgColor: '#f22c36',
                                heading: 'Inactive Employees',
                                para: data?.TotalInactiveEmployeeCount
                            }}
                        />
                    </div>
                    <div className="my-4">
                        <div className="flex justify-between items-center">
                            <h3 className='text-xl font-semibold'>Messages Reports</h3>
                            <select
                                className="border border-gray-100 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={selectedOption} // Bind the state to the dropdown
                                onChange={(e) => setSelectedOption(e.target.value)} // Update state on change
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
                                    All Employees
                                </h2>
                                <RoundedBarChart data={data?.employeeCounts} />
                            </div>
                            <div className="p-4 ">
                                <h2 className='text-lg ms-3 font-semibold'>
                                    Working Employees
                                </h2>
                                <RoundedBarChart data={data?.activeEmployeeCounts} />
                            </div>
                            <div className="p-4 ">
                                <h2 className='text-lg ms-3 font-semibold'>
                                    Free Employees
                                </h2>
                                <RoundedBarChart data={data?.inactiveEmployeeCounts} />
                            </div>
                        </div>
                    </div>
                    <div className="my-4">
                        <div className="flex justify-between">
                            <h3 className='text-xl font-semibold'>Employees List</h3>
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


                </div>}
            {loading === 2 ?
                <LoadingSkeleton />
                :
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                        {filteredEmployees.map((employee) => (

                            <EmployeeCard
                                key={employee.id}
                                employee={employee}
                            />

                        ))}
                    </div>
                    <div className="my-4">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                </>
            }

        </div>

    )
}

export default EmployeesDashboard