// import React from 'react';
// import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'; 
// import HarmoniLogo from './img/harmoni.png'; // Your Harmoni logo
// import BearImage from './img/bear.png'; // Your bear image

// export default function HomeScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       {/* Bear image at the top */}
//       <Image source={BearImage} style={styles.bearImage} />
      
//       {/* Harmoni Logo below the bear image */}
//       <Image source={HarmoniLogo} style={styles.logo} />

//       {/* Tagline or subtitle text */}
//       <Text style={styles.subtitle}>More than just a login, it's a journey</Text>

//       {/* Login Button */}
//       <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('WelcomeBack')}>
//         <Text style={styles.buttonText}>LOGIN</Text>
//       </TouchableOpacity>

//       {/* Sign Up Button */}
//       <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('RegisterPage')}>
//         <Text style={styles.signupText}>SIGN UP</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff3e0', // Your background color
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 30, // Adjust padding for centering
//   },
//   bearImage: {
//     width: 180, // Adjust size to make it proportional
//     height: 180,
//     resizeMode: 'contain',
//     marginBottom: 20, // Space between bear and logo
//   },
//   logo: {
//     width: 240, // Logo width adjustment
//     height: 80,
//     resizeMode: 'contain',
//     marginBottom: 40, // Space below logo
//   },
//   subtitle: {
//     color: '#333', // Text color for subtitle
//     fontSize: 16,
//     marginBottom: 40, // Space between subtitle and buttons
//     textAlign: 'center',
//   },
//   loginButton: {
//     backgroundColor: '#333', // Dark button
//     paddingVertical: 15,
//     paddingHorizontal: 100,
//     borderRadius: 30,
//     marginBottom: 20,
//   },
//   signupButton: {
//     backgroundColor: 'transparent',
//     borderWidth: 1,
//     borderColor: '#333', // Dark border for signup
//     paddingVertical: 15,
//     paddingHorizontal: 100,
//     borderRadius: 30,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   signupText: {
//     color: '#333', // Text color for signup
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Animated, Easing } from 'react-native'; 
import HarmoniLogo from '../img/harmoni.png'; // Your Harmoni logo
import BearImage from '../img/bear.png'; // Your bear image

export default function HomeScreen({ navigation }) {
  const bounceAnim = useRef(new Animated.Value(0)).current; // For bounce
  const rotateAnim = useRef(new Animated.Value(0)).current; // For rotation

  useEffect(() => {
    // Start the bounce and rotate animations
    Animated.loop(
      Animated.parallel([
        // Bounce animation
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -15, // Move up by 15 units
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0, // Move back down to the original position
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true,
          })
        ]),
        // Rotate animation
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1, // Rotate 1 unit (you'll use interpolation to rotate degrees)
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0, // Rotate back to original position
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true,
          })
        ])
      ])
    ).start();
  }, [bounceAnim, rotateAnim]);

  // Interpolating the rotation value to degrees
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '15deg'] // Rotates between 0 and 15 degrees
  });

  return (
    <View style={styles.container}>
      {/* Harmoni Logo at the top */}
      <Image source={HarmoniLogo} style={styles.logo} />

      {/* Tagline or subtitle text */}
      <Text style={styles.subtitle}>Beyond Scheduling. Organize Life, Your Way.</Text>

      {/* Animated Bear image below the subtitle */}
      <Animated.View style={{ 
        transform: [
          { translateY: bounceAnim }, // Bouncing animation
          { rotate: rotateInterpolate } // Rotation animation
        ]
      }}>
        <Image source={BearImage} style={styles.bearImage} />
      </Animated.View>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate('RegisterPage')}>
        <Text style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>

      {/* Sign In Text */}
      <View style={styles.signInContainer}>
        <Text style={styles.alreadyHaveText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('WelcomeBack')}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e0', // Background color similar to your theme
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30, // Adjust padding for centering
  },
  logo: {
    width: 450, // Adjusted logo size
    height: 150,
    resizeMode: 'contain',
    marginBottom: -30, // Space below logo
  },
  subtitle: {
    color: '#000000', // Text color for subtitle
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40, // Space between subtitle and bear image
  },
  bearImage: {
    width: 300, // Adjust size to make it proportional
    height: 300,
    resizeMode: 'contain',
    marginBottom: 40, // Space below bear image
  },
  getStartedButton: {
    backgroundColor: '#835e45', // Button color
    width: 350,
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    marginBottom: 20,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  signInContainer: {
    flexDirection: 'row', // Display text and button in a row
    alignItems: 'center', // Vertically align
  },
  alreadyHaveText: {
    color: '#aaa', // Light grey text
    fontSize: 16,
  },
  signInText: {
    color: '#333', // Dark text for "Sign In"
    fontSize: 16,
    fontWeight: 'bold', // Bold only the "Sign In"
  },
});
