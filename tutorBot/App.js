import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SimulationScreen from './screens/SimulationScreen';
import CritiqueTeachScreen from './screens/CritiqueTeachScreen';
import CoCreateScreen from './screens/CoCreateScreen';
import MentorCoachScreen from './screens/MentorCoachScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Simulation" component={SimulationScreen} />
        <Tab.Screen name="Critique/Teach" component={CritiqueTeachScreen} />
        <Tab.Screen name="Co-Create" component={CoCreateScreen} />
        <Tab.Screen name="Mentor/Coach" component={MentorCoachScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
