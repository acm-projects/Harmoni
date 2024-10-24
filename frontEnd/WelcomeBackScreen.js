import React from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import HoneyBear from './img/honeybear.png'; // Import HoneyBear image
import UsernameIcon from './img/username.png'; // Import username icon
import PasswordIcon from './img/password.png'; // Import password icon
import BackButton from './img/back.png'; // Import the back button image

export default function WelcomeBackScreen({ navigation }) {
  return (
    <View style={styles.welcomeContainer}>
      {/* Back button at the top */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={BackButton} style={styles.backButtonImage} />
      </TouchableOpacity>

      {/* Add the HoneyBear image at the top */}
      <Image source={HoneyBear} style={styles.honeyBear} />

      <Text style={styles.welcomeText}>Welcome Back</Text>
      <Text style={styles.loginText}>Login to your account</Text>

      <View style={styles.inputContainer}>
        <Image source={UsernameIcon} style={styles.icon} />
        <TextInput style={styles.input} placeholder="Username" />
      </View>

      <View style={styles.inputContainer}>
        <Image source={PasswordIcon} style={styles.icon} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('MainScreens')}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      
      <Text style={styles.signupPrompt}>Don't have an account? <Text style={styles.signupLink}>Sign up</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    backgroundColor: '#fff3e0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative', // Necessary for absolute positioning of back button
  },
  backButton: {
    position: 'absolute',
    top: 40, // Adjust this for spacing from the top
    left: 20, // Adjust this for spacing from the left
    zIndex: 10, // Ensure the back button is on top
  },
  backButtonImage: {
    width: 40, // Adjust size of the back button image
    height: 40,
    resizeMode: 'contain',
  },
  honeyBear: {
    width: 150, // Adjust the size as necessary
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20, // Add space between the image and the welcome text
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  loginText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupPrompt: {
    marginTop: 20,
    color: '#666',
  },
  signupLink: {
    color: '#333',
    fontWeight: 'bold',
  },
});

