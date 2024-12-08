import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
const APIContext = createContext();

const APIProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const server = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  const isAdmin=()=>{
    return user?.role==='admin';
  }
  const getUser=()=>{
    return user;
  }

  const getConfig = () => {
    return {
      headers: {
        Authorization: `Bearer ${user?.token}`,

      }
    };
  };
  const getFilesPath=(path)=>{
    return `${server.split("/api")[0]}/public/${path}`;
  }

  const login = async (data) => {
    const response = await axios.post(`${server}/login`, data);
    setUser(response?.data?.data);
    return response.data;
  };


  const verifyOtp = async (data) => {
    const response = await axios.post(`${server}/user/verifyOtp`, data);
    return response.data;
  };
  const sendOtp = async (data) => {
    const response = await axios.post(`${server}/company/sendOtp`, data);
    return response.data;
  };

  const RegisterWithVerification = async (data, endpoint) => {
    const response = await axios.post(`${server}/company/${endpoint}`, data);
    return response.data;
  };
  const signup = async (data) => {
    const response = await axios.post(`${server}/user/sendOtp`, data);
    return response.data;
  };


  //Employee
  const addEmployee = async (data) => {
    const response = await axios.post(`${server}/company/addEmployee`, data, getConfig());
    return response.data;
  };
  const employeesList=async (page, limit) => {
    let url=`${server}/company/getEmployees?page=${page}`;
    url=limit?`${url}&limit=${limit}`:url;
    const response = await axios.get(url, getConfig());
    return response.data;
  };
  const employeeDashboard = async (period) => {
    const response = await axios.get(`${server}/dashboard/employeeStats?period=${period}`, getConfig());
    return response.data;
  };
  const OneEmployee=async (id) => {
    let url=`${server}/employee/getInfo${id?`?employeeId=${id}`:''}`;  
    const response = await axios.get(url, getConfig());
    return response.data;
  };


   //Team
   const teamDashboard = async (period) => {
    const response = await axios.get(`${server}/dashboard/teamStats?period=${period}`, getConfig());
    return response.data;
  };
   const addTeam = async (data) => {
    console.log("Payload being sent:", data); // Debugging log
    const response = await axios.post(`${server}/teams/create`, data, getConfig());
    return response.data;
  };
  const teamsList=async (page, limit) => {
    let url=`${server}/teams/all?page=${page}`;
    url=limit?`${url}&limit=${limit}`:url;
    const response = await axios.get(url, getConfig());
    return response.data;
  };
  const getOneTeam=async (id) => {
    let url=`${server}/teams/getOneTeam/${id}`;  
    const response = await axios.get(url, getConfig());
    return response.data;
  };
  const oneTeam=async (id) => {
    const response = await axios.get(`${server}/teams/teamDashBoard?id=${id}`, getConfig());
    return response.data;
  };

  


  //Main Dashboard
  const mainDashboard = async (period) => {
    const response = await axios.get(`${server}/dashboard/mainDashboard?period=${period}`, getConfig());
    return response.data;
  };

  
  //Projects
  const projectsDashboard = async (period) => {
    const response = await axios.get(`${server}/dashboard/projectStats?period=${period}`, getConfig());
    return response.data;
  };
  const addProject = async (data) => {
    const response = await axios.post(`${server}/company/createProject`, data, getConfig());
    return response.data;
  };
  const oneProject=async (id) => {
    const response = await axios.get(`${server}/company/getOneProject?projectId=${id}`, getConfig());
    return response.data;
  };
  const allProjects=async (page) => {
    const response = await axios.get(`${server}/company/getProjects?page=${page}`, getConfig());
    return response.data;
  };



  //Tasks
  const addTask = async (data, taskId) => {
    const response = await axios.post(`${server}/company/createTask${taskId?`?id=${taskId}`:''}`, data, getConfig());
    return response.data;
  };
  const tasksDashboard = async (period) => {
    const response = await axios.get(`${server}/dashboard/taskStats?period=${period}`, getConfig());
    return response.data;
  };
  const allTasks=async (page) => {
    const response = await axios.get(`${server}/company/getAllTasks?page=${page}`, getConfig());
    return response.data;
  };
  const oneTask=async (id) => {
    const response = await axios.get(`${server}/company/getOneTask?taskId=${id}`, getConfig());
    return response.data;
  };

  //Modules
  const addModule = async (data,id) => {
    console.log("Data is :", Object.fromEntries(data));
    const response = await axios.post(`${server}/company/createModule${id?`?id=${id}`:''}`, data, getConfig());
    return response.data;
  };

  const modulesDashboard = async (period) => {
    const response = await axios.get(`${server}/dashboard/moduleStats?period=${period}`, getConfig());
    return response.data;
  };
  const allModules=async (page, id) => {
    const response = await axios.get(`${server}/company/getAllModules?page=${page}${id?`&employeeId=${id}`:''}`, getConfig());
    return response.data;
  };
  const oneModule=async (id) => {
    const response = await axios.get(`${server}/company/getOneModule?id=${id}`, getConfig());
    return response.data;
  };
  const profileData=async()=>{
    const response = await axios.get(`${server}/company/getUserData`, getConfig());
    return response.data;
  }



  const provider = {


    //Auth
    login, signup, sendOtp, RegisterWithVerification,isAdmin, getUser,getConfig,verifyOtp,getFilesPath,profileData,

    //Employeees
    addEmployee,employeesList,employeeDashboard,OneEmployee,

    //Teams
    addTeam,teamsList,getOneTeam,teamDashboard,oneTeam,

    //Projects
    projectsDashboard,addProject,oneProject,allProjects,

    //Tasks
    addTask,tasksDashboard,allTasks,oneTask,


    //Modules
    addModule,modulesDashboard,allModules,oneModule,

    //Main Dashboard
    mainDashboard,
  };

  return (
    <APIContext.Provider value={provider}>
      {children}
    </APIContext.Provider>
  );
};

const useAPI = () => useContext(APIContext);

export { APIProvider, useAPI };
