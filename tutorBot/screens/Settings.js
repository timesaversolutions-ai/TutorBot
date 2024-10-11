import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { styles } from '../styles/styles';

export default function SettingsScreen({ navigation, route }) {
  const { userId } = route.params;

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

  const navigateToConversations = () => {
    navigation.navigate('ConversationList', { userId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToConversations}>
        <Icon name="chatbubbles-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Your Conversations</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Icon name="log-out-outline" size={24} color="#fff" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
