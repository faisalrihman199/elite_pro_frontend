import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes, FaUserPlus } from "react-icons/fa";
import AddTeam from "../Team/AddTeam";
import EmployeeForm from "../Employee/EmployeeForm";
import { useAPI } from "../../Context/APIContext";
import { FadeLoader, SyncLoader } from "react-spinners";
import EmployeeCard from "../Employee/EmployeeCard";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function ModuleForm() {
  const location = useLocation();
  const data = location.state;
  console.log("Received Data :", data);

  const [file, setFile] = useState(null);
  const { register, handleSubmit,setValue, reset, watch, formState: { errors } } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(0);
  const [teamId, setTeamId] = useState(data?.teamId || null);
  const [employees, setEmployees] = useState([]);
  const [task, setTask] = useState(data?.task || null)
  const { getOneTeam, addModule,oneModule } = useAPI();
  const [prev,setPrev]=useState({})
  const moduleId=2;
  const selectedEmployee = employees?.find(employee => employee?.id.toString() === watch('employeeId'));

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    if (moduleId) {
      oneModule(moduleId)
        .then((res) => {
          console.log("Module Response:", res);
          const startDate = res.data.startDate ? new Date(res.data.startDate).toISOString().split('T')[0] : '';
          const endDate = res.data.endDate ? new Date(res.data.endDate).toISOString().split('T')[0] : '';
          if (res?.data) {
            // Use setValue to set the form values programmatically
            setValue('name', res.data.name || '');
            setValue('description', res.data.description || '');
            setValue('startDate', startDate);
            setValue('endDate', endDate);
            setEmployees(res.data.task.Teams[0].employees || []);
            setValue('employeeId', res?.data.employees[0].id);
            setValue('file', res.data.file || null);
            
          }
        })
        .catch((err) => {
          console.error("Error fetching module:", err);
        });
    }
  }, []);
  const onSubmit = (data) => {
    if(!moduleId){
      data.taskId = task.id;
    }
    let formData = new FormData();
    if(data.file){
      data.file = data.file[0];
    }
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    setLoading(2);
    addModule(formData, moduleId)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          reset();
        }
        else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log("Error :", err);
        toast.error(err.response.data.message || "Error while Adding Task");
      })
      .finally(() => {
        setLoading(0);
      })
  };


  useEffect(() => {
    if(teamId){
      setLoading(1);
      getOneTeam(teamId)
        .then((res) => {
          console.log("Team :", res);
          setEmployees(res.data.employees || []);
        })
        .catch((err) => {
          console.log("Error :", err);
        })
        .finally(() => {
          setLoading(0);
        })
    }
  }, [])


  return (
    <section className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gray-100">
      <div className="z-9 flex flex-col items-center justify-center px-6 py-2 mx-auto my-3 lg:py-0">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg md:mt-0 xl:p-10" style={{ width: '800px', maxWidth: '90vw' }}>
          <div className="px-8 py-3">
            <h1 className="text-2xl font-bold tracking-tight my-4 text-gray-800">
              {
                moduleId?
                "Update Module Data":
                `Add New Module | ${task?.name}`

              }
              
              </h1>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

              {/* Module Name and Module Number */}
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-800">Module Name</label>
                  <input
                    type="text"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    placeholder="Module Name"
                    {...register('name', { required: 'Module name is required' })}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <div className="flex justify-between">
                    <label className="block mb-2 text-sm font-medium text-gray-800">Employee Assignment</label>
                    <FaUserPlus size={20} className="cursor-pointer" onClick={toggleModal} />
                  </div>
                  <select
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    {...register('employeeId', { required: 'Employee Assignment is required' })}
                  >
                    <option value="">Select an Employee</option>
                    {
                      loading === 1 ?
                        <span className="flex justify-center" >
                          <FadeLoader />
                        </span>
                        :
                        employees?.length > 0 &&
                        employees.map((employee, index) => (
                          <option key={index} value={employee.id}>
                            {employee.firstName} {employee.lastName}
                          </option>
                        ))

                    }
                  </select>
                  {errors.employeeId && <p className="text-sm text-red-500">{errors.employeeId.message}</p>}
                </div>
              </div>

              {/* Start Date and End Date */}
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-800">Start Date</label>
                  <input
                    type="date"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    {...register('startDate', { required: 'Start date is required' })}
                  />
                  {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <label className="block mb-2 text-sm font-medium text-gray-800">End Date</label>
                  <input
                    type="date"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    {...register('endDate', { required: 'End date is required' })}
                  />
                  {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-800">Description</label>
                <textarea
                  rows="3"
                  className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  placeholder="Module Description"
                  {...register('description', { required: 'Description is required' })}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
              </div>
              {
                selectedEmployee &&

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-800">Selected Employee</label>
                  <EmployeeCard employee={selectedEmployee} />
                </div>
              }

              {/* File Upload */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-800">Requirement File</label>
                <input
                  type="file"
                  className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  {...register('file', !moduleId && { required: 'File is required' })}
                />
                {errors.file && <p className="text-sm text-red-500">{errors.file.message}</p>}
              </div>

              <div className="flex">

                <div className={`${!moduleId?'md:w-1/2':'w-full'} sm:w-full md:pe-2`} >
                  <button
                    type="submit"
                    className=" bg-site w-full focus:ring-4 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {
                      loading === 2 ?
                        <SyncLoader color="white" /> :
                        moduleId?
                        'Update Module':
                        "Add Module"
                    }

                  </button>

                </div>
                {
                  !moduleId &&
                    <div className="md:w-1/2 sm:w-full md:ps-2" >
                      <p
                        onClick={() => { navigate("/dashboard/add_task") }}
                        className="cursor-pointer bg-site w-full focus:ring-4 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Next Task
                      </p>

                    </div>
                }
              </div>
              {
                !moduleId &&

                <p
                  onClick={() => { navigate('/dashboard/add_module') }}
                  className="cursor-pointer my-2 bg-site w-full focus:ring-4 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Finish Project Assignment
                </p>
              }

            </form>
          </div>
        </div>
      </div>
      {
        isModalOpen &&
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto w-auto max-w-full">
            <button
              onClick={toggleModal}
              className="text-xl text-gray-600 w-full flex justify-end"
            >
              <FaTimes color="red" />
            </button>

            <h2 className="text-2xl font-semibold mb-4">Create New Member</h2>
            <EmployeeForm />
          </div>
        </div>


      }

    </section>
  );
}

export default ModuleForm;
