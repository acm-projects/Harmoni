import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { User } from 'lucide-react';
import { useFocusEffect } from '@react-navigation/native';

const CommunityScreen = ({ navigation }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      // Trigger re-render by updating state
      setRefreshKey(prev => prev + 1);
    }, [])
  );


  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchBarWidth] = useState(new Animated.Value(0));
  const [newGroupMembers, setNewGroupMembers] = useState(['']);

  const [userData, setUserData] = useState('');

  const gradients = [
    ['#FF9A8B', '#FF6B8B'],    // Pink Gradient
    ['#4FACFE', '#00F2FE'],    // Blue Gradient
    ['#43E97B', '#38F9D7'],    // Green Gradient
    ['#FA709A', '#FEE140'],    // Pink-Orange Gradient
    ['#F7971E', '#FFD200'],    // Orange Gradient
    ['#00C6FF', '#0072FF'],    // Sky Blue Gradient
    ['#F54EA2', '#FF7676'],    // Red-Pink Gradient
    ['#36D1DC', '#5B86E5'],    // Aqua-Blue Gradient
    ['#A1C4FD', '#C2E9FB'],    // Light Blue Gradient
    ['#FF9A9E', '#FAD0C4'],    // Soft Pink Gradient
    ['#B06AB3', '#4568DC'],    // Purple-Blue Gradient
    ['#3E5151', '#DECBA4'],    // Brown-Grey Gradient
    ['#FFDEE9', '#B5FFFC'],    // Pink-Cyan Gradient
    ['#FF6A88', '#FF9472'],    // Red-Orange Gradient
    ['#667EEA', '#764BA2'],    // Violet Gradient
    ['#8A2387', '#E94057', '#F27121'], // Purple to Orange Gradient
    ['#13547A', '#80D0C7'],    // Deep Blue-Green Gradient
    ['#FDC830', '#F37335'],    // Yellow-Orange Gradient
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        const user = JSON.parse(storedUserData);
        setUserData(user);
        const response = await axios.get(`http://localhost:8000/getGroups/?name=${user.name}`);
        const groups = response.data.map((group, index) => ({
          id: index + 1,             // Assign a unique ID
          name: group.groupName,      // Use the group name from backend
          members: group.memberEmails.length,  // Set members count dynamically
          color: gradients[Math.floor(Math.random() * gradients.length)]  // Example color (you could randomize this)
        }));
        setTasks(groups);
        setFilteredTasks(groups);  // Initialize filteredTasks with retrieved data
      }
    };

    fetchUserData();
  }, []); 

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  }, [searchQuery, tasks]);

  const toggleSearch = () => {
    if (isSearching) {
      Animated.timing(searchBarWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setIsSearching(false);
        setSearchQuery('');
      });
    } else {
      setIsSearching(true);
      Animated.timing(searchBarWidth, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const deleteTask = (id,name) => {
    setTasks(tasks.filter(task => task.id !== id));
    const groupName = name
    const memberName = userData.name
    console.log(name);
    axios.post('http://localhost:8000/leaveGroup',{groupName,memberName})
    alert("Group " + name + " has been left")
    setTimeout(() => {}, 3000);
    
  };

  const addGroupMemberInput = () => {
    setNewGroupMembers([...newGroupMembers, '']);
  };
  const removeGroupMemberInput = () => {
    if(newGroupMembers.length === 1) return;
    setNewGroupMembers(newGroupMembers.slice(0, -1));
  };

  const handleGroupMemberChange = (text, index) => {
    const updatedMembers = [...newGroupMembers];
    updatedMembers[index] = text;
    setNewGroupMembers(updatedMembers);
  };

  const addTask = async() => {
    console.log(tasks)
    if (newTaskName.trim() === '' || tasks.includes(newTaskName.trim())) {
      alert('Error', 'Please enter a valid group name.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/createGroup', {
      groupName: newTaskName,
      members: [userData.name, ...newGroupMembers.filter(member => member.trim() !== '')]
      });
    } catch (error) {
      console.error('Error creating group:', error);
      alert(error.response.data.error)
      return;
    }
    

    const newTask = {
      id: tasks.length + 1,
      name: newTaskName,
      members: newGroupMembers.length+1,
      color: gradients[Math.floor(Math.random() * gradients.length)]
    };
    setTasks([...tasks, newTask]);
    setFilteredTasks([...filteredTasks, newTask]);
    setModalVisible(false);
    setNewTaskName('');
    setNewGroupMembers(['']);
    navigation.navigate('Community');
  };

  const CategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={async () => {
        await AsyncStorage.setItem('groupName', item.name);
        await AsyncStorage.setItem('groupMembers', JSON.stringify(item.members));
        navigation.navigate('GroupCalendarScreen');
      }}
    >
      <LinearGradient
        colors={item.color}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.categoryItem}
      >
        <View style={styles.categoryContent}>
          <Text style={styles.categoryText}>{item.name}</Text>
          <View style={styles.memberInfo}>
            <Icon name="users" size={14} color="white" />
            <Text style={styles.memberCount}>{item.members} members</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(item.id,item.name)}
        >
          <Ionicons name="close" size={16} color="white" />
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );

  const interpolatedWidth = searchBarWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '80%'],
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Animated.View style={[
          styles.searchContainer,
          { width: interpolatedWidth }
        ]}>
          {isSearching ? (
            <TextInput
              style={styles.searchInput}
              placeholder="Search groups..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
              placeholderTextColor="#666"
            />
          ) : null}
        </Animated.View>
        <Text style={[
          styles.headerTitle,
          isSearching && { display: 'none' }
        ]}>Groups</Text>
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={toggleSearch}
        >
          <Icon name={isSearching ? "x" : "search"} size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          {filteredTasks.map(task => (
            <CategoryItem key={task.id} item={task} />
          ))}
          
          {/* Add Button */}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <LinearGradient
              colors={['#E0EAFC', '#CFDEF3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.categoryItem, styles.addButton]}
            >
              <Icon name="plus" size={32} color="#666" />
              <Text style={styles.addButtonText}>Create New Group</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Group</Text>
              <TouchableOpacity onPress={() => {setModalVisible(false); setNewGroupMembers([''])}}>
                <Icon name="x" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.textInput}
              placeholder="Enter group name"
              value={newTaskName}
              onChangeText={setNewTaskName}
              placeholderTextColor="#666"
            />
            
            {newGroupMembers.map((member, index) => (
              <TextInput
                key={index}
                style={styles.textInput}
                placeholder={`Enter member ${index + 1} name`}
                value={member}
                onChangeText={(text) => handleGroupMemberChange(text, index)}
                placeholderTextColor="#666"
              />
            ))}
            
            <TouchableOpacity onPress={addGroupMemberInput}>
              <Icon name="plus" size={24} color="#333" />
              
            </TouchableOpacity>
            <TouchableOpacity onPress={removeGroupMemberInput}>
              <Icon name="minus" size={24} color="#333" />
              
            </TouchableOpacity>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => {setModalVisible(false); setNewGroupMembers([''])}}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.createButton]} 
                onPress={addTask}
              >
                <Text style={[styles.buttonText, { color: 'white' }]}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff3e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchContainer: {
    position: 'absolute',
    left: 20,
    height: 40,
    backgroundColor: '#fff3e0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  searchButton: {
    padding: 8,
    backgroundColor: '#fff3e0',
    borderRadius: 12,
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: Dimensions.get('window').width * 0.44,
    height: 160,
    borderRadius: 20,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  categoryContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginTop: 8,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  memberCount: {
    color: 'white',
    marginLeft: 4,
    fontSize: 12,
  },
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    padding: 6,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  addButtonText: {
    color: '#666',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff3e0',
    paddingVertical: 12,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 24,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  textInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
  },
  createButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CommunityScreen;