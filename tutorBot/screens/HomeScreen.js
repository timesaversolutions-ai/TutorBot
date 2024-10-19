import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/styles';
import { colors } from '../styles/styles';

const ServiceButton = ({ title, iconName, onPress }) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
    <Icon name={iconName} size={40} color={colors.primary} style={styles.buttonIcon} />
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text style={styles.homeTitle}>Welcome to TutorBot</Text>
      <Text style={styles.homeSubtitle}>Choose a service to get started:</Text>
      <View style={styles.buttonGridContainer}>
        <View style={styles.buttonGrid}>
          <ServiceButton
            title="Simulation"
            iconName="flask-outline"
            onPress={() => navigation.navigate('Simulation')}
          />
          <ServiceButton
            title="AI Tutor"
            iconName="book-outline"
            onPress={() => navigation.navigate('AiTutor')}
          />
          <ServiceButton
            title="Co-Create"
            iconName="hammer-outline"
            onPress={() => navigation.navigate('CoCreate')}
          />
          <ServiceButton
            title="Teach Me"
            iconName="clipboard-outline"
            onPress={() => navigation.navigate('TeachMe')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
