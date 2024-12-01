import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import backgroundImage from "../../assets/Images/Auth/LoginBg.webp";
import SideIcon from "../../assets/Icons/SideIcon1.svg";
import { useAPI } from "../../Context/APIContext";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";

function VerifyOTP() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [resendTimer, setResendTimer] = useState(30); // 30-second countdown
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading]=useState(false)
  const {RegisterWithVerification,sendOtp}=useAPI();
  const location = useLocation();
  let data = location.state;
  
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);
  const navigate=useNavigate();
  const onSubmit = (dt) => {
    data.otp=dt.otp;
    const endpoint=data?.name?'registerCompany':'verifyForget';
    setLoading(true)
    RegisterWithVerification(data,endpoint)
    .then((res)=>{
      if(res.success){
        toast.success(res.message)
        navigate('/')
      }
      else{
        toast.error(res.message);
      }
    })
    .catch((err)=>{
      console.log("Error :", err);
      toast.error("Error while Registration")
    })
    .finally(()=>{
      setLoading(false)
    })

   

  };

  const handleResend = () => {
    setLoading(true)
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
        setCanResend(false);
      setResendTimer(30);
    })
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
              Verify OTP
            </h1>
            <p className="text-sm text-gray-600">
              We sent an OTP to <strong>{data && data.email}</strong>. Please enter it below.
            </p>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="otp"
                  className="block mb-2 text-sm font-medium text-gray-800"
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  placeholder="Enter OTP"
                  {...register('otp', { required: 'OTP is required' })}
                />
                {errors.otp && <p className="text-sm text-red-500">{errors.otp.message}</p>}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-site focus:ring-4 focus:ring-primary-300 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {
                  loading?
                  <SyncLoader color="white" />
                  :
                  'Verify OTP'
                } 
                
              </button>
            </form>
            
            {/* Resend OTP */}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
              <p>
                {canResend ? (
                  <button onClick={handleResend} className="text-primary-600 hover:underline">
                    Resend OTP
                  </button>
                ) : (
                  `Resend OTP in ${resendTimer}s`
                )}
              </p>
              {
                !data?.name &&
                <Link to="/forgot" className="text-primary-600 hover:underline">
                  Back to change email
                </Link>

              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerifyOTP;
