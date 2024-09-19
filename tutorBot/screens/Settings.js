import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { styles } from '../styles/styles';
import { useConversation } from '../hooks/useConversation';

export default function SettingsScreen({ navigation, route }) {
  const { userId } = route.params;
  const [conversations, setConversations] = useState([]);
  const { loadUserConversations, removeConversation } = useConversation();

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    const userConversations = await loadUserConversations(userId);
    setConversations(userConversations);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        Alert.alert('Success', 'Logged out successfully');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      })
      .catch(error => Alert.alert('Error', error.message));
  };

  const handleDeleteConversation = async (conversationId) => {
    await removeConversation(conversationId);
    loadConversations();
  };

  const renderConversationItem = ({ item }) => (
    <View style={styles.conversationItem}>
      <Text>{new Date(item.timestamp.toDate()).toLocaleString()}</Text>
      <TouchableOpacity onPress={() => handleDeleteConversation(item.id)}>
        <Icon name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Icon name="log-out-outline" size={24} color="#fff" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
      
      <Text style={styles.subtitle}>Your Conversations</Text>
      <FlatList
        data={conversations}
        renderItem={renderConversationItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
