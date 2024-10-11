import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import axios from 'axios';

const GroupForm = () => {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState(['']);

  const addMemberInput = () => {
    setMembers([...members, '']);
  };

  const handleMemberChange = (text: string, index: number) => {
    const newMembers = [...members];
    newMembers[index] = text;
    setMembers(newMembers);
  };

  const deleteMemberInput = (index: number) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  const handleSubmit = async () => {
    // Handle form submission logic here
    console.log('Group Name:', groupName);
    console.log('Members:', members);
    const groupData = {groupName, members};
    try{
      const response = await axios.post("http://localhost:8000/createGroup", groupData );
      console.log(response.data.message)
    }catch(error){
        console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Group Name:</Text>
      <TextInput
        style={[styles.input, styles.groupNameInput]}
        value={groupName}
        onChangeText={setGroupName}
        placeholder="Enter group name"
      />
      <Text style={styles.label}>Members:</Text>
      {members.map((member, index) => (
        <View key={index} style={styles.memberContainer}>
          <TextInput
            style={styles.input}
            value={member}
            onChangeText={(text) => handleMemberChange(text, index)}
            placeholder={`Enter member ${index + 1}`}
          />
          <Button title="Delete" onPress={() => deleteMemberInput(index)} />
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Add Member" onPress={addMemberInput} />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
  groupNameInput: {
    width: '80%', // Adjust this value as needed
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 10,
  },
});

export default GroupForm;