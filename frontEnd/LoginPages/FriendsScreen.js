// import React, { useState, useEffect } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   Modal,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import { auth, firestore } from './firebase'; // Import your Firebase configuration
// import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
// import { collection, query, where, getDocs } from 'firebase/firestore';

// export default function FriendsScreen({ navigation }) {
//   const [activeTab, setActiveTab] = useState('My Friends');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [friendCode, setFriendCode] = useState(''); // User's own friend code
//   const [inputCode, setInputCode] = useState('');
//   const [receivedRequests, setReceivedRequests] = useState([]); // Store received requests
//   const [friendsList, setFriendsList] = useState([]); // Store friends

//   const tabs = ['My Friends', 'Received', 'Sent'];

//   // Fetch the user's data from Firestore when the component mounts
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const user = auth.currentUser;
//         if (user) {
//           const userDoc = await getDoc(doc(firestore, 'users', user.uid));
//           if (userDoc.exists()) {
//             const userData = userDoc.data();
//             setFriendCode(userData.friendCode);
//             setReceivedRequests(userData.receivedRequests || []);
//             setFriendsList(userData.friends || []);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleInviteFriends = () => {
//     setIsModalVisible(true);
//   };



//   const handleAddFriendCode = async () => {
//     try {
//       const user = auth.currentUser;
//       if (!user || !inputCode) return;
  
//       // Query Firestore for a document with the matching friendCode
//       const q = query(collection(firestore, 'users'), where('friendCode', '==', inputCode));
//       const querySnapshot = await getDocs(q);
  
//       if (querySnapshot.empty) {
//         Alert.alert('Error', 'Friend code not found');
//         return;
//       }
  
//       // Assuming friendCode is unique, get the first matched document
//       const friendDoc = querySnapshot.docs[0];
//       const friendData = friendDoc.data();
//       const friendId = friendDoc.id;
  
//       // Add request to friend's "receivedRequests" and user's "sentRequests"
//       await updateDoc(doc(firestore, 'users', friendId), {
//         receivedRequests: arrayUnion({ id: user.uid, friendCode: friendCode }),
//       });
  
//       await updateDoc(doc(firestore, 'users', user.uid), {
//         sentRequests: arrayUnion({ id: friendId, friendCode: inputCode }),
//       });
  
//       Alert.alert('Success', 'Friend request sent');
//       setInputCode('');
//       setIsModalVisible(false);
//     } catch (error) {
//       console.error('Error sending friend request:', error);
//     }
//   };

//   const handleAcceptRequest = async (request) => {
//     try {
//       const user = auth.currentUser;
//       if (!user) return;

//       // Update both users' friends lists
//       await updateDoc(doc(firestore, 'users', user.uid), {
//         friends: arrayUnion(request.id),
//         receivedRequests: arrayRemove(request),
//       });

//       await updateDoc(doc(firestore, 'users', request.id), {
//         friends: arrayUnion(user.uid),
//         sentRequests: arrayRemove({ id: user.uid, friendCode }),
//       });

//       Alert.alert('Success', 'Friend request accepted');
//       setReceivedRequests(receivedRequests.filter((req) => req.id !== request.id));
//       setFriendsList((prevList) => [...prevList, { id: request.id, friendCode: request.friendCode }]);
//     } catch (error) {
//       console.error('Error accepting friend request:', error);
//     }
//   };

//   const handleDeclineRequest = async (request) => {
//     try {
//       const user = auth.currentUser;
//       if (!user) return;

//       await updateDoc(doc(firestore, 'users', user.uid), {
//         receivedRequests: arrayRemove(request),
//       });

//       await updateDoc(doc(firestore, 'users', request.id), {
//         sentRequests: arrayRemove({ id: user.uid, friendCode }),
//       });

//       Alert.alert('Success', 'Friend request declined');
//       setReceivedRequests(receivedRequests.filter((req) => req.id !== request.id));
//     } catch (error) {
//       console.error('Error declining friend request:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Friends</Text>
//         <TouchableOpacity style={styles.addButton} onPress={handleInviteFriends}>
//           <Icon name="user-plus" size={24} color="#835e45" />
//         </TouchableOpacity>
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabsContainer}>
//         {tabs.map((tab) => (
//           <TouchableOpacity
//             key={tab}
//             onPress={() => setActiveTab(tab)}
//             style={[styles.tab, activeTab === tab && styles.activeTab]}
//           >
//             <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <ScrollView style={styles.friendsList} showsVerticalScrollIndicator={false}>
//         {activeTab === 'My Friends' &&
//           friendsList.map((friend) => (
//             <View key={friend.id} style={styles.friendCard}>
//               <Text style={styles.friendName}>Friend Code: {friend.friendCode}</Text>
//             </View>
//           ))}

