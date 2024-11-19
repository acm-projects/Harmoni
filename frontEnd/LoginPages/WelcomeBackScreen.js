import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import EmailIcon from '../img/email.png';
import PasswordIcon from '../img/password.png';
import GoogleIcon from '../img/google.png';
import BackButton from '../img/back.png';
import Harmoni from '../img/harmoni.png';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';
import Icon from 'react-native-vector-icons/Feather';

export default function WelcomeBackScreen({ navigation }) {
  const [logInHover, setLogInHover] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("Success", `Logged in as ${user.email}`);
        navigation.navigate("MainHomeScreen");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email first.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Success", "Password reset email sent! Check your inbox.");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  const handleUpdatePasswordInFirestore = async () => {
    if (!newPassword) {
      Alert.alert("Error", "Please enter the new password to update in Firestore.");
      return;
    }

    try {
      const userId = auth.currentUser.uid;
      const userDoc = doc(firestore, "users", userId);
      await updateDoc(userDoc, { password: newPassword });
      Alert.alert("Success", "Password updated in Firestore!");
      setNewPassword(''); // Clear the field
    } catch (error) {
      Alert.alert("Error", "Failed to update password in Firestore.");
      console.error("Firestore update error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={40} color="#835e45" />
      </TouchableOpacity>
      <Image source={Harmoni} style={styles.logo} />

      <Text style={styles.welcomeText}>Welcome back</Text>
      <Text style={styles.loginText}>Log in to your account to continue</Text>

      <View style={styles.inputContainer}>
        <Icon name='user' size={24} style={styles.icon} color='#333'/>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name='lock' size={24} style={styles.icon} color='#333'/>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIconContainer}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon 
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color="#333"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.logInButton, logInHover && styles.invertButton]}
        onPressIn={() => setLogInHover(true)}
        onPressOut={() => setLogInHover(false)}
        onPress={handleLogin}
      >
        <Text style={[styles.buttonText, logInHover && styles.invertButtonText]}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or</Text>

      <TouchableOpacity
        style={styles.googleButton}
        onPressIn={() => (styles.googleButton.backgroundColor = '#835e45')}
        onPressOut={() => (styles.googleButton.backgroundColor = '#fff')}
      >
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
    backgroundColor: '#fff3e0',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 450,
    height: 150,
    resizeMode: 'contain',
    marginBottom: -30,
    alignItems: 'center',
    marginLeft: -35,
    marginTop: -50,
  },
  backButton: {
    position: 'absolute',
    top: 80,
    left: 20,
    zIndex: 10,
  },
  backButtonImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginLeft: 15,
    marginTop: 40,
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
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
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
    backgroundColor: '#fff',
    borderColor: '#835e45',
  },
  invertButtonText: {
    color: '#835e45',
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
  eyeIconContainer: {
    position: 'absolute',
    right: 15,
  },
  forgotPasswordText: {
    color: '#835e45',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
});
