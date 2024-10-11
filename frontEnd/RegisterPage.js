import React from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import UsernameIcon from './img/username.png'; // Import username icon
import EmailIcon from './img/email.png'; // Import email icon
import PasswordIcon from './img/password.png'; // Import password icon
import BackButton from './img/back.png'; // Import the back button image

export default function RegisterPage({ navigation }) {
  return (
    <View style={styles.registerContainer}>
      {/* Back button at the top */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={BackButton} style={styles.backButtonImage} />
      </TouchableOpacity>

      <Text style={styles.registerText}>Register</Text>
      <Text style={styles.createAccountText}>Create your account</Text>

      <View style={styles.inputContainer}>
        <Image source={UsernameIcon} style={styles.icon} />
        <TextInput style={styles.input} placeholder="Username" />
      </View>

      <View style={styles.inputContainer}>
        <Image source={EmailIcon} style={styles.icon} />
        <TextInput style={styles.input} placeholder="Email address" />
      </View>

      <View style={styles.inputContainer}>
        <Image source={PasswordIcon} style={styles.icon} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
      </View>

      <View style={styles.inputContainer}>
        <Image source={PasswordIcon} style={styles.icon} />
        <TextInput style={styles.input} placeholder="Confirm password" secureTextEntry={true} />
      </View>

      <Text style={styles.agreementText}>
        By registering you are agreeing to our Terms of use and Privacy Policy.
      </Text>

      {/* Register Button - Now below the terms */}
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>

      <Text style={styles.alreadyAccountText}>
        Already have an account? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Login</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    backgroundColor: '#fff3e0', // Your background color
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
  registerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  createAccountText: {
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
  agreementText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  registerButton: {
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
  alreadyAccountText: {
    marginTop: 20,
    color: '#666',
  },
  loginLink: {
    color: '#333',
    fontWeight: 'bold',
  },
});
