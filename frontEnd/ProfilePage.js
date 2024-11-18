// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';

// const ProfilePage = ({ navigation }) => {
//   const [user, setUser] = useState({
//     name: 'Kartik Joshi',
//     role: 'Senior Designer',
//     email: 'edwardlarry@email.com',
//     username: 'EdLarry',
//     password: '********',
//     birthDate: '14 September 1994',
//     joinedDate: '21 Jan 2020',
//     image: require('./img/johndoe.png'),
//   });

//   const [isEditingName, setIsEditingName] = useState(false);
//   const initialColors = ['#FFD700', '#90EE90', '#FFA07A', '#87CEFA', '#FF69B4'];

//   const [statuses, setStatuses] = useState([
//     { id: 1, label: '😴 Away', selected: true, color: initialColors[0] },
//     { id: 2, label: '🖥️ At Work', selected: false, color: initialColors[1] },
//     { id: 3, label: '🎮 Gaming', selected: false, color: initialColors[2] },
//     { id: 4, label: '📍 Busy', selected: false, color: initialColors[3] },
//     { id: 5, label: '🏖️ On Vacation', selected: false, color: initialColors[4] },
//   ]);

//   const [selectedStatus, setSelectedStatus] = useState(statuses[0].id);

//   const selectStatus = (id) => {
//     setStatuses((prevStatuses) =>
//       prevStatuses.map((status) =>
//         status.id === id
//           ? { ...status, selected: true }
//           : { ...status, selected: false }
//       )
//     );
//     setSelectedStatus(id);
//   };

//   const changePhoto = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       setUser((prevUser) => ({
//         ...prevUser,
//         image: { uri: result.assets[0].uri },
//       }));
//     } else {
//       Alert.alert('Image Picker', 'You canceled the image selection.');
//     }
//   };

//   const handleEditName = () => {
//     setIsEditingName(true);
//   };

//   const handleNameChange = (newName) => {
//     setUser((prevUser) => ({
//       ...prevUser,
//       name: newName,
//     }));
//   };

//   const finishEditingName = () => {
//     setIsEditingName(false);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>My Profile</Text>
//         <Ionicons name="ellipsis-horizontal" size={24} color="#333" />
//       </View>

//       {/* Profile Section */}
//       <View style={styles.profileSection}>
//         <View style={styles.profileImageContainer}>
//           <Image source={user.image} style={styles.profileImage} />
//           <TouchableOpacity style={styles.cameraIcon} onPress={changePhoto}>
//             <Ionicons name="camera" size={18} color="#fff" />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.nameContainer}>
//           {isEditingName ? (
//             <TextInput
//               style={styles.userNameInput}
//               value={user.name}
//               onChangeText={handleNameChange}
//               onBlur={finishEditingName}
//               autoFocus
//             />
//           ) : (
//             <Text style={styles.userName}>{user.name}</Text>
//           )}
//           <TouchableOpacity style={styles.editIcon} onPress={handleEditName}>
//             <Ionicons name="pencil" size={16} color="#333" />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.userRole}>{user.role}</Text>
//       </View>

