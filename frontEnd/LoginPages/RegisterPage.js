import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Animated, Easing, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { auth, firestore } from './firebase';
import Icon from 'react-native-vector-icons/Feather';
import GoogleIcon from '../img/google.png'; // Import Google icon


export default function RegisterPage({ navigation }) {
  const [createAccountHover, setCreateAccountHover] = useState(false);
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  // Function to generate a unique friend code
  const generateFriendCode = async () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    let code;
    let isUnique = false;

    while (!isUnique) {
      // Generate random code with the pattern "AAA123"
      code =
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        numbers.charAt(Math.floor(Math.random() * numbers.length)) +
        numbers.charAt(Math.floor(Math.random() * numbers.length)) +
        numbers.charAt(Math.floor(Math.random() * numbers.length));

      // Check if this code already exists in Firestore
      const q = query(collection(firestore, "users"), where("friendCode", "==", code));
      const querySnapshot = await getDocs(q);
      isUnique = querySnapshot.empty; // If no documents found, code is unique
    }

    return code;
  };

  const handleCreateAccount = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Generate a unique friend code
      const friendCode = await generateFriendCode();

      // Save user details along with the friend code in Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        fullName,
        phoneNumber,
        email,
        password,
        friendCode, // Store the unique friend code here
      });

      Alert.alert("Success", `Account created for ${user.email} with Friend Code: ${friendCode}`);
      navigation.navigate('MainHomeScreen');
    } catch (error) {
      Alert.alert("Error", "Email is already in use");
      console.error("Error creating account:", error);
    }
  };

  return (
    <View style={styles.registerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={40} color="#835e45" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.registerText}>Let’s Get Started</Text>
        <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
          <Image source={require('../img/honeybear.png')} style={styles.honeyBearImage} />
        </Animated.View>
      </View>

      <Text style={styles.createAccountText}>Create an account to continue</Text>

      {/* Full Name Input */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={24} style={styles.icon} color="#333" />
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
        <Icon name="phone" size={24} style={styles.icon} color="#333" />
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="mail" size={24} style={styles.icon} color="#333"/>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} style={styles.icon} color="#333" />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIconContainer}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Create Account Button */}
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={handleCreateAccount}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

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
  eyeIconContainer: {
    position: 'absolute',
    right: 15,
  },
});


// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Animated, Easing } from 'react-native';
// import UsernameIcon from '../img/username.png'; // Import username icon
// import EmailIcon from '../img/email.png'; // Import email icon
// import PasswordIcon from '../img/password.png'; // Import password icon
// import Phone from '../img/phone.png'; // Import phone icon
// import GoogleIcon from '../img/google.png'; // Import Google icon
// import BackButton from '../img/back.png'; // Import the back button image
// import HoneyBear from '../img/honeybear.png'; // Import honeybear image
// import {createUserWithEmailAndPassword } from 'firebase/auth';
// import {doc, setDoc} from 'firebase/firestore';
// import { auth } from './firebase';
// import { Alert } from 'react-native';


// export default function RegisterPage({ navigation }) {
//   const [createAccountHover, setCreateAccountHover] = useState(false);
//   const bounceAnim = useRef(new Animated.Value(0)).current;
//   const [fullName, setFullName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

 

