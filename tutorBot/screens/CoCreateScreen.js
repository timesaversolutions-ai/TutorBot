import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { styles } from '../styles/styles';
import { prompts } from '../prompts';
import { useChat } from '../hooks/useChat';
import { useConversation } from '../hooks/useConversation';
// Add this import
import { setupEmbeddingSystem, retrieveRelevantSections } from '../utils/embeddingService';

const MemoizedChatMessage = React.memo(({ role, content }) => (
  <Text style={role === 'user' ? styles.userText : role === 'assistant' ? styles.botText : styles.systemText}>
    {content}
  </Text>
));

const CoCreateScreen = React.memo(({ route, navigation }) => {
  const { userId, userEmail, conversationId } = route.params;
  // Add usageData to the destructured values from useChat
  const { userInput, setUserInput, chatHistory, setChatHistory, handleSend, scrollViewRef, usageData } = useChat(prompts.CoCreate.system, { userId, userEmail });
  const { saveConversation, loadConversation, updateConversationHistory } = useConversation();
  const [currentConversationId, setCurrentConversationId] = useState(conversationId);
  // Add this state
  const [embeddedSections, setEmbeddedSections] = useState(null);

  const memoizedChatHistory = useMemo(() => (
    chatHistory.slice(1).map(({ role, content }, index) => (
      <MemoizedChatMessage key={index} role={role} content={content} />
    ))
  ), [chatHistory]);

  const handleUserInput = useCallback((text) => {
    setUserInput(text);
  }, [setUserInput]);

  const handleSendPress = useCallback(async () => {
    console.log('User Input:', userInput);

    if (embeddedSections) {
      console.log('Embedded sections available. Retrieving relevant sections...');
      const relevantSections = await retrieveRelevantSections(userInput, embeddedSections);
      console.log('Relevant Sections:', relevantSections.map(section => section.text));

      const contextualPrompt = relevantSections.map(section => section.text).join('\n\n');
      console.log('Contextual Prompt:', contextualPrompt);
      
      await handleSend(contextualPrompt);
    } else {
      console.log('No embedded sections available. Sending without context.');
      await handleSend();
    }

    if (currentConversationId) {
      await updateConversationHistory(currentConversationId, chatHistory);
    } else {
      const { id } = await saveConversation(userId, chatHistory, 'CoCreate');
      setCurrentConversationId(id);
    }
  }, [handleSend, currentConversationId, updateConversationHistory, saveConversation, userId, chatHistory, embeddedSections, userInput]);

  const handleNewConversation = useCallback(() => {
    setChatHistory([{ role: 'system', content: prompts.CoCreate.system }]);
    setCurrentConversationId(null);
  }, [setChatHistory]);

  useEffect(() => {
    if (usageData) {
      console.log('Latest usage data:', usageData);
    }
  }, [usageData]);

  useEffect(() => {
    console.log('Setting up embedding system...');
    setupEmbeddingSystem().then(result => {
      console.log(`Embedding system setup complete. Got ${result.length} embedded sections.`);
      setEmbeddedSections(result);
    }).catch(error => {
      console.error('Error setting up embedding system:', error);
    });
  }, []);

  useEffect(() => {
    if (usageData) {
      console.log('Latest usage data:', JSON.stringify(usageData, null, 2));
    }
  }, [usageData]);

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
          <Text style={styles.systemText}>{prompts.CoCreate.summary}</Text>
          {memoizedChatHistory}
        </ScrollView>
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your message"
        />
        <Button title="Send" onPress={handleSendPress} />
        <View style={styles.buttonContainer}>
          <Button title="New Conversation" onPress={handleNewConversation} />
          <Button title="View Conversations" onPress={() => navigation.navigate('ConversationList', { userId })} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
});

export default CoCreateScreen;
