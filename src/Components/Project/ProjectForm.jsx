import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ProjectForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle project addition logic here
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gray-100">
      <div className="z-10 flex flex-col items-center justify-center px-6 py-2 mx-auto my-3 lg:py-0">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg md:mt-0 xl:p-10" style={{ width: '800px', maxWidth: '90vw' }}>
          <div className="px-8 py-3">
            <h1 className="text-2xl font-bold tracking-tight text-gray-800">Add New Project</h1>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

              {/* Project Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-800">Project Name</label>
                <input
                  type="text"
                  className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  placeholder="Project name"
                  {...register('name', { required: 'Project name is required' })}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              {/* Client Name and Client Email */}
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-800">Client Name</label>
                  <input
                    type="text"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    placeholder="Client name"
                    {...register('clientName', { required: 'Client name is required' })}
                  />
                  {errors.clientName && <p className="text-sm text-red-500">{errors.clientName.message}</p>}
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <label className="block mb-2 text-sm font-medium text-gray-800">Client Email</label>
                  <input
                    type="email"
                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    placeholder="client@example.com"
                    {...register('clientEmail', { required: 'Client email is required' })}
                  />
                  {errors.clientEmail && <p className="text-sm text-red-500">{errors.clientEmail.message}</p>}
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

              {/* Budget */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-800">Budget</label>
                <input
                  type="number"
                  className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  placeholder="Budget"
                  {...register('budget', { required: 'Budget is required' })}
                />
                {errors.budget && <p className="text-sm text-red-500">{errors.budget.message}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-800">Description</label>
                <textarea
                  rows="3"
                  className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  placeholder="Project description"
                  {...register('description', { required: 'Description is required' })}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
              </div>

              {/* File Upload */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-800">Requirement File</label>
                <input
                  type="file"
                  className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  {...register('requirementFile', { required: 'File is required' })}
                />
                {errors.requirementFile && <p className="text-sm text-red-500">{errors.requirementFile.message}</p>}
              </div>

              <button type="submit" className="w-full bg-site focus:ring-4 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Add Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectForm;
