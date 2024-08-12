import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { styles } from '../styles/styles';
import { OpenAI } from 'openai';
import { API_KEY } from '../config';

const openai = new OpenAI({ apiKey: API_KEY });

export default function SimulationScreen() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([{ role: 'system', content: "You've selected the Simulation service. In this service, you can practice your knowledge in a simulated environment. How would you like to begin?" }]);
  const [response, setResponse] = useState('');

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
      setResponse(completionText);
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
        keyboardVerticalOffset={110} // adjust this offset as needed
      >
        <ScrollView style={styles.chatContainer}>
          {chatHistory.map(({ role, content }, index) => (
            <Text key={index} style={role === 'user' ? styles.userText : role === 'assistant' ? styles.botText : styles.systemText}>
              {role}: {content}
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
        {response && <Text style={styles.responseText}>{response}</Text>}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
