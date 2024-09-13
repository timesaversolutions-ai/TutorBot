import React from 'react';
import { View, Text, TextInput, ScrollView, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { styles } from '../styles/styles';
import { prompts } from '../prompts';
import { useChat } from '../hooks/useChat';

export default function TeachMeScreen() {
  const { userInput, setUserInput, chatHistory, handleSend, scrollViewRef } = useChat(prompts.TeachMe.system);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <ScrollView 
          style={styles.chatContainer}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          <Text style={styles.systemText}>{prompts.TeachMe.summary}</Text>
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
