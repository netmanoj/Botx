'use client';

import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { Edit, Copy } from 'lucide-react';

export default function MessageBubble({ message, onEdit, onCopy }) {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-500'}`}>
          <span className="text-white text-sm">
            {message.sender === 'user' ? 'U' : 'B'}
          </span>
        </div>

        {/* Message Bubble */}
        <div className={`w-[80%] p-3 rounded-xl ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {message.text}
          </ReactMarkdown>
          <div className="flex gap-2 mt-2">
            {message.sender === 'user' && (
              <button 
                className="text-gray-300 hover:text-gray-500"
                onClick={onEdit}
              >
                <Edit size={16} />
              </button>
            )}
            <button 
              className="text-gray-300 hover:text-gray-500"
              onClick={onCopy}
            >
              <Copy size={16} />
            </button>
          </div>
          <p className="text-xs mt-1 text-gray-300">{message.timestamp}</p>
        </div>
      </div>
    </div>
  );
}