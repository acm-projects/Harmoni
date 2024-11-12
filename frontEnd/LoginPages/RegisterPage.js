import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Animated, Easing } from 'react-native';
import UsernameIcon from '../img/username.png'; // Import username icon
import EmailIcon from '../img/email.png'; // Import email icon
import PasswordIcon from '../img/password.png'; // Import password icon
import Phone from '../img/phone.png'; // Import phone icon
import GoogleIcon from '../img/google.png'; // Import Google icon
import BackButton from '../img/back.png'; // Import the back button image
import HoneyBear from '../img/honeybear.png'; // Import honeybear image

export default function RegisterPage({ navigation }) {
  const [createAccountHover, setCreateAccountHover] = useState(false);
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Bounce animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10, // Bounce up
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0, // Fall back down
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  return (
    <View style={styles.registerContainer}>
      {/* Back button at the top */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={BackButton} style={styles.backButtonImage} />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.registerText}>Let’s Get Started</Text>
        {/* Bouncing HoneyBear next to the text */}
        <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
          <Image source={HoneyBear} style={styles.honeyBearImage} />
        </Animated.View>
      </View>

      <Text style={styles.createAccountText}>Create an account to continue</Text>

      <View style={styles.inputContainer}>
        <Image source={UsernameIcon} style={styles.icon} />
        <TextInput style={styles.input} placeholder="Enter your full name" />
      </View>

      <View style={styles.inputContainer}>
        <Image source={Phone} style={styles.icon} />
        <TextInput style={styles.input} placeholder="Enter your phone number" />
      </View>

      <View style={styles.inputContainer}>
        <Image source={EmailIcon} style={styles.icon} />
        <TextInput style={styles.input} placeholder="Enter your email" />
      </View>

      <View style={styles.inputContainer}>
        <Image source={PasswordIcon} style={styles.icon} />
        <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry={true} />
      </View>

      <TouchableOpacity 
        style={[styles.createAccountButton, createAccountHover && styles.invertButton]} // Apply styles conditionally
        onPressIn={() => setCreateAccountHover(true)}
        onPressOut={() => setCreateAccountHover(false)}>
        <Text style={[styles.buttonText, createAccountHover && styles.invertButtonText]}>Create Account</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>Or</Text>

      {/* Continue with Google Button */}
      <TouchableOpacity 
        style={styles.googleButton}
        onPressIn={() => styles.googleButton.backgroundColor = '#835e45'}
        onPressOut={() => styles.googleButton.backgroundColor = '#fff'}>
        <Image source={GoogleIcon} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Sign Up with Google</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By signing up, you agree to our <Text style={styles.link}>Terms of Use</Text> 
        and you acknowledge that you have read our <Text style={styles.link}>Privacy Policy</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    backgroundColor: '#fff3e0', // Your background color
    justifyContent: 'center',
    paddingHorizontal: 20,
    position: 'relative', // Necessary for absolute positioning of back button
  },
  backButton: {
    position: 'absolute',
    top: 80, // Move the arrow down
    left: 20, // Adjust this for spacing from the left
    zIndex: 10, // Ensure the back button is on top
  },
  backButtonImage: {
    width: 40, // Adjust size of the back button image
    height: 40,
    resizeMode: 'contain',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginLeft: 15,
    marginTop: 40, // Move the "Let’s Get Started" up
  },
  honeyBearImage: {
    width: 65,
    height: 65,
    marginLeft: 50,
    marginBottom: -20,
    resizeMode: 'contain',
  },
  createAccountText: {
    fontSize: 16,
    color: '#414a4c',
    marginBottom: 30,
    marginLeft: 15,
    marginTop: 2, // Move the "Create an account to continue" up
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3e0',
    borderRadius: 25, // More rounded rectangle for input boxes
    paddingHorizontal: 15,
    paddingVertical: 12, // Increase padding for more spacing
    marginBottom: 30, // Increase space between input boxes
    borderWidth: 1,
    borderColor: '#414a4c',
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
  createAccountButton: {
    backgroundColor: '#835e45',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 5
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
    marginTop: 15
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
    marginTop: 5
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
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#aaa',
  },
  link: {
    color: '#835e45',
  },
});
