import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {SyncLoader} from "react-spinners"
import { useForm } from "react-hook-form";
import backgroundImage from "../../assets/Images/Auth/LoginBg.webp"; 
import SideIcon from "../../assets/Icons/SideIcon1.svg"; 
import { useAPI } from "../../Context/APIContext";
import { toast } from "react-toastify";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading,setLoading]=useState(false);
  const {sendOtp}=useAPI();
  const navigate=useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    sendOtp({email:data.email})
    .then((res)=>{
      if(res.success){
        toast.success(res.message);
        navigate('/verify_otp', {state:data})
      }
      else{
        toast.error(res.message);
      }
    })
    .catch((err)=>{
      console.log("Error :", err);
      toast.error("Error while Sending OTP");
    })
    .finally(()=>{
        setLoading(false)
    })

  };

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
          className="flex items-center mb-2 text-3xl font-semibold text-white"
        >
          <img
            className="w-30 h-30 mr-3"
            src={SideIcon}
            alt="logo"
          />
        </Link>
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg md:mt-0 xl:p-10" style={{width:'600px', maxWidth:'90vw'}}>
          <div className="px-8 py-3 ">
            <h1 className="text-2xl font-bold tracking-tight text-gray-800">
              Create a new account
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Name Row */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-800"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  placeholder="Your name"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              {/* Email & Password Row */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-800"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    placeholder="name@company.com"
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-800"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                      {...register('password', { required: 'Password is required' })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>
              </div>

              {/* Phone & Website Row */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-800"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    placeholder="Your phone number"
                    {...register('phone', { required: 'Phone is required' })}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                </div>

                <div>
                  <label
                    htmlFor="website"
                    className="block mb-2 text-sm font-medium text-gray-800"
                  >
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    id="website"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    placeholder="www.example.com"
                    {...register('website', { required: 'Website is required' })}
                  />
                  {errors.website && <p className="text-sm text-red-500">{errors.website.message}</p>}
                </div>
              </div>

              {/* Address Row */}
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-800"
                >
                  Address
                </label>
                <textarea
                  name="address"
                  id="address"
                  rows="2"
                  className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  placeholder="Your address"
                  {...register('address', { required: 'Address is required' })}
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-100 focus:ring-3 focus:ring-primary-300"
                      {...register('terms', { required: 'You must agree to the terms' })}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-600">
                      Agree to terms and conditions
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-site focus:ring-4 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {
                  loading ?
                  <SyncLoader color="white" />
                  :
                  'Sign up'
                }
                
              </button>
              <p className="text-sm font-light text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
