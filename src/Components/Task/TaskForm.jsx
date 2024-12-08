import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAPI } from "../../Context/APIContext";
import { FadeLoader, SyncLoader } from "react-spinners";
import { TbUsersPlus } from "react-icons/tb";
import AddTeam from "../Team/AddTeam";
import TeamCard from "../Team/TeamCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function TaskForm() { 
  
  const { register, handleSubmit,setValue, getValues, watch,reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(0);
  const { teamsList, addTask,oneTask } = useAPI();
  const [teams, setTeams] = useState([]);
  const [projectId, setProjectId] = useState(sessionStorage.getItem('addingProject') || null)
  const selectedTeam = teams?.find(team => team?.id.toString() === watch('teamId'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate=useNavigate();
  const [prevData,setPrevData]=useState({})
  const location = useLocation();
  const taskId=location.state;
  
  useEffect(() => {
    if(taskId){
      oneTask(taskId)
        .then((res) => {
          console.log("Response :", res);
          const task = res?.data?.task;
          // Populate form fields with task data
          setValue('name', task.name || '');
          setValue('description', task.description || '');
          setValue('status', task.status || '');
          setValue('startDate', task.startDate ? new Date(task.startDate).toISOString().substring(0, 10) : '');
          setValue('endDate', task.endDate ? new Date(task.endDate).toISOString().substring(0, 10) : '');        
          setValue('teamId', task.Teams?.[0]?.id.toString() || '');
          // If needed, set other fields like projectId or progress
          setPrevData(task); // Store original task data for comparison if required
        })
        .catch((err) => {
          console.log("Error :", err);
        });
    }
  }, []);
  

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const onSubmit = (data) => {
    if(!taskId){
      data.projectId = projectId;
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
    addTask(formData,taskId)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          navigate('/dashboard/add_module',{state:res.data});
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




    // Handle task form submission logic here
  };
  useEffect(() => {
    setLoading(1);
    teamsList(1, null)
      .then((res) => {
        console.log("Teams :", res);
        setTeams(res.data.teamsWithMembers);
      })
      .catch((err) => {
        console.log("Error :", err);
      })
      .finally(() => {
        setLoading(0);
      })
  }, [])
  useEffect(() => {
    console.log("Selected Team is :", selectedTeam);
    
    
    setValue('teamId', selectedTeam?.id.toString());
  }, [selectedTeam])



  return (
    <section className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gray-100">
      <div className="z-9 flex flex-col items-center justify-center px-6 py-2 mx-auto my-3 lg:py-0">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg md:mt-0 xl:p-10" style={{ width: '800px', maxWidth: '90vw' }}>
          <div className="px-8 py-3">
            <h1 className="text-2xl font-bold tracking-tight text-gray-800">
              {
                taskId?
                "Update Task Data":
                'Add New Task'
              }
              
              </h1>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

              {/* Name and Team Name */}
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-800">Task Name</label>
                  <input
                    type="text"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    placeholder="Task Name"
                    {...register('name', { required: 'Task name is required' })}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <div className="flex justify-between">
                    <label className="block mb-2 text-sm font-medium text-gray-800">Team Name</label>
                    <TbUsersPlus size={20} className="cursor-pointer" onClick={toggleModal} />
                  </div>
                  <select
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    {...register('teamId', { required: 'Team is required' })}
                  >
                    <option value="">Select a team</option>
                    {
                      loading === 1 ?
                        <span className="flex justify-center" >
                          <FadeLoader />
                        </span>
                        :
                        teams?.length > 0 &&
                        teams.map((team, index) => (
                          <option key={index} value={team.id}>
                            {team.name}
                          </option>
                        ))

                    }
                  </select>
                  {errors.teamId && <p className="text-sm text-red-500">{errors.teamId.message}</p>}
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
                  placeholder="Task Description"
                  {...register('description', { required: 'Description is required' })}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
              </div>
              {
                selectedTeam &&

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-800">Selected Team</label>
                  <TeamCard team={selectedTeam} />

                </div>
              }

              {/* File Upload */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-800">Requirement File (.txt, .pdf, .doc)</label>
                <input
                  type="file"
                  className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  {...register('file', !taskId && { required: 'File is required' })}
                />
                {errors.file && <p className="text-sm text-red-500">{errors.file.message}</p>}
              </div>

              <div className="flex flex-wrap">

                <div className={`${taskId}?'w-full':'md:w-1/2 sm:w-full md:pe-2`} >
                  <button
                    type="submit"
                    className=" bg-site w-full my-2 focus:ring-4 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {
                  loading===2 ?
                    <SyncLoader color="white" /> :
                    taskId?
                    'Update Task' :
                    "Add Task"
                }
                    
                  </button>

                </div>
                {
                  !taskId &&
                  <div className="md:w-1/2 sm:w-full md:ps-2" >
                    <p
                      onClick={()=>{navigate('/dashboard/add_module')}}
                      className="cursor-pointer my-2 bg-site w-full focus:ring-4 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Finish Project Assignment
                    </p>

                  </div>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AddTeam toggleModal={toggleModal} />
      )}
    </section>
  );
}

export default TaskForm;
