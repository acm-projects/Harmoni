import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import EmailIcon from '../img/email.png'; // Import email icon
import PasswordIcon from '../img/password.png'; // Import password icon
import GoogleIcon from '../img/google.png'; // Import Google icon
import BackButton from '../img/back.png'; // Import the back button image
import Harmoni from '../img/harmoni.png';
import { CurrentRenderContext } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import googleSignInComponent from './googleLogin';

export default function WelcomeBackScreen({ navigation }) {
  const [logInHover, setLogInHover] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = googleSignInComponent();

  const googleLogin = async () => {
    try {
      const data = await signIn();
      const userData = {
        email: data.userData.email,
        name: data.userData.name,
        phone: "",
        password: data.userData.id,
        profilePicture: data.userData.photo,
        accessToken: data.tokens.accessToken,
      };
      // console.log('User Data:', userData);
      // console.log("Tokens", data.tokens);

      
      const response = await axios.post('http://localhost:8000/googleLogin', userData);
      console.log('Response:', response.data);
      await AsyncStorage.clear();
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      navigation.navigate('MainHomeScreen');
    } catch (error) {
      console.error('Google login failed:', error.response ? error.response.data : error.message);
    }
  };

  const login = async () => {
    try {
      const obj = { email, password };
      const response = await axios.post('http://localhost:8000/login', obj);
      const userData = {
        email: response.data[0].email,
        name: response.data[0].name,
        phone: response.data[0].phone,
        password: response.data[0].password,
        profilePicture: response.data[0].profilePicture
      };
      // JSON.stringify(userData)
      await AsyncStorage.clear();
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      navigation.navigate('MainHomeScreen');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  }

  return (
    <View style={styles.container}>
      {/* Back button at the top */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={BackButton} style={styles.backButtonImage} />
      </TouchableOpacity>
      <Image source={Harmoni} style={styles.logo} />

      <Text style={styles.welcomeText}>Welcome back</Text>
      <Text style={styles.loginText}>Log in to your account to continue</Text>

      <View style={styles.inputContainer}>
        <Image source={EmailIcon} style={styles.emailicon} />
        <TextInput style={styles.input} placeholder="Enter your email" 
        value = {email}
        onChangeText = {text => setEmail(text.toLowerCase())}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={PasswordIcon} style={styles.icon} />
        <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry={true} 
        value= {password}
        onChangeText = {text => setPassword(text)}
        />
      </View>

      {/* Log In Button */}
      <TouchableOpacity
        style={[styles.logInButton, logInHover && styles.invertButton]} // Apply hover styles conditionally
        onPressIn={() => setLogInHover(true)}
        onPressOut={() => setLogInHover(false)}
        onPress={() =>  login()}
        >
        <Text style={[styles.buttonText, logInHover && styles.invertButtonText]}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or</Text>

      {/* Continue with Google Button */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={googleLogin}
        onPressIn={() => styles.googleButton.backgroundColor = '#835e45'}
        onPressOut={() => styles.googleButton.backgroundColor = '#fff'}>
        <Image source={GoogleIcon} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <Text style={styles.createAccountText}>
        Don’t have an account? <Text style={styles.link} onPress={() => navigation.navigate('RegisterPage')}>Create Account</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e0', // Background color
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 450, // Adjusted logo size
    height: 150,
    resizeMode: 'contain',
    marginBottom: -30, // Space below logo
    alignItems: 'center',
    marginLeft: -35,
    marginTop: -50,
  },
  backButton: {
    position: 'absolute',
    top: 80, // Move the arrow down
    left: 20, // Adjust spacing from the left
    zIndex: 10, // Ensure the back button is on top
  },
  backButtonImage: {
    width: 40, // Adjust size of the back button image
    height: 40,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginLeft: 15,
    marginTop: 40, // Move the "Welcome back" text up
  },
  loginText: {
    fontSize: 16,
    color: '#414a4c',
    marginBottom: 30,
    marginLeft: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3e0',
    borderRadius: 25, // Rounded rectangle for input boxes
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20, // Spacing between input boxes
    borderWidth: 1,
    borderColor: '#414a4c',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  emailicon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  logInButton: {
    backgroundColor: '#835e45',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    fontSize: 16,
  },
  googleButton: {
    flexDirection: 'row',
    borderColor: '#835e45',
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#835e45',
    fontSize: 16,
    fontWeight: 'bold',
  },
  invertButton: {
    backgroundColor: '#fff', // Inverted background color
    borderColor: '#835e45', // Keep border color
  },
  invertButtonText: {
    color: '#835e45', // Inverted text color
  },
  createAccountText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  link: {
    color: '#835e45',
    fontWeight: 'bold',
  },
});
