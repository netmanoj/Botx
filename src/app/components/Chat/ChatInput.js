'use client';

import { Send, Save } from 'lucide-react';

export default function ChatInput({ message, setMessage, sendMessage, loading, onSave }) {
  return (
    <div className="p-4 bg-white shadow-sm">
      <div className="flex gap-2 w-full max-w-3xl mx-auto">
        <input
          className="flex-1 bg-gray-100 text-gray-900 placeholder-gray-500 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all disabled:bg-gray-400"
          onClick={sendMessage} 
          disabled={loading}
        >
          <Send size={20} />
        </button>
        <button 
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all"
          onClick={onSave}
        >
          <Save size={20} />
        </button>
      </div>
    </div>
  );
}