//   useEffect(() => {
//     // Bounce animation
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(bounceAnim, {
//           toValue: -10, // Bounce up
//           duration: 500,
//           easing: Easing.ease,
//           useNativeDriver: true,
//         }),
//         Animated.timing(bounceAnim, {
//           toValue: 0, // Fall back down
//           duration: 500,
//           easing: Easing.ease,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   }, [bounceAnim]);

//   const handleCreateAccount = () => {
//     if (!email || !password) {
//       Alert.alert("Error", "Please fill in all fields.");
//       return;
//     }
    
//     createUserWithEmailAndPassword(auth, email, password)
//       .then(async (userCredential) => {
//         const user = userCredential.user;
//         Alert.alert("Success", `Account created for ${user.email}`);
//         navigation.navigate("MainHomeScreen"); // Navigate to a different screen if needed
//       })
//       .catch((error) => {
//         Alert.alert("Error", "Email is already in use");
//       });
//   };
  
//   return (
//     <View style={styles.registerContainer}>
//       {/* Back button at the top */}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Image source={BackButton} style={styles.backButtonImage} />
//       </TouchableOpacity>

//       <View style={styles.headerContainer}>
//         <Text style={styles.registerText}>Let’s Get Started</Text>
//         {/* Bouncing HoneyBear next to the text */}
//         <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
//           <Image source={HoneyBear} style={styles.honeyBearImage} />
//         </Animated.View>
//       </View>

//       <Text style={styles.createAccountText}>Create an account to continue</Text>

//       <View style={styles.inputContainer}>
//         <Image source={UsernameIcon} style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your full name"
//           value={fullName}
//           onChangeText={(text) => setFullName(text)}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Image source={Phone} style={styles.icon} />
//         <TextInput 
//         style={styles.input}
//         placeholder="Enter your phone number"
//         value={phoneNumber}
//         onChangeText={(text) => setPhoneNumber(text)}
//         keyboardType="phone-pad"
//          />
//       </View>

//       <View style={styles.inputContainer}>
//         <Image source={EmailIcon} style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your email"
//           value={email}
//           onChangeText={(text) => setEmail(text)}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Image source={PasswordIcon} style={styles.icon} />
//         <TextInput 
//         style={styles.input} 
//         placeholder="Enter your password" 
//         value={password}
//         onChangeText={(text) => setPassword(text)}
//         secureTextEntry={true} />
//       </View>

//       <TouchableOpacity 
//         style={[styles.createAccountButton, createAccountHover && styles.invertButton]} // Apply styles conditionally
//         onPressIn={() => setCreateAccountHover(true)}
//         onPressOut={() => setCreateAccountHover(false)}
//         onPress={handleCreateAccount}>
//         <Text style={[styles.buttonText, createAccountHover && styles.invertButtonText]}>Create Account</Text>
//       </TouchableOpacity>
//       <Text style={styles.orText}>Or</Text>

//       {/* Continue with Google Button */}
//       <TouchableOpacity 
//         style={styles.googleButton}
//         onPressIn={() => styles.googleButton.backgroundColor = '#835e45'}
//         onPressOut={() => styles.googleButton.backgroundColor = '#fff'}>
//         <Image source={GoogleIcon} style={styles.googleIcon} />
//         <Text style={styles.googleButtonText}>Sign Up with Google</Text>
//       </TouchableOpacity>

//       <Text style={styles.termsText}>
//         By signing up, you agree to our <Text style={styles.link}>Terms of Use</Text> 
//         and you acknowledge that you have read our <Text style={styles.link}>Privacy Policy</Text>
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   registerContainer: {
//     flex: 1,
//     backgroundColor: '#fff3e0', // Your background color
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     position: 'relative', // Necessary for absolute positioning of back button
//   },
//   backButton: {
//     position: 'absolute',
//     top: 80, // Move the arrow down
//     left: 20, // Adjust this for spacing from the left
//     zIndex: 10, // Ensure the back button is on top
//   },
//   backButtonImage: {
//     width: 40, // Adjust size of the back button image
//     height: 40,
//     resizeMode: 'contain',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   registerText: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//     marginLeft: 15,
//     marginTop: 40, // Move the "Let’s Get Started" up
//   },
//   honeyBearImage: {
//     width: 65,
//     height: 65,
//     marginLeft: 50,
//     marginBottom: -20,
//     resizeMode: 'contain',
//   },
//   createAccountText: {
//     fontSize: 16,
//     color: '#414a4c',
//     marginBottom: 30,
//     marginLeft: 15,
//     marginTop: 2, // Move the "Create an account to continue" up
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff3e0',
//     borderRadius: 25, // More rounded rectangle for input boxes
//     paddingHorizontal: 15,
//     paddingVertical: 12, // Increase padding for more spacing
//     marginBottom: 30, // Increase space between input boxes
//     borderWidth: 1,
//     borderColor: '#414a4c',
//   },
//   icon: {
//     width: 24,
//     height: 24,
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//   },
//   createAccountButton: {
//     backgroundColor: '#835e45',
//     paddingVertical: 15,
//     borderRadius: 30,
//     alignItems: 'center',
//     marginBottom: 20,
//     marginTop: 5
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   orText: {
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#666',
//     fontSize: 16,
//     marginTop: 15
//   },
//   googleButton: {
//     flexDirection: 'row',
//     borderColor: '#835e45',
//     borderWidth: 1,
//     paddingVertical: 15,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     marginTop: 5
//   },
//   googleIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },
//   googleButtonText: {
//     color: '#835e45',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   invertButton: {
//     backgroundColor: '#fff', // Inverted background color
//     borderColor: '#835e45', // Keep border color
//   },
//   invertButtonText: {
//     color: '#835e45', // Inverted text color
//   },
//   termsText: {
//     textAlign: 'center',
//     fontSize: 12,
//     color: '#aaa',
//   },
//   link: {
//     color: '#835e45',
//   },
// });
