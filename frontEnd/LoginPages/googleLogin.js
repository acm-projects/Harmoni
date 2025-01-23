import { useState, useEffect } from "react";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, TouchableOpacity,Image, Text } from "react-native";
import GoogleIcon from '../img/google.png';
import axios from "axios";

const GoogleSignInComponent = (onPress) => {
  // const [userData, setUserData] = useState(null);
  // const [tokens, setTokens] = useState(null);
  let userData = null;
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '262889882503-0hel7inn2dspiufc8iagqibbhb2o3vo3.apps.googleusercontent.com',
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      iosClientId: '262889882503-b3nktm5fmtm3aath24c9h342gejhi1lf.apps.googleusercontent.com',
      profileImageSize: 120,
    });
  }, []);
  


  const signIn = async () => {
    try {
      // await GoogleSignin.revokeAccess();
      // await GoogleSignin.signOut();
  

      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      tokens = await GoogleSignin.getTokens();
      if (response.data.user != null) {
        const combinedItems = {...response.data.user,...tokens}
        // console.log(combinedItems)
        // await setUserData(combinedItems);
        // setTokens(tokens);
        userData = combinedItems;
        
      } else {
        alert("Google Sign In failed");
        return false;
      }
      console.log("This is user data")
      console.log(userData)
      const response2 = await axios.post('http://localhost:8000/googlelogin', userData);
      await AsyncStorage.clear();
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      if(onPress)
        onPress(true);
    } catch (error) {
      if (error) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            break;
          default:
            console.log("Error ", error);
        }
      }
    }
    return true;
  };
  return (
    <TouchableOpacity
        style={styles.googleButton}
        onPress={signIn}
        onPressIn={() => styles.googleButton.backgroundColor = '#835e45'}
        onPressOut={() => styles.googleButton.backgroundColor = '#fff'}>
        <Image source={GoogleIcon} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>
  );

};

export default GoogleSignInComponent;

const styles = StyleSheet.create({
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
})