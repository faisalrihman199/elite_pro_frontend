import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {SyncLoader} from "react-spinners"
import { useForm } from "react-hook-form";
import backgroundImage from "../../assets/Images/Auth/LoginBg.webp"; 
import SideIcon from "../../assets/Icons/SideIcon1.svg"; 
import { useAPI } from "../../Context/APIContext";
import { toast } from "react-toastify";
import SignupForm from "../../Components/Auth/SignupForm";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading,setLoading]=useState(false);
 

  return (
    <section
      className=" flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        
      }}
    >
      {/* Darker Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      {/* Content */}
      <div className=" z-10 flex flex-col items-center justify-center px-6 py-2 mx-auto my-3 lg:py-0">
        <Link
          to="#"
          className="flex items-center mb-0 text-3xl font-semibold text-white"
        >
          <img
            className="w-30 h-30 mr-3"
            src={SideIcon}
            alt="logo"
            style={{
              marginLeft:'-50px'
            }}
          />
        </Link>
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg md:mt-0 xl:p-10" style={{width:'600px', maxWidth:'90vw'}}>
          <div className="px-8 py-3 ">
            <h1 className="text-2xl font-bold tracking-tight text-gray-800">
              Create a new account
            </h1>
            <SignupForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
