import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import backgroundImage from "../../assets/Images/Auth/LoginBg.webp"; 
import SideIcon from "../../assets/Icons/SideIcon1.svg"; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons for toggling password visibility
import { useAPI } from "../../Context/APIContext";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";

function ForgotPassword() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const {sendOtp}=useAPI();
  const onSubmit = (data) => {
    delete data.confirmPassword;
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Darker Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="#"
          className="flex items-center mb-8 text-3xl font-semibold text-white"
        >
          <img
            className="w-30 h-30 mr-3"
            src={SideIcon}
            alt="logo"
          />
        </Link>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg md:mt-0 xl:p-10" style={{width:'600px', maxWidth:'90vw'}}>
          <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-800">
              Forgot Password
            </h1>
            <p className="text-sm text-gray-600">
              Enter your email address, and we will send you an OTP to reset your password.
            </p>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-800"
                >
                  Your email
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

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-800"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 pr-10"
                    placeholder="Enter new password"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters long' }
                    })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-800"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 pr-10"
                    placeholder="Confirm your new password"
                    {...register('confirmPassword', { 
                      required: 'Please confirm your password',
                      validate: value => value === watch('password') || 'Passwords do not match'
                    })}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-3"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-site focus:ring-4 focus:ring-primary-300 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                 {
                  loading ?
                  <SyncLoader color="white" />
                  :
                  'Send OTP'
                }
              </button>
              <p className="text-sm font-light text-gray-600">
                Remembered your password?{" "}
                <Link
                  to="/"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
