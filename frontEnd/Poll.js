import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView, Dimensions, Animated } from 'react-native';
import React, { useState, useEffect } from 'react'
import RNPoll, { IChoice } from 'react-native-poll'
import { Navigation } from 'lucide-react'
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Poll( {navigation} ){
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = await AsyncStorage.getItem('groupName');
      if (storedUserData) {
        const user = JSON.parse(storedUserData);
        setGroupName(user);
      }
    };

    fetchUserData();
  }, []); 


  const choices = [
    { id: 1, choice: '1PM', votes: 0},
    { id: 2, choice: '2PM', votes: 0},
    { id: 3, choice: '3PM', votes: 0}
  ]
  const [polls, setPolls] = useState([
    { id: 1, name: 'What time for ACM Meeting?', members: 8},
    {id: 2, name: 'What time for pancakes?', members: 10}
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newPollName, setNewPollName] = useState('');
  const [numVotes, setNumVotes] = useState('');
  const [filteredPolls, setFilteredPolls] = useState(polls);

  //add poll function
  const addPoll = () => {
    if (newPollName.trim() === '') {
      Alert.alert('Error', 'Please enter a valid Poll Question.');
      return;
    }

    const newPoll = {
      id: polls.length + 1,
      name: newPollName,
      members: parseInt(numVotes, 10) || 0,
    };

    setPolls([...polls, newPoll]);
    setModalVisible(false);
    setNewPollName('');
    setNumVotes(parseInt(numVotes, 10));
  };

  const CategoryItem = ({item}) => ( //poll
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{item.name}</Text>
      <RNPoll style={{width: 300}}
        totalVotes={item.members}
        choices={choices}
        borderColor='#FEDE69'
        fillBackgroundColor='#FEDE69'
        defaultChoiceBorderWidth={1}
        selectedChoiceBorderWidth={2}
        onChoicePress={(selectedChoice: IChoice) =>
          {console.log("SelectedChoice: ", selectedChoice);}
        }/>
    </View>
  );

  return (
   //poll grid
    <ScrollView style={styles.container}>
        <Text
            style={{
                padding: 1,
              marginTop: 10,
              fontSize: 40,
              fontWeight: 'bold'
            }}>
            {groupName}
          </Text>
      <View>
      {polls.map(polls => (
            <CategoryItem key={polls.id} item={polls} />
          ))}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <MaterialCommunityIcons 
          name="plus" 
          size={32} 
          color="#666"
        />
        <Text style={styles.addButtonText}>Create New Group</Text>
      </TouchableOpacity>

      <Modal
       visible={modalVisible}
       animationType="slide"
       transparent={true}
       >
       <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Enter Poll Name</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="x" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.textInput}
              placeholder="New Poll"
              value={newPollName}
              onChangeText={setNewPollName}
              placeholderTextColor="#666"
            />

            <TextInput
              style={styles.textInput}
              placeholder="Enter number of voters"
              value={numVotes}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, '');
                setNumVotes(numericValue);
              }}
              inputMode="numeric"
              keyboardType='numeric'
              placeholderTextColor="#666"
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.createButton]} 
                onPress={addPoll}
              >
                <Text style={[styles.buttonText, { color: 'white' }]}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </Modal>
      </View>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  container:{
        padding: 50,
        backgroundColor: '#fff3e0',
    },
    pollStyle: {
      width: 350
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
    addButton: {
      marginTop: 20,
      color: 'gray',
      justifyContent: 'center'
    },
    addButtonText: {
      color: '#666',
      marginTop: 8,
      fontSize: 14,
      fontWeight: '500',
    },
    createButton: {
      backgroundColor: '#007AFF',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    categoryContainer: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 15,
      justifyContent: 'center',
      marginTop: 20
    },
    categoryTitle: {
      fontWeight: 'bold',
      fontSize: 30
    }
})

