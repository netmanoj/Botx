import { MessageSquare, Sparkles } from 'lucide-react';

export default function ChatHeader() {
  return (
    <div className="p-6 bg-white border-b-4 border-black">
      <div className="neu-container flex-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg border-4 border-black bg-violet-400 flex-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover-rotate">
            <MessageSquare size={24} className="text-black" />
          </div>
          <div className="flex flex-col">
            <h1 className="h2 bg-gradient-to-r from-violet-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text">
              Cool Guy GPT
            </h1>
            <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
              <Sparkles size={14} className="text-yellow-500" />
              <span>Powered by LLM's</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}