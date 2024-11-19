import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore} from './firebase'; // Import your Firebase setup

const ProfilePage = ({ navigation }) => {
  const [user, setUser] = useState({
    name: '',
    role: 'College Student',
    email: '',
    phoneNumber: '',
    password: '********',
    birthDate: '2 May 2006',
    joinedDate: '22 Oct 2024',
    image: require('../img/johndoe.png'),
  });

  const [statuses] = useState([
    { id: 1, emoji: '😴', label: 'Away', color: '#333333', selected: true },
    { id: 2, emoji: '💻', label: 'At Work', color: '#90EE90', selected: false },
    { id: 3, emoji: '🎮', label: 'Gaming', color: '#FFA07A', selected: false },
    { id: 4, emoji: '📍' , label: 'Busy', color: '#87CEFA', selected: false},
    { id: 5, emoji: '🏖️' , label: 'Vacation', color: '#FF69B4', selected: false},
  ]);

  const [selectedStatus, setSelectedStatus] = useState(1);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const docRef = doc(firestore, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUser({
              ...user,
              name: data.fullName,
              email: data.email,
              phoneNumber: data.phoneNumber,
            });
          } else {
            Alert.alert("Error", "User data not found");
          }
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };

    fetchUserData();
  }, []);

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
          <Image source={user.image} style={styles.avatar} />
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
            value={user.email}
            editable={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={user.name}
            editable={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={user.phoneNumber}
            editable={false}
          />
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


