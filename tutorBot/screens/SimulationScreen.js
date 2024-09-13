import React, { useMemo, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { styles } from '../styles/styles';
import { prompts } from '../prompts';
import { useChat } from '../hooks/useChat';

const MemoizedChatMessage = React.memo(({ role, content }) => (
  <Text style={role === 'user' ? styles.userText : role === 'assistant' ? styles.botText : styles.systemText}>
    {content}
  </Text>
));

const SimulationScreen = React.memo(() => {
  const { userInput, setUserInput, chatHistory, handleSend, scrollViewRef } = useChat(prompts.Simulation.system);

  const memoizedChatHistory = useMemo(() => (
    chatHistory.slice(1).map(({ role, content }, index) => (
      <MemoizedChatMessage key={index} role={role} content={content} />
    ))
  ), [chatHistory]);

  const handleUserInput = useCallback((text) => {
    setUserInput(text);
  }, [setUserInput]);

  const handleSendPress = useCallback(() => {
    handleSend();
  }, [handleSend]);

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
          <Text style={styles.systemText}>{prompts.Simulation.summary}</Text>
          {memoizedChatHistory}
        </ScrollView>
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your message"
        />
        <Button title="Send" onPress={handleSendPress} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
});

export default SimulationScreen;
