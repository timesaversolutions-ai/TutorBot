import React, { useEffect, useState } from 'react';
import { Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { styles } from '../styles/styles';
import { auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from '../firebase';
import { HomeScreen } from './HomeScreen';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            navigation.replace('MainApp')
          }
        })
    
        return unsubscribe
    }, [user])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            alert('Registered with:', user.email);
            // No need to navigate here, the useEffect will handle it
          })
          .catch(error => alert(error.message));
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            alert('Logged in with:', user.email);
            // No need to navigate here, the useEffect will handle it
          })
          .catch(error => alert(error.message));
    };
      
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.container}
            >
              <Text
                style={{ fontSize: 26, fontWeight: 'bold', paddingBottom: 25 }}>
                  Sign In or Register
              </Text>
              <View style={{ width: '80%' }}>
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={text => setEmail(text)}
                  style={styles.loginInput}
                />
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  style={styles.loginInput}
                  secureTextEntry
                />
                <View style={styles.loginButtonContainer}>
                  <TouchableOpacity
                    onPress={handleLogin}
                    style={[styles.button, styles.buttonOutline]}
                  >
                    <Text style={styles.buttonOutlineText}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                  >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default LoginScreen;

