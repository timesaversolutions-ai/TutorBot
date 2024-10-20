import React from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { styles, colors } from '../styles/styles';

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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.settingsContainer}>
        <Text style={styles.screenTitle}>Settings</Text>
        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingsButton} onPress={navigateToConversations}>
            <Icon name="chatbubbles-outline" size={24} color={colors.primary} />
            <Text style={styles.settingsButtonText}>Your Conversations</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.settingsButton} onPress={() => {}}>
            <Icon name="person-outline" size={24} color={colors.primary} />
            <Text style={styles.settingsButtonText}>Account Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsButton} onPress={() => {}}>
            <Icon name="notifications-outline" size={24} color={colors.primary} />
            <Text style={styles.settingsButtonText}>Notifications</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Icon name="log-out-outline" size={24} color={colors.error} />
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
