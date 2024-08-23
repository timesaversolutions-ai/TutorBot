import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { styles } from '../styles/styles';
import { OpenAI } from 'openai';
import { prompts } from '../prompts';
import { OPENAI_API_KEY } from '@env';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export default function CoCreateScreen() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const scrollViewRef = useRef();

  useEffect(() => {
    // Initialize chat history with the system prompt and predefined interactions
    const initialHistory = [
      { role: 'system', content: prompts.CoCreate.system },
      // hiding interactions until effective prompts have been tested
      // { role: 'user', content: prompts.Simulation.interactions[0].user }, // hidden
      // { role: 'assistant', content: prompts.Simulation.interactions[0].assistant }, // hidden
      // { role: 'user', content: prompts.Simulation.interactions[1].user }, // hidden
      // { role: 'assistant', content: prompts.Simulation.interactions[1].assistant }, // hidden
    ];
    setChatHistory(initialHistory);
  }, []);

  useEffect(() => {
    // Scroll to the bottom whenever chat history updates
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chatHistory]);

  const handleSend = async () => {
    try {
      const messages = chatHistory.map(({ role, content }) => ({ role, content }));
      messages.push({ role: 'user', content: userInput });
  
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 150,
      });
  
      const completionText = completion.choices[0].message.content;
  
      setChatHistory([...chatHistory, { role: 'user', content: userInput }, { role: 'assistant', content: completionText }]);
      setUserInput('');
    } catch (error) {
      console.error(error);
    }
  };  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90} // adjust this offset as needed
      >
      <ScrollView 
        style={styles.chatContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {/* Display the summary message directly in the UI */}
        <Text style={styles.systemText}>{prompts.CoCreate.summary}</Text>

        {/* Display the rest of the chat history, starting after the initial prompts */}
        {chatHistory.slice(1).map(({ role, content }, index) => (
          <Text key={index} style={role === 'user' ? styles.userText : role === 'assistant' ? styles.botText : styles.systemText}>
            {content}
          </Text>
        ))}
      </ScrollView>
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your message"
        />
        <Button title="Send" onPress={handleSend} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
