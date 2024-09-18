import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import SimulationScreen from './screens/SimulationScreen';
import AiTutorScreen from './screens/AiTutorScreen';
import CoCreateScreen from './screens/CoCreateScreen';
import TeachMeScreen from './screens/TeachMeScreen';
import SettingsScreen from './screens/Settings';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          headerLeft: () => (
            <Icon
              name="home-outline"
              size={24}
              color="#FFD700"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate('Home')}
            />
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
            <Icon
              name="settings-outline"
              size={24}
              color="#FFD700"
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate('Settings')}
            />
          ),
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Simulation" component={SimulationScreen} />
        <Tab.Screen name="AiTutor" component={AiTutorScreen} />
        <Tab.Screen name="CoCreate" component={CoCreateScreen} />
        <Tab.Screen name="TeachMe" component={TeachMeScreen} />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ tabBarButton: () => null }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
