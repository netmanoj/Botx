'use client';

import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { Edit, Copy, User, Bot } from 'lucide-react';

export default function MessageBubble({ message, onEdit, onCopy }) {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} px-4 sm:px-6`}>
      <div className={`flex items-end gap-3 sm:gap-4 max-w-[90%] sm:max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-4 border-black flex items-center justify-center transform transition-transform hover:rotate-12 ${
          message.sender === 'user' ? 'bg-blue-400' : 'bg-purple-400'
        }`}>
          {message.sender === 'user' ? (
            <User size={16} className="text-black" />
          ) : (
            <Bot size={16} className="text-black" />
          )}
        </div>

        {/* Message Bubble */}
        <div className={`p-4 rounded-lg border-4 border-black ${
          message.sender === 'user' 
            ? 'bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
            : 'bg-purple-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
        }`}>
          <div className="prose prose-sm sm:prose-base max-w-none text-black">
            <ReactMarkdown 
              rehypePlugins={[rehypeHighlight]}
              components={{
                code: ({ node, inline, className, children, ...props }) => (
                  <code
                    className={`${className} p-1 rounded-md bg-black bg-opacity-10 text-black`}
                    {...props}
                  >
                    {children}
                  </code>
                ),
                pre: ({ node, children, ...props }) => (
                  <pre
                    className="p-4 rounded-lg border-2 border-black bg-black bg-opacity-10 overflow-x-auto"
                    {...props}
                  >
                    {children}
                  </pre>
                ),
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
          <div className="flex gap-2 mt-3 border-t-2 border-black border-opacity-20 pt-2">
            {message.sender === 'user' && (
              <button 
                className="p-1 hover:bg-black hover:bg-opacity-10 rounded transition-colors"
                onClick={onEdit}
                title="Edit message"
              >
                <Edit size={14} className="text-black" />
              </button>
            )}
            <button 
              className="p-1 hover:bg-black hover:bg-opacity-10 rounded transition-colors"
              onClick={onCopy}
              title="Copy message"
            >
              <Copy size={14} className="text-black" />
            </button>
            <span className="text-xs text-black font-medium ml-auto">{message.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}