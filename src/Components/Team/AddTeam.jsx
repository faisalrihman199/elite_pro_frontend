import React, { useEffect, useState } from 'react'
import EmployeeList from '../Employee/EmployeesList';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineTeam } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { useAPI } from '../../Context/APIContext';
import { useForm } from 'react-hook-form'; // Import useForm hook
import { FadeLoader, SyncLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const AddTeam = ({ toggleModal }) => {
    const [newGroup, setNewGroup] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading,setLoading]=useState(0);
    const { employeesList,addTeam } = useAPI();
    
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();  // Initialize useForm hook

    // Fetch employees data
    useEffect(() => {
        setLoading(2)
        employeesList(1, 'all')
            .then((res) => {
                console.log("Response is :", res);
                setEmployees(res.data.employees);
            })
            .catch((err) => {
                console.log("Error is :", err);
            })
            .finally(()=>{
                setLoading(0);
            })
    }, []);

    const toggleContactInGroup = (contactId) => {
        setNewGroup((prevGroup) =>
            prevGroup.includes(contactId)
                ? prevGroup.filter(id => id !== contactId)
                : [...prevGroup, contactId]
        );
    };

    // Filter employees based on the search query
    const filteredEmployees = employees.filter((employee) =>
        (employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.department.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Handle the form submission
    const onSubmit = (data) => {
        const teamData = {
            name: data.teamName,
            description: data.teamDescription,
            members: newGroup,
        };
        console.log("Registering team with data:", teamData);
        setLoading(1);
        addTeam(teamData)
        .then((res)=>{
            if(res.success){
                toast.success(res.message);
            }
            else{
                toast.error(res.message)
            }
        })
        .catch((err)=>{
            console.log("Error :", err);
            toast.error(err.response.data.message || "Error while creating team")
            
        })
        .finally(()=>{
            setLoading(0);
            toggleModal(); 
        })

    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg md:w-1/3 sm:w-full">
                {/* Close Button (cross icon) */}
                <button
                    onClick={toggleModal}
                    className=" text-xl text-gray-600 w-full flex justify-end"
                >
                    <FaTimes color='red' />
                </button>

                <h2 className="text-2xl font-semibold mb-4">Create New Team</h2>

                {/* Team Name Input */}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className="relative w-full my-2 bg-white">
                        <input
                            type="text"
                            placeholder="Team Name"
                            {...register('teamName', { required: 'Team name is required' })}
                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none"
                        />
                        <AiOutlineTeam className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 " size={20} color="#8d8d8d" />
                    </div>
                    {errors.teamName && <p className="text-red-500 text-sm">{errors.teamName.message}</p>}

                    {/* Team Description Input */}
                    <div className="relative w-full my-2 bg-white">
                        <textarea
                            placeholder="Team Description"
                            {...register('teamDescription', { required: 'Team description is required' })}
                            className="w-full p-2 border rounded-lg focus:outline-none"
                            rows="4"
                        />
                    </div>
                    {errors.teamDescription && <p className="text-red-500 text-sm">{errors.teamDescription.message}</p>}

                    {/* Search Input */}
                    <div className="relative w-full my-2 bg-white">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none"
                        />
                        <BiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 " size={20} color="#8d8d8d" />
                    </div>

                    {/* Employee List Component */}
                    {
                        loading===2 ?
                        <div className="flex justify-center ">
                            <FadeLoader />
                        </div>
                        :
                        <EmployeeList
                        newGroup={newGroup}
                        allEmployees={filteredEmployees}
                        toggleContactInGroup={toggleContactInGroup}
                        />

                    }
                    

                    {/* Register Team Button */}
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-site w-full rounded-lg text-white p-3"
                        >
                            {
                  loading===1 ?
                    <SyncLoader color="white" /> :
                    "Register Team"
                }
                            
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTeam;
