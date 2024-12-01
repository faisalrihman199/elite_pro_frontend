import React from 'react';
import Avatar from "../../assets/Images/Dummy/Avatar.jpg"

const EmployeeList = ({ allEmployees, toggleContactInGroup, newGroup}) => {
  let server=(import.meta.env.VITE_APP_API_URL).split("/api")[0];
  
  
  return (
    <div>
      <div>
        { allEmployees.length>0 ?
         allEmployees.map((contact) => (
            <div
              key={contact.id}
              className="flex my-2 items-center p-1 px-2 hover:bg-gray-200 rounded-md justify-between cursor-pointer"
            >
              <div className="flex items-center">
                <img
                  src={contact.profile_image?`${server}/public/${contact.profile_image}`:Avatar}
                  alt="User Avatar"
                  className="mr-2 h-10 w-10 rounded-full object-cover"
                />
                {contact?.firstName} {contact?.lastName} | {contact.department}
              </div> 
                <label className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={newGroup.includes(contact.id)}
                    onChange={() => toggleContactInGroup(contact.id)}
                  />
                </label>
            </div>
          ))
         : (
          <div className="text-gray-500">No Employee available</div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
