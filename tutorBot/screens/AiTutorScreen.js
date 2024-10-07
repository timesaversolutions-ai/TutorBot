import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { styles } from '../styles/styles';
import { prompts } from '../prompts';
import { useChat } from '../hooks/useChat';
import { useConversation } from '../hooks/useConversation';
import { setupEmbeddingSystem, retrieveRelevantSections } from '../utils/embeddingService';

const MemoizedChatMessage = React.memo(({ role, content }) => (
  <Text style={role === 'user' ? styles.userText : role === 'assistant' ? styles.botText : styles.systemText}>
    {content}
  </Text>
));

const AiTutorScreen = React.memo(({ route, navigation }) => {
  const { userId, userEmail, conversationId } = route.params;
  const { userInput, setUserInput, chatHistory, setChatHistory, handleSend, scrollViewRef, usageData } = useChat(prompts.AiTutor.system, { userId, userEmail });
  const { saveConversation, loadConversation, updateConversationHistory } = useConversation();
  const [currentConversationId, setCurrentConversationId] = useState(conversationId);
  const [embeddedSections, setEmbeddedSections] = useState(null);

  useEffect(() => {
    if (conversationId) {
      loadConversation(conversationId).then(loadedHistory => {
        if (loadedHistory) {
          setChatHistory(loadedHistory);
        }
      });
    }
  }, [conversationId, loadConversation, setChatHistory]);

  useEffect(() => {
    if (usageData) {
      console.log('Latest usage data:', JSON.stringify(usageData, null, 2));
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

  const memoizedChatHistory = useMemo(() => (
    chatHistory.slice(1).map(({ role, content }, index) => (
      <MemoizedChatMessage key={index} role={role} content={content} />
    ))
  ), [chatHistory]);

  const handleSendPress = useCallback(async () => {
    console.log('User Input:', userInput); // Log user input

    if (embeddedSections) {
      console.log('Embedded sections available. Retrieving relevant sections...');
      const relevantSections = await retrieveRelevantSections(userInput, embeddedSections);
      console.log('Relevant Sections:', relevantSections.map(section => section.text)); // Log relevant sections

      const contextualPrompt = relevantSections.map(section => section.text).join('\n\n');
      console.log('Contextual Prompt:', contextualPrompt); // Log contextual prompt
      
      await handleSend(contextualPrompt);
    } else {
      console.log('No embedded sections available. Sending without context.');
      await handleSend();
    }

    if (currentConversationId) {
      await updateConversationHistory(currentConversationId, chatHistory);
    } else {
      const { id } = await saveConversation(userId, chatHistory, 'AiTutor');
      setCurrentConversationId(id);
    }
  }, [handleSend, currentConversationId, updateConversationHistory, saveConversation, userId, chatHistory, embeddedSections, userInput]);

  const handleNewConversation = useCallback(() => {
    setChatHistory([{ role: 'system', content: prompts.AiTutor.system }]);
    setCurrentConversationId(null);
  }, [setChatHistory]);

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
          <Text style={styles.systemText}>{prompts.AiTutor.summary}</Text>
          {memoizedChatHistory}
        </ScrollView>
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your message"
        />
        <View style={styles.buttonContainer}>
          <Button title="Send" onPress={handleSendPress} />
          <Button title="New Conversation" onPress={handleNewConversation} />
          <Button title="View Conversations" onPress={() => navigation.navigate('ConversationList', { userId })} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
});

export default AiTutorScreen;