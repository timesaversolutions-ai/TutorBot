import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/styles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.promptText}>Please select one of the following services to get started:</Text>
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Simulation')}>
          <Text style={styles.buttonText}>Simulation</Text>
          <Icon name="flask" size={30} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('AiTutor')}>
          <Text style={styles.buttonText}>AiTutor</Text>
          <Icon name="school" size={30} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('CoCreate')}>
          <Text style={styles.buttonText}>Co-Create</Text>
          <Icon name="hammer" size={30} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('TeachMe')}>
          <Text style={styles.buttonText}>TeachMe</Text>
          <Icon name="clipboard" size={30} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
