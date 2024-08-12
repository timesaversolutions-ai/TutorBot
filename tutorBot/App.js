import React, { useState } from 'react';
import { Text, TextInput, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import { OpenAI } from 'openai';
import { styles } from './styles/styles';
import { API_KEY } from './config';

const openai = new OpenAI({
  apiKey: API_KEY
});

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [response, setResponse] = useState('');
  const [isPrompting, setIsPrompting] = useState(true);

  const handleServiceSelect = (service) => {
    let prompt = '';

    switch (service) {
      case 'Simulation':
        prompt = `You've selected the Simulation service. In this service, you can practice your knowledge in a simulated environment. How would you like to begin?`;
        break;
      case 'Critique/Teach':
        prompt = `You've selected the Critique/Teach service. This service helps you reinforce your understanding by teaching concepts to a simulated peer. What topic would you like to teach?`;
        break;
      case 'Co-Create':
        prompt = `You've selected the Co-Create service. Here, we collaborate to create explanations, scenarios, or projects. What would you like to create together?`;
        break;
      case 'Mentor/Coach':
        prompt = `You've selected the Mentor/Coach service. I'll guide and provide feedback to help you improve your skills. What would you like to focus on?`;
        break;
      default:
        prompt = `Welcome to our service. Please select an option to get started.`;
    }

    setChatHistory([{ role: 'system', content: prompt }]);
    setIsPrompting(false);
  };

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
    <View style={styles.container}>
      {isPrompting ? (
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>
            Please select one of the following services to get started:
          </Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => handleServiceSelect('Simulation')}>
            <Text style={styles.buttonText}>Simulation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => handleServiceSelect('Critique/Teach')}>
            <Text style={styles.buttonText}>Critique/Teach</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => handleServiceSelect('Co-Create')}>
            <Text style={styles.buttonText}>Co-Create</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => handleServiceSelect('Mentor/Coach')}>
            <Text style={styles.buttonText}>Mentor/Coach</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
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
        </>
      )}
    </View>
  );
}
