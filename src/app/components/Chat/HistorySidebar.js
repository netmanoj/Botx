'use client';

import { useEffect, useState } from 'react';
import { X, UserCircle, MessageSquare, LogOut, ChevronLeft } from 'lucide-react';
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
    <div className="h-full bg-violet-50 border-r-4 border-black flex flex-col">
      {/* Header */}
      <div className="p-6 flex-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg border-4 border-black bg-purple-400 flex-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover-rotate">
            <MessageSquare size={20} className="text-black" />
          </div>
          <h2 className="h3">History</h2>
        </div>
        <button 
          onClick={onClose} 
          className="neu-button p-2 bg-red-400 hover:bg-red-300 xl:hidden"
          title="Close sidebar"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {conversations.length === 0 ? (
          <div className="neu-card bg-white p-4 text-center">
            <p className="font-medium text-gray-600">No conversations yet</p>
            <p className="text-sm text-gray-500 mt-1">Start chatting to create one!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {conversations.map((convo, index) => (
              <div
                key={index}
                className="neu-card p-4 cursor-pointer bg-white hover:bg-violet-100 group transition-colors"
                onClick={() => onSelect(convo)}
              >
                <div className="flex-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-black text-lg truncate">Chat {index + 1}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{convo.summary}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(index);
                    }}
                    className="neu-button p-1.5 bg-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-300"
                    title="Delete conversation"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Profile Section */}
      <div className="p-4 space-y-4 border-t-4 border-black bg-white">
        <div
          className="neu-card bg-violet-400 cursor-pointer p-4 hover:bg-violet-300 transition-colors"
          onClick={() => setIsProfileOpen(true)}
        >
          <div className="flex-between gap-3">
            <div className="w-12 h-12 rounded-lg border-4 border-black bg-white flex-center hover-rotate">
              <UserCircle size={24} className="text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate">{userEmail || 'Not Signed In'}</p>
              <p className="text-sm text-black text-opacity-75">View Profile</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="neu-button w-full bg-red-400 hover:bg-red-300 transition-colors flex-center gap-2"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex-center z-50 p-4">
          <div className="neu-card bg-white max-w-sm w-full mx-auto animate-scale-up">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-lg border-4 border-black bg-violet-400 flex-center mb-4 hover-rotate">
                <UserCircle size={40} className="text-black" />
              </div>
              <h2 className="h3 mb-4">User Profile</h2>
              <p className="text-body mb-6">
                <strong>Email:</strong> {auth.currentUser?.email}
              </p>
              <button
                onClick={() => setIsProfileOpen(false)}
                className="neu-button w-full bg-red-400 hover:bg-red-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
