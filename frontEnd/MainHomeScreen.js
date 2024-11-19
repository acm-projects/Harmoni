import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Home from './img/home.png';
import Calendar from './img/calendar.png';
import Messages from './img/messages.png';
import Server from './img/server.png';
import JohnDoe from './img/johndoe.png';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import StarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Star } from 'lucide-react';

export default function MainHomeScreen({navigation}) {
  const today = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [userData, setUserData] = useState({});
  const [userCalendar, setUserCalendar] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }

      // console.log(`http://localhost:8000/api/calendar/fetch-events/${userData.email}`)
      // await fetch(`http://localhost:8000/api/calendar/fetch-events/${userData.email}`),
      // await fetch(`http://localhost:8000/api/calendar/fetch-events/${userData.email}`);
      // const response = await axios.get(`http://localhost:8000/api/calendar/calendars/${userData.email}`);
      // await AsyncStorage.setItem('userCalendar', JSON.stringify(response));
      // const storedCalendar = await AsyncStorage.getItem('userCalendar');
      // if (storedCalendar) {
      //   setUserCalendar(JSON.parse(storedCalendar));
      // }
      // console.log("USERCALENDAR" , userCalendar)
    };
    
    fetchUserData();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>
              {today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </Text>
            <Text style={styles.greetingText}>Hello, {userData.name}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
            <Image source={{uri: userData.profilePicture}} style={styles.profileImage} />
          </TouchableOpacity>
        </View>

        {/* Mini Calendar */}
        <View style={styles.miniCalendarContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {days.map((day, index) => {
              const isToday = index === today.getDay();
              return (
                <TouchableOpacity key={index}>
                  <View style={[styles.dayContainer, isToday && styles.todayContainer]}>
                    <Text style={[styles.dayText, isToday && styles.todayText]}>{day}</Text>
                    <Text style={[styles.dateNumber, isToday && styles.todayText]}>
                      {15 + index}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Active Polls Card */}
          <TouchableOpacity>
            <LinearGradient
              colors={['#FFD700', '#FFC400']}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Active Polls</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>5</Text>
                </View>
              </View>
              <Text style={styles.cardSubtitle}>You have 5 polls to vote for</Text>
              <View style={styles.tagContainer}>
                {['Study buddies', 'Fam Bam', 'Chem 1301'].map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Upcoming Events Card */}
          <TouchableOpacity>
            <LinearGradient
              colors={['#90EE90', '#7BC67B']}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.cardTitle}>Upcoming Events</Text>
              {[
                '1pm: Rock Climbing w/ Buddies',
                '7pm: Chem Review Session',
                'Tomorrow: 10am Brunch w/ Fam Bam'
              ].map((event, index) => (
                <View key={index} style={styles.eventItem}>
                  <View style={styles.eventDot} />
                  <Text style={styles.eventText}>{event}</Text>
                </View>
              ))}
            </LinearGradient>
          </TouchableOpacity>

          {/* Exam Card */}
          <TouchableOpacity>
            <LinearGradient
              colors={['#FFB6C1', '#FF9AAA']}
              style={[styles.card, styles.examCard]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.examContent}>
                <View>
                  <Text style={styles.cardTitle}>Exam!</Text>
                  <Text style={styles.examDetails}>Chem 1301 Exam 1</Text>
                  <Text style={styles.examLocation}>2pm @ Sci 1.220</Text>
                </View>
                <View style={styles.examIcon}>
                  <Text style={styles.examEmoji}>📚</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity>
            <LinearGradient
              colors={['#87CEFA', '#5FB6E5']}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.cardTitle}>Discover...</Text>
              <Text style={styles.cardSubtitle}>Explore new activities</Text>
              <View style={styles.exploreIcon}>
                <Text style={styles.exploreEmoji}>🔍</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  miniCalendarContainer: {
    marginVertical: 20,
    paddingLeft: 20,
  },
  dayContainer: {
    width: 60,
    height: 80,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  todayContainer: {
    backgroundColor: '#1A1A1A',
  },
  dayText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  todayText: {
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  cardSubtitle: {
    fontSize: 15,
    color: '#1A1A1A',
    opacity: 0.8,
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 13,
    color: '#1A1A1A',
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1A1A1A',
    marginRight: 12,
  },
  eventText: {
    fontSize: 15,
    color: '#1A1A1A',
  },
  examCard: {
    paddingVertical: 16,
  },
  examContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  examDetails: {
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  examLocation: {
    fontSize: 14,
    color: '#1A1A1A',
    opacity: 0.8,
  },
  examIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  examEmoji: {
    fontSize: 24,
  },
  exploreIcon: {
    alignItems: 'center',
    marginTop: 12,
  },
  exploreEmoji: {
    fontSize: 24,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff3e0',
    borderTopWidth: 1,
    borderTopColor: '#fff3e0',
    marginBottom: -20
  },
});