import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ModuleForm() {
  const [file, setFile] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle module form submission logic here
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gray-100">
      <div className="z-10 flex flex-col items-center justify-center px-6 py-2 mx-auto my-3 lg:py-0">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg md:mt-0 xl:p-10" style={{ width: '800px', maxWidth: '90vw' }}>
          <div className="px-8 py-3">
            <h1 className="text-2xl font-bold tracking-tight text-gray-800">Add New Module</h1>
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
                  <label className="block mb-2 text-sm font-medium text-gray-800">Module Number</label>
                  <input
                    type="text"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    placeholder="Module Number"
                    {...register('number', { required: 'Module number is required' })}
                  />
                  {errors.number && <p className="text-sm text-red-500">{errors.number.message}</p>}
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

              {/* File Upload */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-800">Attachment</label>
                <input
                  type="file"
                  className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  onChange={handleFileChange}
                />
                {file && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-800">Uploaded File: <span className="font-semibold">{file.name}</span></p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-site focus:ring-4 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Add Module
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModuleForm;
