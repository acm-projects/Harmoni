import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icons for navigation

const StudyBuddiesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Studybuddies</Text>
      </View>

      {/* Circular Events */}
      <View style={styles.circleContainer}>
      <TouchableOpacity style={styles.circleContainer} onPress={() => navigation.navigate('ACMMeeting')}>
        <View style={styles.largeCircle}>
          <Text>Weekly ACM Meeting</Text>
          <Text>(Pending)</Text>
        </View>
      </TouchableOpacity>

        <View style={styles.rowContainer}>
          <View style={styles.smallCircle}>
            <Text style={styles.circleText}>Boba on Thur</Text>
            <Text style={styles.statusText}>(Approved)</Text>
          </View>

          <View style={styles.mediumCircle}>
            <Text style={styles.circleText}>Study Session on Fri</Text>
            <Text style={styles.statusText}>(Approved)</Text>
          </View>

          <View style={styles.smallCircle}>
            <Text style={styles.circleText}>Ramen</Text>
            <Text style={styles.statusText}>(Approved)</Text>
          </View>
        </View>
      </View>

      {/* Bottom Navigation */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e0',
    paddingTop: 40,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  largeCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#e1f7d5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderColor: '#000',
    borderWidth: 3,
  },
  mediumCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ffbdbd',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 3,
  },
  smallCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#c9c9ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 3,
  },
  circleText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusText: {
    textAlign: 'center',
    fontSize: 12,
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

export default StudyBuddiesScreen;
