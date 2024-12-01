import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
const APIContext = createContext();

const APIProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const server = import.meta.env.VITE_APP_API_URL;
  console.log("Server is :", server);

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

  const login = async (data) => {
    const response = await axios.post(`${server}/login`, data);
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


   //Team
   const addTeam = async (data) => {
    console.log("Payload being sent:", data); // Debugging log
    const response = await axios.post(`${server}/teams/create`, data, getConfig());
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



  const provider = {


    //Auth
    login, signup, sendOtp, RegisterWithVerification,isAdmin, getUser,getConfig,verifyOtp,

    //Employeees
    addEmployee,employeesList,

    //Teams
    addTeam,

    //Projects
    projectsDashboard,

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
