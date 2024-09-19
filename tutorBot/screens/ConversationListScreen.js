import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { useConversation } from '../hooks/useConversation';

const ConversationListScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getUserConversations } = useConversation();

  useEffect(() => {
    const loadConversations = async () => {
      try {
        setLoading(true);
        console.log('Loading conversations for user:', userId);
        const userConversations = await getUserConversations(userId);
        console.log('Loaded conversations:', userConversations);
        setConversations(userConversations);
      } catch (err) {
        console.error('Error loading conversations:', err);
        setError('Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };
    loadConversations();
  }, [userId, getUserConversations]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => navigation.navigate('Simulation', { userId, conversationId: item.id })}
    >
      <Text>{new Date(item.timestamp?.toDate()).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  if (error) {
    return <View style={styles.container}><Text>{error}</Text></View>;
  }

  return (
    <View style={styles.container}>
      {conversations.length === 0 ? (
        <Text>No conversations found</Text>
      ) : (
        <FlatList
          data={conversations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default ConversationListScreen;