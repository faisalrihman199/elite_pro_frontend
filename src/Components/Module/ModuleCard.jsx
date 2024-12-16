import React, { useState } from 'react';
import { FaCalendarAlt, FaEdit, FaTasks } from 'react-icons/fa';
import { MdOutlineCloudDone } from 'react-icons/md';
import { useAPI } from '../../Context/APIContext';
import { toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const ModuleCard = ({ key, module }) => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [loading, setLoading] = useState(false);
    
    const [submissionData, setSubmissionData] = useState({
        completionPercentage: '',
        completionFile: null,
    });
    const { updateModule,getUser } = useAPI();
    const isAdmin=getUser()?.role==='admin'
    const navigate=useNavigate();

    const getProgressColor = (progress) => {
        if (progress <= 30) return 'bg-red-600';
        if (progress < 60) return 'bg-orange-400';
        if (progress < 80) return 'bg-green-600';
        return 'bg-site';
    };

    const handleFileChange = (event) => {
        setSubmissionData((prev) => ({ ...prev, completionFile: event.target.files[0] }));
    };


    const handleSubmit = () => {
        console.log('Submitted Data:', submissionData);
        submissionData.completionPercentage='100';
        let formData=new FormData();
        formData.append('completionFile',submissionData.completionFile);
        formData.append('completionPercentage',submissionData.completionPercentage);
        setLoading(true);
        updateModule(formData, module.id)
            .then((res) => {
                console.log(res);
                if (res.success) {
                    toast.success(res.message)
                    setIsModalOpen(false);
                }
                else {
                    toast.error(res.message)
                }
            })
            .catch((err) => {
                console.log("Error :", err);

            })
            .finally(() => {
                setLoading(false)
            })
    };

    return (
        <div key={key} className="mb-4 p-4 border rounded-lg bg-gray-50 w-full">
            <div className="flex flex-wrap justify-between items-center mb-4">
                <h5 className="text-lg flex items-center font-semibold text-gray-800">
                    {module.name} 
                    {
                        isAdmin && 
                        <FaEdit className="mx-2 cursor-pointer" onClick={()=>{
                            navigate('/dashboard/add_module', { state: { moduleId: module.id } });
                        }} />
                    }
                    <MdOutlineCloudDone
                        size={20}
                        color="green"
                        className="mx-1 cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    />
                </h5>

                <div className="flex items-center text-gray-600">
                    <FaTasks className="mr-2" />
                    {module.employees[0] && (
                        <span>
                            {module.employees[0].firstName} {module.employees[0].lastName}
                        </span>
                    )}
                </div>
            </div>

            {/* Module Dates */}
            <div className="text-gray-600 mb-4 flex flex-wrap items-center">
                <FaCalendarAlt className="mr-2" />
                <span className="text-sm sm:text-base">
                    {new Date(module.startDate).toLocaleDateString()} -{' '}
                    {new Date(module.endDate).toLocaleDateString()}
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-400">
                <div
                    className={`${getProgressColor(
                        module.completionPercentage
                    )} text-xs font-medium text-white text-center p-0.5 leading-none rounded-full`}
                    style={{ width: `${module.completionPercentage}%` }}
                >
                    {module.completionPercentage}%
                </div>
            </div>
            <div className="text-gray-600 my-2">{module.completionPercentage}% completed</div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Module Submission</h2>
                        {/* <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Completion Percentage
                            </label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border rounded-lg"
                                value={submissionData.percentage}
                                onChange={handleInputChange}
                                placeholder="Enter percentage"
                            />
                        </div> */}
                        <div className="mb-4">
                            <label className="block mb-2 font-medium text-gray-700">
                                Upload Completion File
                            </label>
                            <input
                                type="file"
                                className="w-full px-3 py-2 border rounded-lg"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded-lg mr-2"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                onClick={handleSubmit}
                            >
                                {
                                    loading ?
                                        <SyncLoader color="white" /> :
                                        'Submit'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModuleCard;
