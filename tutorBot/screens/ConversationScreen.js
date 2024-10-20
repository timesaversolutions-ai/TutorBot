import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { styles } from '../styles/styles';
import { prompts } from '../prompts';
import { useChat } from '../hooks/useChat';
import { useConversation } from '../hooks/useConversation';
import { retrieveRelevantSections } from '../utils/embeddingService';
import { useEmbedding } from '../contexts/EmbeddingContext';
import { colors } from '../styles/styles';

const MemoizedChatMessage = React.memo(({ role, content }) => (
  <View style={[styles.messageRow, role === 'user' ? styles.userMessageRow : styles.botMessageRow]}>
    <View style={[styles.messageBubble, role === 'user' ? styles.userMessageBubble : styles.botMessageBubble]}>
      <Text style={[styles.messageText, role === 'user' ? styles.userMessageText : styles.botMessageText]}>
        {content}
      </Text>
    </View>
  </View>
));

const ConversationScreen = React.memo(({ route, navigation }) => {
  const { userId, userEmail, conversationId, conversationType } = route.params;
  const { userInput, setUserInput, chatHistory, setChatHistory, handleSend, scrollViewRef, usageData } = useChat(
    prompts[conversationType].summary,
    prompts[conversationType].system,
    { userId, userEmail },
    conversationType,
    []
  );
  const { saveConversation, loadConversation, updateConversationHistory } = useConversation();
  const [currentConversationId, setCurrentConversationId] = useState(conversationId);
  const { embeddedSections } = useEmbedding();

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

  const memoizedChatHistory = useMemo(() => (
    chatHistory.slice(1).map(({ role, content }, index) => (
      <MemoizedChatMessage key={index} role={role} content={content} />
    ))
  ), [chatHistory]);

  const handleSendPress = useCallback(async () => {
    console.log('User Input:', userInput);

    if (embeddedSections) {
      console.log('Embedded sections available. Retrieving relevant sections...');
      const relevantSections = await retrieveRelevantSections(userInput, embeddedSections);
      const contextualPrompt = relevantSections.map(section => section.text).join('\n\n');
      await handleSend(contextualPrompt);
    } else {
      console.log('No embedded sections available. Sending without context.');
      await handleSend();
    }

    if (currentConversationId) {
      await updateConversationHistory(currentConversationId, chatHistory);
    } else {
      const { id } = await saveConversation(userId, chatHistory, conversationType);
      setCurrentConversationId(id);
    }
  }, [handleSend, currentConversationId, updateConversationHistory, saveConversation, userId, chatHistory, embeddedSections, userInput, conversationType]);

  const handleNewConversation = useCallback(() => {
    setChatHistory([{ role: 'system', content: prompts[conversationType].summary }]);
    setCurrentConversationId(null);
  }, [setChatHistory, conversationType]);

  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.systemMessageText}>{prompts[conversationType].summary}</Text>
          {memoizedChatHistory}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Type a message..."
            placeholderTextColor="#8E8E93"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendPress}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: colors.background }}>
        <TouchableOpacity style={styles.navButton} onPress={handleNewConversation}>
          <Text style={styles.navButtonText}>New Conversation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ConversationList', { userId })}>
          <Text style={styles.navButtonText}>View Conversations</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

export default ConversationScreen;
