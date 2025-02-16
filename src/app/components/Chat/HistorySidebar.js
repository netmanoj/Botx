// src/app/components/Chat/HistorySidebar.js
'use client';

import { X } from 'lucide-react';
import { signOut } from '../../firebase/firebase';
import { auth } from '../../firebase/firebase'; // Import auth

export default function HistorySidebar({ conversations, onSelect, onDelete, onClose }) {
  const handleLogout = async () => {
    try {
      await signOut(auth); // Use auth here
      console.log('User signed out');
      onClose(); // Close the sidebar after logout
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full bg-white shadow-lg p-4 w-64 z-40 flex flex-col">
      {/* Close Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Chat History</h2>
        <button 
          onClick={onClose} 
          className="text-gray-600 hover:text-gray-800"
        >
          <X size={20} />
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <p className="text-gray-400">No past conversations</p>
        ) : (
          <ul className="space-y-2">
            {conversations.map((convo, index) => (
              <li
                key={index}
                className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 flex justify-between items-center"
                onClick={() => onSelect(convo)}
              >
                <div>
                  <p className="text-sm font-medium">Conversation {index + 1}</p>
                  <p className="text-xs text-gray-600">{convo.summary}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(index);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-4 w-full py-2 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        Logout
      </button>
    </div>
  );
}