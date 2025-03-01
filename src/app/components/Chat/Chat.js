'use client';

import { useState, useEffect, useRef } from 'react';
import { auth } from '../../firebase/firebase';
import { saveConversationToFirestore, loadConversationsFromFirestore } from '../../firebase/firestore';
import HistorySidebar from './HistorySidebar';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import { Menu } from 'lucide-react';
import { summarizeConversation } from '../../utils/helper';

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);
  const user = auth.currentUser;

  // Responsive sidebar handling
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1280) {
        setShowHistory(true);
      } else {
        setShowHistory(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Load conversations
  useEffect(() => {
    const loadConversations = async () => {
      if (user) {
        const storedChats = await loadConversationsFromFirestore(user.uid);
        setConversations(storedChats);
      }
    };
    loadConversations();
  }, [user]);

  // Scroll handling
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat]);

  // Message handling
  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    const userMessage = { text: message, sender: 'user', timestamp: new Date().toLocaleTimeString() };
    const updatedChat = [...currentChat, userMessage];
    setCurrentChat(updatedChat);
    setMessage('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      const botMessage = { text: data.response || 'No response received.', sender: 'bot', timestamp: new Date().toLocaleTimeString() };
      setCurrentChat([...updatedChat, botMessage]);
    } catch (error) {
      setCurrentChat([...updatedChat, { text: 'Error communicating with AI.', sender: 'bot', timestamp: new Date().toLocaleTimeString() }]);
    } finally {
      setLoading(false);
    }
  };

  // Conversation handling
  const saveConversation = async () => {
    if (currentChat.length === 0) {
      alert('No messages to save!');
      return;
    }
    const summary = summarizeConversation(currentChat);
    const conversation = { chat: currentChat, summary };
    if (user) {
      await saveConversationToFirestore(conversation, user.uid);
      setConversations([...conversations, conversation]);
      setCurrentChat([]);
    }
  };

  const deleteConversation = (index) => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      const updatedConversations = conversations.filter((_, i) => i !== index);
      setConversations(updatedConversations);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-violet-50">
      {/* Mobile Menu Button */}
      {!showHistory && (
        <button 
          className="fixed top-4 left-4 neu-button p-2 bg-violet-400 z-50 xl:hidden hover:bg-violet-300"
          onClick={() => setShowHistory(true)}
          title="Show chat history"
        >
          <Menu size={24} className="text-black" />
        </button>
      )}

      {/* History Sidebar - Fixed position on mobile, static on desktop */}
      <div className={`
        fixed inset-y-0 left-0 w-[320px] transform transition-transform duration-300 ease-in-out z-40
        ${showHistory ? 'translate-x-0' : '-translate-x-full'}
        xl:relative xl:translate-x-0 xl:transition-none
      `}>
        <HistorySidebar
          conversations={conversations}
          onSelect={(chat) => {
            setCurrentChat(chat.chat);
            if (window.innerWidth < 1280) {
              setShowHistory(false);
            }
          }}
          onDelete={deleteConversation}
          onClose={() => setShowHistory(false)}
        />
      </div>

      {/* Overlay for mobile sidebar */}
      {showHistory && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 xl:hidden"
          onClick={() => setShowHistory(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 w-full">
        <ChatHeader />

        {/* Chat Messages */}
        <div className="chat-container">
          <div className="message-group max-w-4xl mx-auto w-full">
            {currentChat.map((msg, index) => (
              <MessageBubble
                key={index}
                message={msg}
                onEdit={() => {
                  const updatedChat = [...currentChat];
                  updatedChat[index].text = prompt('Edit your message:', msg.text) || msg.text;
                  setCurrentChat(updatedChat);
                }}
                onCopy={() => navigator.clipboard.writeText(msg.text)}
              />
            ))}
            {loading && (
              <div className="flex justify-start px-4">
                <div className="neu-card bg-violet-200 p-4">
                  <p className="font-bold">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <div className="mt-auto">
          <ChatInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            loading={loading}
            onSave={saveConversation}
          />
        </div>
      </div>
    </div>
  );
}