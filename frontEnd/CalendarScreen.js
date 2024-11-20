import {View, StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import { Agenda, Calendar } from 'react-native-calendars';
import { useState ,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const CalendarScreen = ({ navigation }) => {
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
  }, []); // Empty dependency array ensures this runs once on mount

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
  }, [userData]); // Dependency array includes userData

  const newCalendarItems = [
    {
      "calendarId": "7e11452251f9c27cf69f74f13a9b05b9d7146cff5e6016ea7813a84d7a897826@group.calendar.google.com",
      "summary": "Professors' Office Hours",
      "_id": "6720604c639d3a1a1e72fa2e",
      "events":[
        {
          "summary": "Church Basketball IMs",
          "start": "2025-01-07T03:00:00.000Z",
          "end": "2025-01-07T04:00:00.000Z",
          "_id": "673c208f07ccfcc3da603d11"
        },
        {
          "summary": "Lizzymamma Madrumvepp",
          "start": "2024-11-22T00:00:00.000Z",
          "end": "2024-11-22T02:00:00.000Z",
          "_id": "673283c29cab7cbf8cb4b30b"
        }
      ]
    },
    {
      "calendarId": "3921e5125ada4e469c0a34bde64c875853c1fe2614ff6031749f4e945be162d1@group.calendar.google.com",
      "summary": "AKPSI events",
      "_id": "6720604d639d3a1a1e72fa31",
      "events":[
        {
          "summary": "Veer Waje - Brother Interview",
          "start": "2024-10-29T19:30:00.000Z",
          "end": "2024-10-29T20:30:00.000Z",
          "_id": "67206058639d3a1a1e72fa4c"
        },
        {
          "summary": "Ilan Perez - Brother Interview",
          "start": "2024-11-14T00:00:00.000Z",
          "end": "2024-11-14T00:45:00.000Z",
          "_id": "67352f5e4e58dd2477569978"
        }
      ]
    }

  ]

  const dataCalendar = [
    {
      "summary": "ML and AI Research Meeting Exam",
      "start": "2024-11-18T11:00:00-06:00",
      "end": "2024-11-18T12:00:00-06:00",
      "calendar": "extracurricular events"
    },
    {
      "summary": "ML and AI Research Meeting Exam",
      "start": "2024-11-19T11:00:00-06:00",
      "end": "2024-11-19T12:00:00-06:00",
      "calendar": "extracurricular events"
    },
    {
      "summary": "PHYS 2326.001 - Lamya Saleh",
      "start": "2024-11-20T09:00:00-06:00",
      "end": "2024-11-20T10:15:00-06:00",
      "calendar": "classes"
    },
    {
      "summary": "CS 3377.0W1 - SMD",
      "start": "2024-11-18T10:30:00-06:00",
      "end": "2024-11-18T11:45:00-06:00",
      "calendar": "classes"
    },
    {
      "summary": "CS 3345.503 - Exam",
      "start": "2024-11-19T18:00:00-06:00",
      "end": "2024-11-19T19:15:00-06:00",
      "calendar": "classes"
    },
    {
      "summary": "CS 2340.006 - Alice Wang",
      "start": "2024-11-20T12:00:00-06:00",
      "end": "2024-11-20T13:15:00-06:00",
      "calendar": "classes"
    },
  ];

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
          backgroundColor: '#fff3e0', // Change the background color
          calendarBackground: '#ffffff', // Change the calendar background color
          textSectionTitleColor: '#835e45', // Change the text section title color
          selectedDayBackgroundColor: '#ffcc00', // Change the selected day background color
          selectedDayTextColor: '#ffffff', // Change the selected day text color
          todayTextColor: '#835e45', // Change the today text color
          dayTextColor: '#2d4150', // Change the day text color
          textDisabledColor: '#d9e1e8', // Change the text disabled color
          dotColor: '#835e45', // Change the dot color
          selectedDotColor: '#ffffff', // Change the selected dot color
          arrowColor: 'black', // Change the arrow color
          monthTextColor: '#ffcc00', // Change the month text color
          indicatorColor: '#ffcc00', // Change the indicator color
          agendaDayTextColor: 'black', // Change the agenda day text color
          agendaDayNumColor: 'gray', // Change the agenda day number color
          agendaTodayColor: '#835e45', // Change the agenda today color
          agendaKnobColor: '#ffcc00', // Change the agenda knob color
          navBarBackgroundColor: '#fff3e0' // Change the navbar background color
        }}
      />
    </SafeAreaView>
  )
};



export default CalendarScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff3e0',
  },
  item:{
    backgroundColor: '#fff3e0', // Main background color
    borderColor: '#ebbf44', // Yellow for border color
    borderWidth: 1, // Define the border width
    borderRadius: 5,
    padding: 10, // Adjust padding to make the border smaller
    marginRight: 10, // Adjust margin to make the border smaller
    marginTop: 17, // Adjust margin to make the border smaller
  },
  itemText: {
    color: '#000',
  },
  examText: {
    color: 'darkred',
  },
  examItem: {
    backgroundColor: 'red',
    borderWidth: .01, // Reduce border thickness
    borderColor: 'darkred',
  },
  assignmentItem:{
    backgroundColor: 'orange',
    borderWidth: .01, // Reduce border thickness
    borderColor: 'blue',
  }
})
