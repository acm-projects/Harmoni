import {View, StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import { Agenda, Calendar } from 'react-native-calendars';
import { useState ,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    const parsedItems = parseDataCalendar(dataCalendar);
    setCalendarItems(parsedItems);
  }, []);

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
      "summary": "CS 3345.503 - Sruthi Chappidi",
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
    data.forEach(event => {
      const date = event.start.slice(0, 10);
      if (!items[date]) {
        items[date] = [];
      }
      items[date].push({
        name: event.summary,
        data: event.calendar
      });
    });
    return items;
  };





  const exam = ["Exam, exam, exams, Exams"];
  const assignment = ["Assignment, assignment, assignments, Assignments"];
  return(
    <SafeAreaView style={styles.container}>
      <Agenda
        items={calendarItems}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={[styles.item, exam.some(exam => item.name.includes(exam))? styles.examItem : assignment.some(assignment => item.name.includes(assignment)) ? styles.assignmentItem : null]}>
            <Text style={[styles.container, item.data === 'Exam' ? styles.examItem : item.data === 'Assignment' ? styles.assignmentItem : null]}>
              {item.name}
            </Text>
            <Text style={[styles.container, item.data === 'Exam' ? styles.examItem : item.data === 'Assignment' ? styles.assignmentItem : null]}>
              {item.data}
            </Text>
          </TouchableOpacity>
        )}
        theme={{
          backgroundColor: '#ff3e0', // Change the background color
          calendarBackground: '#ffffff', // Change the calendar background color
          textSectionTitleColor: '#835e45', // Change the text section title color
          selectedDayBackgroundColor: '#ffcc00', // Change the selected day background color
          selectedDayTextColor: '#ffffff', // Change the selected day text color
          todayTextColor: '#835e45', // Change the today text color
          dayTextColor: '#2d4150', // Change the day text color
          textDisabledColor: '#d9e1e8', // Change the text disabled color
          dotColor: '#835e45', // Change the dot color
          selectedDotColor: '#ffffff', // Change the selected dot color
          arrowColor: '#835e45', // Change the arrow color
          monthTextColor: '#ffcc00', // Change the month text color
          indicatorColor: '#ffcc00', // Change the indicator color
          agendaDayTextColor: 'black', // Change the agenda day text color
          agendaDayNumColor: 'gray', // Change the agenda day number color
          agendaTodayColor: '#835e45', // Change the agenda today color
          agendaKnobColor: '#ffcc00' // Change the agenda knob color
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
    backgroundColor: '#fff3e0',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 25,
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
