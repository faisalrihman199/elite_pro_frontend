import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import backgroundImage from "../../assets/Images/Auth/LoginBg.webp";
import SideIcon from "../../assets/Icons/SideIcon1.svg";
import { toast } from "react-toastify";
import { useAPI } from "../../Context/APIContext";
import { SyncLoader } from "react-spinners";

function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useAPI();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    console.log(data);

    setLoading(true);


    login(data)
      .then((res) => {
        if (res.success) {
          localStorage.setItem('user', JSON.stringify(res.data));
          
            res.data.role==='admin'?navigate('/dashboard'):navigate('/dashboard/one_employee')
        }
        else{
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log("Error :", err);

        toast.error(`${err.response.data.message}`)
      })
      .finally(() => {
        setLoading(false);
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
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg md:mt-0 xl:p-10" style={{ width: '600px', maxWidth: '90vw' }}>
          <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-800">
              Sign in to your account
            </h1>
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
              
              <button
                type="submit"
                className="w-full bg-site focus:ring-4 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {
                  loading 
                  ?
                    <SyncLoader color="white" />
                     :

                    "Sign in"
                }

              </button>
              <div className="flex flex-wrap justify-between ">
                <p className="text-sm font-light text-gray-600">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
                <Link
                  to="/forgot"
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Forgot password?
                </Link>

              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
