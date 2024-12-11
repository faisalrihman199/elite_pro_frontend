import React, { useState } from 'react';
import { useAPI } from '../../Context/APIContext';

const Contacts = ({ contacts, grouping,toggleContactInGroup,newGroup,setNewChat }) => {
  
  const {getFilesPath}=useAPI();
  return (
    <div>
      <div>
        {contacts.map(contact => (
          <div key={contact.id} onClick={()=>{setNewChat(contact)}} className="flex my-2 items-center p-1 px-2 hover:bg-gray-200 rounded-md justify-between">
            <div className="flex items-center">
              <img
                src={contact?.profile_image? getFilesPath(contact?.profile_image):`https://randomuser.me/api/portraits/men/${contact.id}.jpg`}
                alt="User Avatar"
                className="mr-2 h-10 w-10 rounded-full object-cover"
              />
              {contact?.name}
            </div>
            {grouping && (
              <label className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={newGroup.includes(contact.id)}
                  onChange={() => toggleContactInGroup(contact.id)}
                />
              </label>
            )}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Contacts;
