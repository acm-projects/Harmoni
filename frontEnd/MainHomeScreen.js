import React from 'react';
import { Image, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Home from './img/home.png'; 
import Calendar from './img/calendar.png'; 
import Messages from './img/messages.png';
import Server from './img/server.png'; 
import JohnDoe from './img/johndoe.png'; 

export default function MainHomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.greetingText}>Hello, Kartik</Text>
        <View style={styles.profileContainer}>
          <Image source={JohnDoe} style={styles.profileImage} />
        </View>
      </View>

      {/* Mini Calendar */}
      <View style={styles.miniCalendarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <View key={index} style={styles.dayContainer}>
              <Text style={styles.dayText}>{day}</Text>
              <Text style={styles.dateText}>{15 + index}</Text> 
            </View>
          ))}
        </ScrollView>
      </View>

      {/* New sections start here */}

      {/* Active Polls Section */}
      <View style={styles.pollsContainer}>
        <Text style={styles.pollsTitle}>Active Polls</Text>
        <Text style={styles.pollsDescription}>You have 5 polls to vote for</Text>
        <Text style={styles.pollsDetails}>Study buddies | Fam Bam | Chem 1301</Text>
      </View>

      {/* Upcoming Events Section */}
      <View style={styles.eventsContainer}>
        <Text style={styles.eventsTitle}>Upcoming Events</Text>
        <Text style={styles.eventItem}>1pm: Rock Climbing w/ Buddies</Text>
        <Text style={styles.eventItem}>7pm: Chem Review Session</Text>
        <Text style={styles.eventItem}>Tomorrow: 10am Brunch w/ Fam Bam</Text>
      </View>

      {/* Exams Section */}
      <View style={styles.examsContainer}>
        <Text style={styles.examTitle}>Exam!</Text>
        <Text style={styles.examDescription}>Chem 1301 Exam 1 - 2pm @ Sci 1.220</Text>
      </View>

      {/* Discover Section */}
      <View style={styles.discoverContainer}>
        <Text style={styles.discoverTitle}>Discover...</Text>
        <Text style={styles.discoverDescription}>Explore new activities</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Ensures space between top and bottom content
    backgroundColor: '#fff3e0', // Background color same as your theme
  },
  topSection: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between', // Align the greeting on the left and profile image on the right
    backgroundColor: '#fff3e0', // Same background as the rest of the app
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50, // This makes the image a circle
    borderWidth: 2,
    borderColor: '#ddd', // Optional border color
    marginTop: 45, // Adjust the margin to move the profile image down
    marginRight: 20
  },
  greetingText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 65, // Adjust to align with profile image
    marginLeft: 50
  },
  miniCalendarContainer: {
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 5,  // Reduce padding on sides to allow more width
    backgroundColor: '#fff3e0',
    borderRadius: 10,
    marginHorizontal: 10,  // Decrease the horizontal margins to extend the width
    borderColor: '#ddd',
    borderWidth: 0,
    width: '95%',  // Set width to cover more of the screen
    alignSelf: 'center',  // Center the calendar container
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: 15,  // Increase horizontal margin for better spacing
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  dateText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },

  // Active Polls Styles
  pollsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    marginHorizontal: 20,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  pollsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  pollsDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  pollsDetails: {
    fontSize: 14,
    color: '#333',
  },

  // Upcoming Events Styles
  eventsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    marginHorizontal: 20,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  eventItem: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },

  // Exams Styles
  examsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    marginHorizontal: 20,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  examTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  examDescription: {
    fontSize: 16,
    color: '#333',
  },

  // Discover Styles
  discoverContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    marginHorizontal: 20,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  discoverTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  discoverDescription: {
    fontSize: 16,
    color: '#333',
  },

  // Bottom Navigation Bar Styles
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Space the icons evenly
    backgroundColor: '#fff3e0', // Background for the nav bar
    paddingVertical: 10, // Padding for the nav bar
    borderTopWidth: 1,
    borderTopColor: '#fff3e0', // Light border at the top of the nav bar
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
});

