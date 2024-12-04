import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAPI } from "../../Context/APIContext";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { useLocation } from "react-router-dom";

function EmployeeForm() {
  const location=useLocation();
  const isSetting=location.pathname.includes('setting');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, watch,setValue,reset, formState: { errors } } = useForm();
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading,setLoading]=useState(false);
  const password = watch('password');
  const {addEmployee}=useAPI();
  const onSubmit = (data) => {
    delete data.confirmPassword;
    let formData =new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
      
    }
    setLoading(true);
    addEmployee(formData)
    .then((res)=>{
      if(res.success){
        toast.success(res.message);
        reset();
        setProfilePicture(null)
      }
      else{
        toast.error(res.message);
      }
    })
    .catch((err)=>{
      console.log("Error :", err);
      toast.error(err.response.data.message || "Error while Adding Employee");
    })
    .finally(()=>{
      setLoading(false);
    })
    
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue('file', file);
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-cover bg-center rounded bg-gray-100"  >
      <div className="z-9 flex flex-col items-center justify-center px-6 py-2 mx-auto my-3 lg:py-0">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg md:mt-0 xl:p-10" style={{ width: '800px', maxWidth: '90vw' }}>
          <div className="px-8 py-3">

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-center my-7">
                <label htmlFor="profilePicture" className="cursor-pointer">
                  <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                    {profilePicture ? (
                      <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-500 text-sm">Upload Photo</span>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
              {/* First Name and Last Name */}
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-800">First Name</label>
                  <input
                    type="text"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    placeholder="First name"
                    {...register('firstName', { required: 'First name is required' })}
                  />
                  {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <label className="block mb-2 text-sm font-medium text-gray-800">Last Name</label>
                  <input
                    type="text"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    placeholder="Last name"
                    {...register('lastName', { required: 'Last name is required' })}
                  />
                  {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                </div>
              </div>

              {/* Email and CNIC */}
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-800">Email</label>
                  <input
                    type="email"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    placeholder="name@example.com"
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-800">CNIC</label>
                  <input
                    type="text"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    placeholder="0000 - 00000000 - 0"
                    {...register('cnic', { required: 'CNIC is required' })}
                  />
                  {errors.cnic && <p className="text-sm text-red-500">{errors.cnic.message}</p>}
                </div>

              </div>

              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-800">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                      placeholder="••••••••"
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

                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <label className="block mb-2 text-sm font-medium text-gray-800">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                      placeholder="••••••••"
                      {...register('confirmPassword', {
                        required: 'Confirm Password is required',
                        validate: (value) =>
                          value === password || 'Passwords do not match',
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>


              {/* Phone and Date of Birth */}
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-800">Phone</label>
                  <input
                    type="text"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    placeholder="+1234567890"
                    {...register('phone', { required: 'Phone is required' })}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <label className="block mb-2 text-sm font-medium text-gray-800">Date of Birth</label>
                  <input
                    type="date"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    {...register('dob', { required: 'Date of birth is required' })}
                  />
                  {errors.dob && <p className="text-sm text-red-500">{errors.dob.message}</p>}
                </div>
              </div>

              {/* Department and Designation */}
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-800">Department</label>
                  <input
                    type="text"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    placeholder="Department"
                    {...register('department', { required: 'Department is required' })}
                  />
                  {errors.department && <p className="text-sm text-red-500">{errors.department.message}</p>}
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <label className="block mb-2 text-sm font-medium text-gray-800">Designation</label>
                  <input
                    type="text"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    placeholder="Designation"
                    {...register('designation', { required: 'Designation is required' })}
                  />
                  {errors.designation && <p className="text-sm text-red-500">{errors.designation.message}</p>}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-800">Address</label>
                <textarea
                  rows="2"
                  className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  placeholder="123 Elm Street, Springfield, IL"
                  {...register('address', { required: 'Address is required' })}
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
              </div>

              <button type="submit" className="w-full bg-site focus:ring-4 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              {
                  loading ?
                    <SyncLoader color="white" /> :
                    isSetting?'Update Profile':"Add Employee"
                }
                
                
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeForm;
