'use client';

import { Send, Save } from 'lucide-react';

export default function ChatInput({ message, setMessage, sendMessage, loading, onSave }) {
  return (
    <div className="p-6 bg-white border-t-4 border-black">
      <div className="neu-container">
        <div className="flex gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <input
              className="neu-input pr-24 sm:pr-32"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
              <button 
                className="neu-button p-2 bg-violet-400 hover:bg-violet-300 disabled:bg-gray-200"
                onClick={sendMessage} 
                disabled={loading}
                title="Send message"
              >
                <Send size={20} className="text-black" />
              </button>
              <button 
                className="neu-button p-2 bg-pink-400 hover:bg-pink-300"
                onClick={onSave}
                title="Save conversation"
              >
                <Save size={20} className="text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}