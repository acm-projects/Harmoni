import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons like sort, hamburger
import Home from './img/home.png'; 
import Calendar from './img/calendar.png'; 
import Messages from './img/messages.png';
import Server from './img/server.png'; 

const CommunityScreen = ({ navigation }) => { // Add navigation prop here
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Study Buddies', color: '#ff9a62' },
    { id: 2, name: 'Fam Bam', color: '#b6f36a' },
    { id: 3, name: 'Chem 1301', color: '#c9a0ff' },
    { id: 4, name: 'Boulder Bros', color: '#96dbfc' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = () => {
    if (newTaskName.trim() === '') {
      Alert.alert('Error', 'Please enter a valid task name.');
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      name: newTaskName,
      color: '#f9c74f' // Assigning a default color
    };
    setTasks([...tasks, newTask]);
    setModalVisible(false);
    setNewTaskName('');
  };

  return (
    <View style={styles.container}>

      {/* Top Menu */}
      <View style={styles.topMenu}>
        <Text style={styles.mainCategoryText}>All Category</Text>
      </View>

      {/* Category Grid */}
      <View style={styles.gridContainer}>
        {tasks.map(task => (
          <TouchableOpacity
            key={task.id}
            style={[styles.categoryItem, { backgroundColor: task.color }]}
            onPress={() => {
              if (task.name === 'Study Buddies') {
                navigation.navigate('StudyBuddies'); // Navigate to Study Buddies Screen
              }
            }}
          >
            <Text style={styles.categoryText}>{task.name}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(task.id)}
            >
              <Ionicons name="close" size={16} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {/* Add Button */}
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Modal to Add Task */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Task</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Task Name"
              value={newTaskName}
              onChangeText={text => setNewTaskName(text)}
            />
            <Text style={styles.inviteText}>Invite Friends</Text>
            <Button title="Add Task" onPress={addTask} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavBar}>
        <Image source={Home} style={styles.iconStyle} />
        <TouchableOpacity onPress={() => navigation.navigate('CalendarScreen')}>
          <Image source={Calendar} style={styles.iconStyle} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Community')}>
          <Image source={Messages} style={styles.iconStyle} />
        </TouchableOpacity>
        <Image source={Server} style={styles.iconStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e0',
    paddingTop: 50,
  },
  topMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 50, // Moved down a bit more
  },
  mainCategoryText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 125,
    marginTop: 20,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 0,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 0, // Move the boxes further down
  },
  categoryItem: {
    width: '40%',
    height: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
  },
  addButton: {
    width: '40%',
    height: 150,
    backgroundColor: '#f9c74f',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff3e0',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#fff3e0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    borderRadius: 5,
  },
  inviteText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default CommunityScreen;
