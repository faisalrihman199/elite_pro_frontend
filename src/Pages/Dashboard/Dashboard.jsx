import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainDashboard from './DashboadChilds/MainDashboard';
import Sidebar from '../../Components/NavSide/Sidebar';
import EmployeeForm from '../../Components/Employee/EmployeeForm';
import ProjectForm from '../../Components/Project/ProjectForm';
import TaskForm from '../../Components/Task/TaskForm';
import ModuleForm from '../../Components/Module/ModuleForm';
import NotFound from '../Error/NotFound';
import EmployeesDashboard from './DashboadChilds/EmployeesDashboard';
import ProjectsDashboard from './DashboadChilds/ProjectsDashboard';
import TaskDashboard from './DashboadChilds/TaskDashboard';
import ModulesDashboard from './DashboadChilds/ModulesDashboard';
import TeamDashboard from './DashboadChilds/TeamDashboard';
import Navbar from '../../Components/NavSide/Nabar';
import OneProject from './DashboadChilds/OneProject';
import OneTeam from './DashboadChilds/OneTeam';
import OneEmployee from './DashboadChilds/OneEmployee';
import Settings from './DashboadChilds/Settings';

const Dashboard = () => {
  const onLogout=()=>{
    console.log("Please Logout");
    
  }
  
  return (
    <div className="flex flex-col">
      <Sidebar />
      <div className=" sm:ml-64 transition-all">
        <Navbar userName={"Faisal Malik"} onLogout={onLogout} />
        <div className="md:mt-16">
          <Routes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="/setting" element={<Settings />} />

            <Route path="/employees" element={<EmployeesDashboard />} />
            <Route path="/one_employee" element={<OneEmployee />} />
            <Route path="/teams" element={<TeamDashboard />} />
            <Route path="/one_team" element={<OneTeam />} />
            <Route path="/projects" element={<ProjectsDashboard />} />
            <Route path="/one_project" element={<OneProject />} />
            <Route path="/tasks" element={<TaskDashboard />} />
            <Route path="/modules" element={<ModulesDashboard />} />
            <Route path="/add_employee" element={<EmployeeForm />} />
            <Route path="/add_project" element={<ProjectForm />} />
            <Route path="/add_task" element={<TaskForm />} />
            <Route path="/add_module" element={<ModuleForm />} />
            <Route path="*" element={<NotFound />} />
    
          </Routes>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
