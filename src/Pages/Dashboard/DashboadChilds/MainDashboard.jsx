import React, { useEffect, useState } from 'react';
import { FaBullhorn, FaDesktop, FaUsers } from 'react-icons/fa';
import RegularCard from '../../../Components/Dashboards/ChildDashboard/RegularCard';
import BasicLineChart from '../../../Components/Dashboards/ChildDashboard/Analytics/BasicLineChart';
import LoadingSkeleton from "../../../Components/Dashboards/ChildDashboard/LoadingSkeleton"
import { GoProject, GoTasklist } from 'react-icons/go';
import { useAPI } from '../../../Context/APIContext';

const MainDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('all'); // State to track dropdown selection
  const {mainDashboard}=useAPI();
  const [data,setData]=useState(null);
  const [loading, setLoading]=useState(false);
  useEffect(()=>{
    setLoading(true)
    mainDashboard(selectedOption)
    .then((res)=>{
      console.log("Main Dashbaord Data is :", res);
      setData(res.data)
    })
    .catch((err)=>{
      console.log("Error is :", err);
      
    })
    .finally(()=>{
      setLoading(false);
    })
  },[selectedOption])
  
  return (
    <div className="p-8">
      {
        loading?
        <LoadingSkeleton /> :
        data?
        <div >
            <h1 className='text-2xl font-semibold my-2'>Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
              <RegularCard
                data={{
                  icon: FaUsers,
                  bgColor: '#2ca907a8',
                  heading: 'Total Employees',
                  para: data?.TotalEmployees
                }}
              />
              <RegularCard
                data={{
                  icon: GoProject,
                  bgColor: '#c99d289e',
                  heading: 'Total Projects',
                  para: data?.TotalProjects
                }}
              />
              <RegularCard
                data={{
                  icon: GoTasklist,
                  bgColor: '#0428f28f',
                  heading: 'Total Tasks',
                  para: data?.TotalTasks
                }}
              />
            </div>
            <div className="my-4">
              <div className="flex justify-between items-center">
                <h3 className='text-xl font-semibold'>Statistic Reports</h3>
                <select
                  className="border border-gray-100 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedOption} 
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
                <div className="p-4">
                  <h2 className='text-lg ms-3 font-semibold'>
                    Employees
                  </h2>
                  <BasicLineChart data={data?.employeeCounts} /> 
                </div>
                <div className="p-4">
                  <h2 className='text-lg ms-3 font-semibold'>
                    Projects
                  </h2>
                  <BasicLineChart data={data?.projectCounts} />
                </div>
                <div className="p-4">
                  <h2 className='text-lg ms-3 font-semibold'>
                    Tasks
                  </h2>
                  <BasicLineChart data={data?.taskCounts} />
                </div>
              </div>
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

export default MainDashboard