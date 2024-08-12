import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.promptText}>Please select one of the following services to get started:</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Simulation')}>
        <Text style={styles.buttonText}>Simulation</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Critique/Teach')}>
        <Text style={styles.buttonText}>Critique/Teach</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('CoCreate')}>
        <Text style={styles.buttonText}>Co-Create</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Mentor/Coach')}>
        <Text style={styles.buttonText}>Mentor/Coach</Text>
      </TouchableOpacity>
    </View>
  );
}
