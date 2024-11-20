import {View, StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Agenda, Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";

const GroupCalendarScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  const [calendarItems, setCalendarItems] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = await AsyncStorage.getItem('userData');
      console.log(storedUserData)
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/event/stored-events/${userData.email}`);
        const parsedItems = parseDataCalendar(response.data);
        setCalendarItems(parsedItems);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };

    if (userData.email) {
      fetchCalendarData();
    }
  }, [userData]);

  const parseDataCalendar = (data) => {
    const items = {};
    data.forEach(calendar => {
      calendar.events.forEach(event => {
        const date = event.start.slice(0, 10);
        const startTime = new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const endTime = new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (!items[date]) {
          items[date] = [];
        }
        items[date].push({
          name: event.summary,
          data: calendar.summary,
          startTime: startTime,
          endTime: endTime
        });
      });
    });
    return items;
  };

  const exam = ["Exam", "exam", "exams", "Exams"];
  const assignment = ["Assignment", "assignment", "assignments", "Assignments", "HW", "hw", "Homework", "homework"];

  const actions = [
    {
      text: "Poll",
      icon: "", // Ensure you have an icon for the button
      name: "bt_poll",
      position: 1
    }
  ];

  return(
    <SafeAreaView style={styles.container}>
      <Agenda
        items={calendarItems}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={[styles.item, exam.some(exam => item.name.includes(exam)) ? styles.examItem : assignment.some(assignment => item.name.includes(assignment)) ? styles.assignmentItem : null]}>
            <Text style={[styles.container, exam.some(exam => item.name.includes(exam)) ? styles.examItem : assignment.some(assignment => item.name.includes(assignment)) ? styles.assignmentItem : null]}>
              {item.name}
            </Text>
            <Text style={[styles.container, exam.some(exam => item.name.includes(exam)) ? styles.examItem : assignment.some(assignment => item.name.includes(assignment)) ? styles.assignmentItem : null]}>
              {item.data} ({item.startTime} - {item.endTime})
            </Text>
          </TouchableOpacity>
        )}
        theme={{
          backgroundColor: '#fff3e0',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#835e45',
          selectedDayBackgroundColor: '#ffcc00',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#835e45',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#835e45',
          selectedDotColor: '#ffffff',
          arrowColor: 'black',
          monthTextColor: '#ffcc00',
          indicatorColor: '#ffcc00',
          agendaDayTextColor: 'black',
          agendaDayNumColor: 'gray',
          agendaTodayColor: '#835e45',
          agendaKnobColor: '#ffcc00',
          navBarBackgroundColor: '#fff3e0'
        }}
      />
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          if (name === "bt_poll") {
            navigation.navigate("Poll");
          }
        }}
      />
    </SafeAreaView>
  )
};

export default GroupCalendarScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff3e0',
  },
  item:{
    backgroundColor: '#fff3e0',
    borderColor: '#ebbf44',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    color: '#000',
  },
  examItem: {
    backgroundColor: '#ff6868ff',
    borderWidth: 0,
    borderColor: '#000000ff',
  },
  assignmentItem:{
    backgroundColor: 'orange',
    borderWidth: .01,
    borderColor: 'blue',
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#ffcc00',
    borderRadius: 30,
    elevation: 8
  }
})
