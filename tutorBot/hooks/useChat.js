import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

export const useChat = (initialPrompt, fullSystemPrompt, user, selectedScreen, initialHistory = []) => {
  const [chatHistory, setChatHistory] = useState([
    ...initialHistory, 
    { role: 'system', content: `${initialPrompt}\n\nSelected screen: ${selectedScreen}` }
  ]);
  const [userInput, setUserInput] = useState('');
  const [usageData, setUsageData] = useState(null);
  const scrollViewRef = useRef();

  const handleSend = useCallback(async (contextualPrompt = '') => {
    try {
      const messages = [
        { role: 'system', content: `${fullSystemPrompt}\n\nSelected screen: ${selectedScreen}` },
        ...chatHistory.slice(1),  // Exclude the first system message from chatHistory
      ];
      if (contextualPrompt) {
        messages.push({ role: 'system', content: `Consider this context: ${contextualPrompt}` });
      }
      messages.push({ role: 'user', content: userInput });

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 1500,
        temperature: .25,
      }, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const completionText = response.data.choices[0].message.content;
      setUsageData(response.data.usage);

      const newChatHistory = [...chatHistory, { role: 'user', content: userInput }, { role: 'assistant', content: completionText }];
      setChatHistory(newChatHistory);
      setUserInput('');

      return newChatHistory; // Return the updated chat history
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  }, [chatHistory, userInput, fullSystemPrompt, selectedScreen, setChatHistory, setUserInput, setUsageData]);

  return {
    userInput,
    setUserInput,
    chatHistory,
    setChatHistory,
    handleSend,
    scrollViewRef,
    usageData,
  };
};
