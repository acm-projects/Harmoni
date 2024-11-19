// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { doc, updateDoc } from 'firebase/firestore';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { firestore, auth } from './firebase';
// import Icon from 'react-native-vector-icons/Feather';

// export default function AdditionalInfoPage({ navigation }) {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImagePick = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     // if (!result.canceled && result.uri) {
//     //   setSelectedImage(result.uri);
//     // }
//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       setSelectedImage(result.uri);
//     }
//   };

//   const handleTakePhoto = async () => {
//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled && result.uri) {
//       setSelectedImage(result.uri);
//     }
//   };

//   const handleSaveInfo = async () => {
//     if (!selectedImage) {
//       Alert.alert("Error", "Please select an image.");
//       return;
//     }

//     const storage = getStorage();
//     const userId = auth.currentUser.uid;
//     const imageRef = ref(storage, `users/${userId}/profile.jpg`);

//     // Convert image URI to blob
//     const response = await fetch(selectedImage);
//     const blob = await response.blob();

//     // Upload the image
//     await uploadBytes(imageRef, blob);

//     // Get download URL
//     const imageUrl = await getDownloadURL(imageRef);

//     // Save the image URL to Firestore
//     await updateDoc(doc(firestore, "users", userId), {
//       imageUrl: imageUrl,
//       // Add any additional fields here, e.g., bio, gender, etc.
//     });

//     Alert.alert("Success", "Profile updated successfully!");
//     navigation.navigate("MainHomeScreen");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Complete Your Profile</Text>
//       <Text style={styles.subHeaderText}>Please upload a profile picture</Text>

//       <View style={styles.imageContainer}>
//         {selectedImage ? (
//           <Image source={{ uri: selectedImage }} style={styles.profileImage} />
//         ) : (
//           <View style={styles.placeholderImage}>
//             <Icon name="user" size={50} color="#aaa" />
//           </View>
//         )}
//       </View>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
//           <Text style={styles.buttonText}>Choose from Library</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.imageButton} onPress={handleTakePhoto}>
//           <Text style={styles.buttonText}>Take Photo</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.saveButton} onPress={handleSaveInfo}>
//         <Text style={styles.saveButtonText}>Save & Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff3e0',
//     paddingHorizontal: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   subHeaderText: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 20,
//   },
//   imageContainer: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     overflow: 'hidden',
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 75,
//   },
//   placeholderImage: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#ddd',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: 20,
//   },
//   imageButton: {
//     flex: 1,
//     backgroundColor: '#835e45',
//     padding: 10,
//     borderRadius: 10,
//     marginHorizontal: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   saveButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 15,
//     borderRadius: 30,
//     width: '100%',
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, auth } from './firebase';
import Icon from 'react-native-vector-icons/Feather';

export default function AdditionalInfoPage({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Image selection error:", error);
      Alert.alert("Error", "An error occurred while selecting the image.");
    }
  };

  const handleTakePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Camera error:", error);
      Alert.alert("Error", "An error occurred while taking the photo.");
    }
  };

  const handleSaveInfo = async () => {
    if (!selectedImage) {
      Alert.alert("Error", "Please select an image.");
      return;
    }

    try {
      const storage = getStorage();
      const userId = auth.currentUser.uid;
      const imageRef = ref(storage, `users/${userId}/profile.jpg`);

      const response = await fetch(selectedImage);
      const blob = await response.blob();

      await uploadBytes(imageRef, blob);

      const imageUrl = await getDownloadURL(imageRef);

      await updateDoc(doc(firestore, "users", userId), {
        imageUrl: imageUrl,
      });

      Alert.alert("Success", "Profile updated successfully!");
      navigation.navigate("MainHomeScreen");
    } catch (error) {
      console.log("Save info error:", error);
      Alert.alert("Error", "An error occurred while saving the profile.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Complete Your Profile</Text>
      <Text style={styles.subHeaderText}>Please upload a profile picture</Text>

      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Icon name="user" size={50} color="#aaa" />
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
          <Text style={styles.buttonText}>Choose from Library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageButton} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveInfo}>
        <Text style={styles.saveButtonText}>Save & Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e0',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  imageButton: {
    flex: 1,
    backgroundColor: '#835e45',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
