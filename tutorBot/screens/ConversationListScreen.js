import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { useConversation } from '../hooks/useConversation';
import Icon from 'react-native-vector-icons/Ionicons';

const ConversationListScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getUserConversations, removeConversation } = useConversation(); // Add removeConversation

  useEffect(() => {
    const loadConversations = async () => {
      try {
        setLoading(true);
        console.log('Loading conversations for user:', userId);
        const userConversations = await getUserConversations(userId);
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

  const handleRemoveConversation = async (conversationId) => {
    Alert.alert(
      "Delete Conversation",
      "Are you sure you want to delete this conversation?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          onPress: async () => {
            const success = await removeConversation(conversationId);
            if (success) {
              setConversations(conversations.filter(conv => conv.id !== conversationId));
            } else {
              Alert.alert("Error", "Failed to delete conversation");
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.conversationItemContainer}>
      <TouchableOpacity
        style={styles.conversationItem}
        onPress={() => navigation.navigate('Simulation', { userId, conversationId: item.id })}
      >
      </TouchableOpacity>
      <Text>{new Date(item.timestamp?.toDate()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Text>
      <TouchableOpacity
        onPress={() => handleRemoveConversation(item.id)}
        style={styles.removeIcon}
      >
        <Icon name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
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