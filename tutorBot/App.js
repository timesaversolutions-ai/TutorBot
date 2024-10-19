import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, onAuthStateChanged } from './firebase';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SimulationScreen from './screens/SimulationScreen';
import AiTutorScreen from './screens/AiTutorScreen';
import CoCreateScreen from './screens/CoCreateScreen';
import TeachMeScreen from './screens/TeachMeScreen';
import SettingsScreen from './screens/Settings';
import ConversationListScreen from './screens/ConversationListScreen';
import { TouchableOpacity } from 'react-native';
import { EmbeddingProvider } from './contexts/EmbeddingContext';
import { setupEmbeddingSystem } from './utils/embeddingService';

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
              color="#FFD700"
              style={{ marginLeft: 15 }}
            />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#37474f'
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Simulation') {
            iconName = 'flask';
          } else if (route.name === 'AiTutor') {
            iconName = 'book';
          } else if (route.name === 'CoCreate') {
            iconName = 'hammer';
          } else if (route.name === 'TeachMe') {
            iconName = 'clipboard';
          } else if (route.name === 'Home') {
            iconName = 'home';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#B0BEC5',
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#546e7a',
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={{ padding: 10 }}
          >
            <Icon
              name="settings-outline"
              size={24}
              color="#FFD700"
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
        component={SimulationScreen} 
        initialParams={{ userId: auth.currentUser?.uid, userEmail: auth.currentUser?.email }}
      />
      <Tab.Screen 
        name="AiTutor" 
        component={AiTutorScreen} 
        initialParams={{ userId: auth.currentUser?.uid, userEmail: auth.currentUser?.email }}
      />
      <Tab.Screen 
        name="CoCreate" 
        component={CoCreateScreen} 
        initialParams={{ userId: auth.currentUser?.uid, userEmail: auth.currentUser?.email }}
      />
      <Tab.Screen 
        name="TeachMe" 
        component={TeachMeScreen} 
        initialParams={{ userId: auth.currentUser?.uid, userEmail: auth.currentUser?.email }}
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
