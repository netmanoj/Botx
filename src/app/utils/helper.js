// src/app/utils/helper.js
export const summarizeConversation = (chat) => {
    const userMessages = chat.filter((msg) => msg.sender === 'user').map((msg) => msg.text);
    const firstUserMessage = userMessages[0] || '';
  
    // Extract the first 3-5 words
    const words = firstUserMessage.split(' ').slice(0, 5).join(' ');
    const summary = `${words}...`;
    return summary;
  };