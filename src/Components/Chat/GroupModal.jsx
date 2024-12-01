// GroupModal.js
import React, { useState } from 'react';

const GroupModal = ({ isOpen, onClose, onAddGroup, selectedChats }) => {
  const [groupName, setGroupName] = useState('');

  const handleSubmit = () => {
    if (groupName) {
      onAddGroup(groupName, selectedChats);
      setGroupName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-96">
        <h2 className="text-lg font-bold mb-2">Create Group</h2>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          className="w-full p-2 border rounded-lg mb-4"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded-lg"
        >
          Create Group
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 text-center text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default GroupModal;
