import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { styles } from '../styles/styles';
import { prompts } from '../prompts';
import { useChat } from '../hooks/useChat';
import { useConversation } from '../hooks/useConversation';

const MemoizedChatMessage = React.memo(({ role, content }) => (
  <Text style={role === 'user' ? styles.userText : role === 'assistant' ? styles.botText : styles.systemText}>
    {content}
  </Text>
));

const SimulationScreen = React.memo(({ route, navigation }) => {
  const { userId, userEmail, conversationId } = route.params;
  const { userInput, setUserInput, chatHistory, setChatHistory, handleSend, scrollViewRef } = useChat(prompts.Simulation.system, { userId, userEmail });
  const { saveConversation, loadConversation, updateConversationHistory } = useConversation();
  const [currentConversationId, setCurrentConversationId] = useState(conversationId);

  useEffect(() => {
    if (conversationId) {
      loadConversation(conversationId).then(loadedHistory => {
        if (loadedHistory) {
          setChatHistory(loadedHistory);
        }
      });
    }
  }, [conversationId, loadConversation, setChatHistory]);

  const memoizedChatHistory = useMemo(() => (
    chatHistory.slice(1).map(({ role, content }, index) => (
      <MemoizedChatMessage key={index} role={role} content={content} />
    ))
  ), [chatHistory]);

  const handleSendPress = useCallback(async () => {
    await handleSend();
    if (currentConversationId) {
      await updateConversationHistory(currentConversationId, chatHistory);
    } else {
      const { id } = await saveConversation(userId, chatHistory, 'Simulation');
      setCurrentConversationId(id);
    }
  }, [handleSend, currentConversationId, updateConversationHistory, saveConversation, userId, chatHistory]);

  const handleNewConversation = useCallback(() => {
    setChatHistory([{ role: 'system', content: prompts.Simulation.system }]);
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
          <Text style={styles.systemText}>{prompts.Simulation.summary}</Text>
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

export default SimulationScreen;