//       <Text style={styles.statusTitle}>My Status</Text>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusContainer}>
//         {statuses.map((status) => (
//           <TouchableOpacity
//             key={status.id}
//             style={[
//               styles.statusButton,
//               {
//                 backgroundColor: status.selected ? '#333' : status.color,
//               },
//             ]}
//             onPress={() => selectStatus(status.id)}
//           >
//             <Text style={styles.statusText}>{status.label}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <View style={styles.additionalInfoContainer}>
//         <View style={styles.inputGroup}>
//           <Text style={styles.infoLabel}>Email Address</Text>
//           <TextInput style={styles.inputField} value={user.email} editable={false} />
//         </View>
//         <View style={styles.inputGroup}>
//           <Text style={styles.infoLabel}>Username</Text>
//           <TextInput style={styles.inputField} value={`@${user.username}`} editable={false} />
//         </View>
//         <View style={styles.inputGroup}>
//           <Text style={styles.infoLabel}>Password</Text>
//           <TextInput style={styles.inputField} value={user.password} editable={false} secureTextEntry />
//           <Text style={styles.passwordHint}>Password should contain at least 8 characters!</Text>
//         </View>
//         <View style={styles.inputGroup}>
//           <Text style={styles.infoLabel}>Birth Date (Optional)</Text>
//           <TextInput style={styles.inputField} value={user.birthDate} editable={false} />
//         </View>
//         <View style={styles.inputGroup}>
//           <Text style={styles.infoLabel}>Joined</Text>
//           <TextInput style={styles.inputField} value={user.joinedDate} editable={false} />
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff3e0',
//     paddingHorizontal: 20,
//     paddingTop: 40,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 15,
//   },
//   profileSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   profileImageContainer: {
//     position: 'relative',
//     marginLeft: 30,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   cameraIcon: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     backgroundColor: '#835e45',
//     borderRadius: 15,
//     padding: 5,
//   },
//   nameContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 50,
//     marginTop: -30,
//   },
//   userName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginRight: 10,
//   },
//   userNameInput: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//     marginRight: 10,
//     padding: 0,
//   },
//   editIcon: {
//     marginLeft: 5,
//   },
//   userRole: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 30,
//     marginLeft: -179,
//   },
//   statusTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     marginBottom: 30,
//   },
//   statusButton: {
//     width: 120,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   statusText: {
//     color: '#fff',
//     marginLeft: 5,
//   },
//   additionalInfoContainer: {
//     backgroundColor: '#fff3e0',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 230, // Adjusted from -100 to 10
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   infoLabel: {
//     fontSize: 12,
//     color: '#999',
//     marginBottom: 3,
//   },
//   inputField: {
//     fontSize: 16,
//     color: '#333',
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     padding: 5,
//   },
//   passwordHint: {
//     color: '#ff4500',
//     fontSize: 12,
//   },
//   account: {
//     marginTop: 20
//   },
//   accountText: {
//     color: '#7d7f7c',
//     fontSize: 15
//   }
// });

// export default ProfilePage;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';



const ProfilePage = ({ navigation }) => {

  const [userData, setUserData] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
        console.log(JSON.parse(storedUserData).email + "HELLO")
        console.log("Worked")
      }
      // console.log(userData + "AAAAAA")
    };

    fetchUserData();
  }, []); 

  const [user, setUser] = useState({
    name: userData.name,
    role: 'College Student',
    email: userData.email,
    username: userData.name,
    password: userData.password,
    birthDate: '2 May 2006',
    joinedDate: '22 Oct 2024',
    image: require('./img/johndoe.png'),
  });

  const [statuses] = useState([
    { id: 1, emoji: '😴', label: 'Away', color: '#333333', selected: true },
    { id: 2, emoji: '💻', label: 'At Work', color: '#90EE90', selected: false },
    { id: 3, emoji: '🎮', label: 'Gaming', color: '#FFA07A', selected: false },
    { id: 4, emoji: '📍' , label: 'Busy', color: '#87CEFA', selected: false},
    { id: 5, emoji: '🏖️' , label: 'Vacation', color: '#FF69B4', selected: false},
  ]);

  const [selectedStatus, setSelectedStatus] = useState(1);

  const handleEditPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setUser(prev => ({ ...prev, image: { uri: result.assets[0].uri } }));
    }
  };
  const handleSwitchAccount = () => {
    // Implement the logic to switch accounts
    console.log('Switch to Other Account');
  };

  const handleLogout = () => {
    // Implement the logic for logout
    navigation.navigate('WelcomeBack');
  };

  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image source={{uri: userData.profilePicture}} style={styles.avatar} />
          <TouchableOpacity style={styles.editButton} onPress={handleEditPhoto}>
            <Ionicons name="camera" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.role}>{user.role}</Text>
      </View>

      {/* Status Section */}
      <View style={styles.statusSection}>
        <Text style={styles.statusTitle}>My Status</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.statusScrollView}
        >
          {statuses.map((status) => (
            <TouchableOpacity
              key={status.id}
              style={[
                styles.statusTag,
                { backgroundColor: selectedStatus === status.id ? status.color : status.color + '80' },
              ]}
              onPress={() => setSelectedStatus(status.id)}
            >
              <Text style={styles.statusEmoji}>{status.emoji}</Text>
              <Text style={styles.statusText}>{status.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={userData.email}
            editable={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={`@${userData.name}`}
            editable={false}
          />
          <View style={styles.checkmark}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={userData.password}
            secureTextEntry
            editable={false}
          />
          <Text style={styles.passwordHint}>Password should contain at least 8 characters!</Text>
        </View>

        <View style={styles.dateGroup}>
          <Text style={styles.label}>Birth Date (Optional)</Text>
          <View style={styles.dateInputs}>
            <TextInput style={[styles.dateInput, styles.dayInput]} value="2" editable={false} />
            <TextInput style={[styles.dateInput, styles.monthInput]} value="May" editable={false} />
            <TextInput style={[styles.dateInput, styles.yearInput]} value="2006" editable={false} />
          </View>
        </View>

      </View>
      <View style={styles.accountSection}>
        <Text style={styles.accountLabel}>My Account</Text>
        <TouchableOpacity onPress={handleSwitchAccount} style={styles.accountButton}>
          <Text style={styles.switchAccountText}>Switch to Other Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.accountButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerRight: {
    width: 24,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,  // Reduced to accommodate status section
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#666',
  },
  // New Status Styles
  statusSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statusTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  statusScrollView: {
    flexDirection: 'row',
  },
  statusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  statusEmoji: {
    marginRight: 6,
    fontSize: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  form: {
    paddingHorizontal: 24,
  },
  inputGroup: {
    marginBottom: 24,
    position: 'relative',
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  checkmark: {
    position: 'absolute',
    right: 0,
    bottom: 8,
  },
  passwordHint: {
    fontSize: 12,
    color: '#FF5722',
    marginTop: 4,
  },
  dateGroup: {
    marginBottom: 24,
  },
  dateInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    fontSize: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dayInput: {
    width: '15%',
  },
  monthInput: {
    width: '50%',
    marginHorizontal: 16,
  },
  yearInput: {
    width: '25%',
  },
  joinedGroup: {
    marginBottom: 24,
  },
  joinedDate: {
    fontSize: 16,
    color: '#666',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  accountSection: {
    marginTop: 10,
    backgroundColor: '#fff3e0',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  accountLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 12,
  },
  accountButton: {
    marginVertical: 10,
  },
  switchAccountText: {
    color: '#1E90FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutText: {
    color: '#FF4500',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfilePage;