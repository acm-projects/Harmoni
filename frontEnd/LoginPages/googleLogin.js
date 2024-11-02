import { useState, useEffect } from "react";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";

const useGoogleSignIn = () => {
  const [userData, setUserData] = useState(null);

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

  const isSuccessResponse = (response) => {
    return response.data;
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log(response)
      if (isSuccessResponse(response)) {
        setUserData(response.data.user);
        console.log(userData);
      } else {
        alert("Google Sign In failed");
        console.log(response);
      }
    } catch (error) {
      if (error) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            break;
          default:
            console.log("Is there an error?");
        }
      }
    }
  };

  return { userData, signIn };
};

export default useGoogleSignIn;