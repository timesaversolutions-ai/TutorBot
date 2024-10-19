import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, onAuthStateChanged } from './firebase';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ConversationScreen from './screens/ConversationScreen';
import SettingsScreen from './screens/Settings';
import ConversationListScreen from './screens/ConversationListScreen';
import { TouchableOpacity } from 'react-native';
import { EmbeddingProvider } from './contexts/EmbeddingContext';
import { setupEmbeddingSystem } from './utils/embeddingService';
import { colors } from './styles/styles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{ padding: 10 }}
          >
            <Icon
              name="home-outline"
              size={24}
              color={colors.primary}
              style={{ marginLeft: 15 }}
            />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTintColor: colors.text,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Simulation') {
            iconName = 'flask-outline';
          } else if (route.name === 'AiTutor') {
            iconName = 'book-outline';
          } else if (route.name === 'CoCreate') {
            iconName = 'hammer-outline';
          } else if (route.name === 'TeachMe') {
            iconName = 'clipboard-outline';
          } else if (route.name === 'Home') {
            iconName = 'home-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={{ padding: 10 }}
          >
            <Icon
              name="settings-outline"
              size={24}
              color={colors.primary}
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        initialParams={{ userId: auth.currentUser?.uid, userEmail: auth.currentUser?.email }}
      />
      <Tab.Screen 
        name="Simulation" 
        component={ConversationScreen} 
        initialParams={{ userId: auth.currentUser?.uid, userEmail: auth.currentUser?.email, conversationType: 'Simulation' }}
      />
      <Tab.Screen 
        name="AiTutor" 
        component={ConversationScreen} 
        initialParams={{ userId: auth.currentUser?.uid, userEmail: auth.currentUser?.email, conversationType: 'AiTutor' }}
      />
      <Tab.Screen 
        name="CoCreate" 
        component={ConversationScreen} 
        initialParams={{ userId: auth.currentUser?.uid, userEmail: auth.currentUser?.email, conversationType: 'CoCreate' }}
      />
      <Tab.Screen 
        name="TeachMe" 
        component={ConversationScreen} 
        initialParams={{ userId: auth.currentUser?.uid, userEmail: auth.currentUser?.email, conversationType: 'TeachMe' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ tabBarButton: () => null }}
        initialParams={{ userId: auth.currentUser?.uid, userEmail: auth.currentUser?.email }}
      />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ConversationList" 
        component={ConversationListScreen} 
        options={{ title: 'Conversations' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [embeddedSections, setEmbeddedSections] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    // Set up the embedding system
    setupEmbeddingSystem().then(result => {
      console.log(`Embedding system setup complete. Got ${result.length} embedded sections.`);
      setEmbeddedSections(result);
    }).catch(error => {
      console.error('Error setting up embedding system:', error);
    });

    return unsubscribe;
  }, []);

  if (initializing) return null;

  return (
    <EmbeddingProvider value={{ embeddedSections }}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen 
              name="MainApp" 
              component={MainStack} 
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </EmbeddingProvider>
  );
}
