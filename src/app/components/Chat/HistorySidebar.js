'use client';

import { useEffect, useState } from 'react';
import { X, UserCircle } from 'lucide-react';
import { signOut } from '../../firebase/firebase';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function HistorySidebar({ conversations, onSelect, onDelete, onClose }) {
  const [userEmail, setUserEmail] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || 'No Email');
      } else {
        setUserEmail('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      onClose();
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full bg-white shadow-lg p-4 w-64 z-40 flex flex-col">
      {/* Close Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Chat History</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          <X size={20} />
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-grow overflow-y-auto">
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

      {/* Bottom Section */}
      <div className="mt-auto">
        {/* Profile Section (Clickable) */}
        <div
          className="p-3 bg-gray-100 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-gray-200"
          onClick={() => setIsProfileOpen(true)}
        >
          <UserCircle size={40} className="text-gray-500" />
          <p className="text-sm font-medium">{userEmail ? userEmail : 'Not Signed In'}</p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-2 w-full py-2 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          Logout
        </button>
      </div>

      {/* Profile Popup */}
      {isProfileOpen && (
        <div className="absolute bottom-12 left-0 w-64 bg-white shadow-lg rounded-lg p-4 z-50 border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">User Profile</h2>
          <p><strong>Email:</strong> {auth.currentUser?.email}</p>
          <button
            onClick={() => setIsProfileOpen(false)}
            className="mt-2 w-full py-1 px-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
