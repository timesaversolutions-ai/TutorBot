import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import SimulationScreen from './screens/SimulationScreen';
import AiTutorScreen from './screens/AiTutorScreen';
import CoCreateScreen from './screens/CoCreateScreen';
import TeachMeScreen from './screens/TeachMeScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Simulation') {
            iconName = 'flask';
          } else if (route.name === 'AiTutor') {
            iconName = 'school';
          } else if (route.name === 'CoCreate') {
            iconName = 'hammer';
          } else if (route.name === 'TeachMe') {
            iconName = 'clipboard';
          } else if (route.name === 'Home') {
            iconName = 'home';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: true,
      })}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Simulation" component={SimulationScreen} />
        <Tab.Screen name="AiTutor" component={AiTutorScreen} />
        <Tab.Screen name="CoCreate" component={CoCreateScreen} />
        <Tab.Screen name="TeachMe" component={TeachMeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
