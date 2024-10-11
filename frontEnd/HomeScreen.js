import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'; 
import HarmoniLogo from './img/harmoni.png'; // Your Harmoni logo
import BearImage from './img/bear.png'; // Your bear image

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Bear image at the top */}
      <Image source={BearImage} style={styles.bearImage} />
      
      {/* Harmoni Logo below the bear image */}
      <Image source={HarmoniLogo} style={styles.logo} />

      {/* Tagline or subtitle text */}
      <Text style={styles.subtitle}>More than just a login, it's a journey</Text>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('WelcomeBack')}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('RegisterPage')}>
        <Text style={styles.signupText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e0', // Your background color
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30, // Adjust padding for centering
  },
  bearImage: {
    width: 180, // Adjust size to make it proportional
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20, // Space between bear and logo
  },
  logo: {
    width: 240, // Logo width adjustment
    height: 80,
    resizeMode: 'contain',
    marginBottom: 40, // Space below logo
  },
  subtitle: {
    color: '#333', // Text color for subtitle
    fontSize: 16,
    marginBottom: 40, // Space between subtitle and buttons
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#333', // Dark button
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    marginBottom: 20,
  },
  signupButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333', // Dark border for signup
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#333', // Text color for signup
    fontSize: 18,
    fontWeight: 'bold',
  },
});
