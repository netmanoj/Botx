// src/app/components/Chat/Chat.js
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

  // Load chat history from Firestore when the component mounts
  useEffect(() => {
    const loadConversations = async () => {
      const storedChats = await loadConversationsFromFirestore();
      setConversations(storedChats);
    };
    loadConversations();
  }, []);

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat]);

  // Send message to the bot
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

  // Save the current conversation to Firestore
  const saveConversation = async () => {
    if (currentChat.length === 0) {
      alert('No messages to save!');
      return;
    }
    const summary = summarizeConversation(currentChat);
    const conversation = { chat: currentChat, summary };
    await saveConversationToFirestore(conversation);
    setConversations([...conversations, conversation]);
    setCurrentChat([]);
  };

  // Delete a conversation
  const deleteConversation = (index) => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      const updatedConversations = conversations.filter((_, i) => i !== index);
      setConversations(updatedConversations);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 relative">
      {/* History Sidebar Toggle Button */}
      {!showHistory && (
        <button 
          className="fixed top-4 left-4 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition shadow-lg z-50"
          onClick={() => setShowHistory(true)}
        >
          <Menu size={20} />
        </button>
      )}

      {/* History Sidebar */}
      {showHistory && (
        <HistorySidebar
          conversations={conversations}
          onSelect={(chat) => setCurrentChat(chat.chat)}
          onDelete={deleteConversation}
          onClose={() => setShowHistory(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Chat Header */}
        <ChatHeader />

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
            <div className="flex justify-start">
              <div className="bg-gray-200 p-3 rounded-xl w-[80%]">
                <p>Thinking...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <ChatInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          loading={loading}
          onSave={saveConversation}
        />
      </div>
    </div>
  );
}