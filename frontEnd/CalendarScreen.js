import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTasks, setSelectedTasks] = useState(null); // State to track tasks for the selected day
  const today = new Date().toISOString().split('T')[0];

  const [userData, setUserData] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
        console.log(JSON.parse(storedUserData).email + "HELLO")
        console.log("Worked")
      }
      console.log(userData + "AAAAAA")
    };

    fetchUserData();
  }, []); 


  // Function to generate marked dates
  const generateMarkedDates = () => {
    const marked = {};
    for (let i = 1; i <= 31; i++) {
      const date = `2024-10-${i < 10 ? '0' : ''}${i}`;
      marked[date] = {
        textColor: date < today ? '#d9d9d9' : '#333',
        color: date === today ? '#FFA07A' : undefined, // Highlight today
        selected: date === today,
        selectedColor: '#FFA07A',
      };
    }
    return marked;
  };

  const markedDates = generateMarkedDates();

  const tags = [
    { id: 1, label: 'Shot Dribbble', color: '#FFD700' },
    { id: 2, label: 'Meeting', color: '#90EE90' },
    { id: 3, label: 'Fitness', color: '#FFB6C1' },
    { id: 4, label: 'Mabar', color: '#87CEFA' },
    { id: 5, label: 'Course', color: '#FFD700' }
  ];

  const activityData = [
    { day: 'Mon', tasks: 3 },
    { day: 'Tue', tasks: 4 },
    { day: 'Wed', tasks: 2 },
    { day: 'Thu', tasks: 5 },
    { day: 'Fri', tasks: 3 },
    { day: 'Sat', tasks: 6 },
    { day: 'Sun', tasks: 7 }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{userData.name}</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity>
              <Icon name="chevron-left" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <Calendar
            style={styles.calendar}
            theme={{
              backgroundColor: '#fff3e0',
              calendarBackground: '#fff3e0',
              textSectionTitleColor: '#666',
              selectedDayBackgroundColor: '#FFA07A',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#FFA07A',
              dayTextColor: '#333',
              textDisabledColor: '#d9d9d9',
              dotColor: '#000',
              selectedDotColor: '#ffffff',
              arrowColor: 'black',
              monthTextColor: '#000',
              textDayFontSize: 16,
              textMonthFontSize: 20,
              textDayHeaderFontSize: 14
            }}
            markedDates={markedDates}
            onDayPress={day => setSelectedDate(day.dateString)}
            hideArrows={true}
          />
        </View>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {tags.map(tag => (
            <TouchableOpacity
              key={tag.id}
              style={[styles.tag, { backgroundColor: tag.color }]}
            >
              <Text style={styles.tagText}>{tag.label}</Text>
              <Icon name="x" size={16} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Activity Graph */}
        <View style={styles.graphContainer}>
          <View style={styles.graphHeader}>
          </View>
          <View style={styles.graph}>
            {activityData.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.barContainer}
                onPress={() => setSelectedTasks(item.tasks)} // Update selected tasks
              >
                <View style={[styles.bar, { height: (item.tasks / 7) * 120 }]} />
                <Text style={styles.barLabel}>{item.day}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedTasks !== null && (
            <Text style={styles.selectedTasksText}>
              {`Tasks for the selected day: ${selectedTasks}`}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  calendarContainer: {
    paddingHorizontal: 20,
  },
  calendar: {
    borderRadius: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 20,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#333',
  },
  graphContainer: {
    padding: 20,
    backgroundColor: '#fff3e0',
    borderRadius: 24,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  graphHeader: {
    marginBottom: 16,
  },
  graphTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  graph: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    paddingVertical: 16,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    backgroundColor: '#FFA07A',
    borderRadius: 10,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter',
  },
  selectedTasksText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
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

export default CalendarScreen;
