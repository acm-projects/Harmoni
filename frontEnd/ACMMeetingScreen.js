import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icons for navigation


const ACMMeetingScreen = ({ navigation }) => {
  const [voteOptions, setVoteOptions] = useState([
    { id: 1, date: 'Mon (9/25) @ 1:30pm', votes: 0 },
    { id: 2, date: 'Wed (9/25) @ 2:00pm', votes: 0 },
    { id: 3, date: 'Fri (9/27) @ 8:00am', votes: 0 }
  ]);

  const [members, setMembers] = useState([
    { name: 'Kartik', status: 'voted' },
    { name: 'Leo', status: 'voted' },
    { name: 'Ayman', status: 'pending' },
    { name: 'Kaachan', status: 'unavailable' }
  ]);

  const handleVote = (id) => {
    // Logic to handle voting here
    // Increment the vote for the selected time
    setVoteOptions(prevOptions =>
      prevOptions.map(option =>
        option.id === id ? { ...option, votes: option.votes + 1 } : option
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Weekly ACM Meeting</Text>

      <View style={styles.voteContainer}>
        {voteOptions.map(option => (
          <TouchableOpacity key={option.id} style={styles.voteOption} onPress={() => handleVote(option.id)}>
            <Text>{option.date}</Text>
            <Text>{option.votes}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.changeVoteButton}>
        <Text style={styles.changeVoteText}>Change Vote</Text>
      </TouchableOpacity>
      <Text style={styles.timeRemainingText}>9 hrs remaining to vote</Text>

      <View style={styles.membersContainer}>
        {members.map((member, index) => (
          <View key={index} style={styles.memberRow}>
            <TouchableOpacity style={styles.circle} />
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberStatus}>{member.status}</Text>
          </View>
        ))}
      </View>
      <View style={styles.bottomNavBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CalendarScreen')}>
          <Ionicons name="calendar" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddEvent')}>
          <Ionicons name="add-circle" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
          <Ionicons name="chatbox" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Server')}>
          <Ionicons name="server" size={28} color="black" />
        </TouchableOpacity>
      </View>
      
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff3e0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  voteContainer: {
    marginBottom: 20,
  },
  voteOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
  },
  changeVoteButton: {
    backgroundColor: '#835e45',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  changeVoteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  timeRemainingText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  membersContainer: {
    marginTop: 20,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 10,
  },
  memberName: {
    fontSize: 18,
    flex: 1,
  },
  memberStatus: {
    fontSize: 16,
    color: '#666',
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff3e0',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default ACMMeetingScreen;