//         {activeTab === 'Received' &&
//           receivedRequests.map((request) => (
//             <View key={request.id} style={styles.friendCard}>
//               <Text style={styles.friendName}>Friend Request from: {request.friendCode}</Text>
//               <View style={styles.requestActions}>
//                 <TouchableOpacity onPress={() => handleAcceptRequest(request)}>
//                   <Text style={styles.acceptText}>Accept</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => handleDeclineRequest(request)}>
//                   <Text style={styles.declineText}>Decline</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}
//       </ScrollView>

//       {/* Modal for Friend Code */}
//       <Modal transparent animationType="slide" visible={isModalVisible}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Invite Friends</Text>
//             <Text style={styles.modalText}>Your Friend Code: {friendCode}</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter friend's code"
//               value={inputCode}
//               onChangeText={setInputCode}
//             />
//             <TouchableOpacity style={styles.addFriendButton} onPress={handleAddFriendCode}>
//               <Text style={styles.addFriendButtonText}>Add Friend</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => setIsModalVisible(false)}>
//               <Text style={styles.cancelText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//       <View style={styles.bottomNav}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('MainHomeScreen')}>
//           <Icon name="home" size={24} color="#835e45" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('CalendarScreen')}>
//           <Icon name="calendar" size={24} color="#835e45" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('CommunityScreen')}>
//           <Icon name="message-square" size={24} color="#835e45" />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Icon name="server" size={24} color="#835e45" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('FriendsScreen')}>
//           <Icon name="users" size={24} color="#835e45" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff3e0',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#1A1A1A',
//   },
//   addButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   tab: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     marginRight: 12,
//     borderRadius: 20,
//     backgroundColor: 'transparent',
//   },
//   activeTab: {
//     backgroundColor: '#835e45',
//   },
//   tabText: {
//     color: '#666',
//     fontWeight: '600',
//   },
//   activeTabText: {
//     color: '#fff',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 20,
//     padding: 12,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginBottom: 16,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: '#1A1A1A',
//   },
//   friendsList: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   letterHeader: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#835e45',
//     paddingVertical: 8,
//   },
//   friendCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   avatarContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: '#835e45',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   avatarText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   friendInfo: {
//     flex: 1,
//   },
//   friendName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     marginBottom: 4,
//   },
//   universityText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   friendsCount: {
//     paddingHorizontal: 20,
//     marginBottom: 16,
//   },
//   countText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     width: '80%',
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     marginBottom: 10,
//     color: '#333',
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 20,
//     color: '#666',
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   addFriendButton: {
//     backgroundColor: '#835e45',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   addFriendButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   cancelText: {
//     color: '#666',
//     marginTop: 10,
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingVertical: 16,
//     backgroundColor: '#fff3e0',
//     borderTopWidth: 1,
//     borderTopColor: '#fff3e0',
//     marginBottom: -20
//   },
// });



import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { auth, firestore } from './firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function FriendsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('My Friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [friendCode, setFriendCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

  const tabs = ['My Friends', 'Received', 'Sent'];

  // Fetch the user's data from Firestore when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(firestore, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFriendCode(userData.friendCode);
            setReceivedRequests(userData.receivedRequests || []);
            setSentRequests(userData.sentRequests || []);
            setFriendsList(userData.friends || []);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInviteFriends = () => {
    setIsModalVisible(true);
  };

  const handleAddFriendCode = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !inputCode) return;
  
      const q = query(collection(firestore, 'users'), where('friendCode', '==', inputCode));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        Alert.alert('Error', 'Friend code not found');
        return;
      }
  
      const friendDoc = querySnapshot.docs[0];
      const friendData = friendDoc.data();
      const friendId = friendDoc.id;

      await updateDoc(doc(firestore, 'users', friendId), {
        receivedRequests: arrayUnion({ id: user.uid, friendCode: friendCode, fullName: auth.currentUser.displayName || "Unknown" }),
      });
  
      await updateDoc(doc(firestore, 'users', user.uid), {
        sentRequests: arrayUnion({ id: friendId, friendCode: inputCode, fullName: friendData.fullName }),
      });
  
      Alert.alert('Success', 'Friend request sent');
      setInputCode('');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleAcceptRequest = async (request) => {
    try {
        const user = auth.currentUser;
        if (!user) return;

        // Fetch the friend's full name from Firestore
        const friendDoc = await getDoc(doc(firestore, 'users', request.id));
        const friendFullName = friendDoc.exists() ? friendDoc.data().fullName : "Unknown";

        // Fetch the current user's full name to add to the friend's friend list
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        const userFullName = userDoc.exists() ? userDoc.data().fullName : "Unknown";

        // Update the current user's friends list with friend's full name
        await updateDoc(doc(firestore, 'users', user.uid), {
            friends: arrayUnion({ id: request.id, friendCode: request.friendCode, fullName: friendFullName }),
            receivedRequests: arrayRemove(request),
        });

        // Update the friend's friends list with the current user's full name
        await updateDoc(doc(firestore, 'users', request.id), {
            friends: arrayUnion({ id: user.uid, friendCode: friendCode, fullName: userFullName }),
            sentRequests: arrayRemove({ id: user.uid, friendCode, fullName: userFullName }),
        });

        Alert.alert('Success', 'Friend request accepted');
        
        // Update local state with the accepted friend’s information
        setReceivedRequests(receivedRequests.filter((req) => req.id !== request.id));
        setFriendsList((prevList) => [
            ...prevList, 
            { id: request.id, friendCode: request.friendCode, fullName: friendFullName }
        ]);
    } catch (error) {
        console.error('Error accepting friend request:', error);
    }
};

  const handleDeclineRequest = async (request) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await updateDoc(doc(firestore, 'users', user.uid), {
        receivedRequests: arrayRemove(request),
      });

      await updateDoc(doc(firestore, 'users', request.id), {
        sentRequests: arrayRemove({ id: user.uid, friendCode }),
      });

      Alert.alert('Success', 'Friend request declined');
      setReceivedRequests(receivedRequests.filter((req) => req.id !== request.id));
    } catch (error) {
      console.error('Error declining friend request:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Friends</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleInviteFriends}>
          <Icon name="user-plus" size={24} color="#835e45" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.friendsList} showsVerticalScrollIndicator={false}>
        {activeTab === 'My Friends' &&
          friendsList.map((friend) => (
            <View key={friend.id} style={styles.friendCard}>
              <Text style={styles.friendName}>{friend.fullName} (Friend Code: {friend.friendCode})</Text>
            </View>
          ))}

        {activeTab === 'Received' &&
          receivedRequests.map((request) => (
            <View key={request.id} style={styles.friendCard}>
              <Text style={styles.friendName}>Friend Request from: {request.fullName} (Code: {request.friendCode})</Text>
              <View style={styles.requestActions}>
                <TouchableOpacity onPress={() => handleAcceptRequest(request)}>
                  <Text style={styles.acceptText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeclineRequest(request)}>
                  <Text style={styles.declineText}>Decline</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

        {activeTab === 'Sent' &&
          sentRequests.map((request) => (
            <View key={request.id} style={styles.friendCard}>
              <Text style={styles.friendName}>Request Sent to: {request.fullName} (Code: {request.friendCode})</Text>
            </View>
          ))}
      </ScrollView>

      <Text style={styles.countText}>You have {friendsList.length} friends</Text>

      <Modal transparent animationType="slide" visible={isModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Invite Friends</Text>
            <Text style={styles.modalText}>Your Friend Code: {friendCode}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter friend's code"
              value={inputCode}
              onChangeText={setInputCode}
            />
            <TouchableOpacity style={styles.addFriendButton} onPress={handleAddFriendCode}>
              <Text style={styles.addFriendButtonText}>Add Friend</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.bottomNav}>
         <TouchableOpacity
          onPress={() => navigation.navigate('MainHomeScreen')}>
          <Icon name="home" size={24} color="#835e45" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CalendarScreen')}>
          <Icon name="calendar" size={24} color="#835e45" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CommunityScreen')}>
          <Icon name="message-square" size={24} color="#835e45" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="server" size={24} color="#835e45" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('FriendsScreen')}>
          <Icon name="users" size={24} color="#835e45" />
        </TouchableOpacity>
       </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#835e45',
  },
  tabText: {
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  friendsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  requestActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  acceptText: {
    color: '#4CAF50',
    fontWeight: '600',
    marginRight: 20,
  },
  declineText: {
    color: '#f44336',
    fontWeight: '600',
  },
  countText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    fontSize: 16,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  addFriendButton: {
    backgroundColor: '#835e45',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addFriendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  cancelText: {
    color: '#666',
    marginTop: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff3e0',
    borderTopWidth: 1,
    borderTopColor: '#fff3e0',
    marginBottom: -20,
  },
});
