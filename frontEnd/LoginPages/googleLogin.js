import { useState, useEffect } from "react";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import AsyncStorage from '@react-native-async-storage/async-storage';

const googleSignInComponent = () => {
  const [userData, setUserData] = useState(null);
  const [tokens, setTokens] = useState(null);
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
      const tokens = await GoogleSignin.getTokens();
      if (response.data.user != null) {
        console.log(response.data.user);
        setUserData(response.data.user);
        setTokens(tokens);
      } else {
        alert("Google Sign In failed");
        return;
      }
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
    return {userData,tokens};
  };
  return {signIn};

};

export default googleSignInComponent;