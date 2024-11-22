import {View, StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import { Agenda, Calendar } from 'react-native-calendars';
import { useState } from 'react';


const CalendarScreen = ({ navigation }) => {
  const dataCalendar = [
    {
      "summary": "ML and AI Research Meeting",
      "start": "2024-11-08T11:00:00-06:00",
      "end": "2024-11-08T12:00:00-06:00",
      "calendar": "extracurricular events"
  },
  {
      "summary": "ML and AI Research Meeting",
      "start": "2024-11-22T11:00:00-06:00",
      "end": "2024-11-22T12:00:00-06:00",
      "calendar": "extracurricular events"
  },
  {
      "summary": "PHYS 2326.001 - Lamya Saleh",
      "start": "2024-10-29T09:00:00-06:00",
      "end": "2024-10-29T10:15:00-06:00",
      "calendar": "classes"
  },
  {
      "summary": "CS 3377.0W1 - SMD",
      "start": "2024-10-29T10:30:00-06:00",
      "end": "2024-10-29T11:45:00-06:00",
      "calendar": "classes"
  },
  {
      "summary": "CS 3345.503 - Sruthi Chappidi",
      "start": "2024-10-29T18:00:00-06:00",
      "end": "2024-10-29T19:15:00-06:00",
      "calendar": "classes"
  },
  {
      "summary": "CS 2340.006 - Alice Wang",
      "start": "2024-10-30T12:00:00-06:00",
      "end": "2024-10-30T13:15:00-06:00",
      "calendar": "classes"
  },
  ]
  const print = () =>{
    console.log(parseDataCalendar(dataCalendar))
  }

  const parseDataCalendar = (data) => {
    return data.map(event => ({
      time: event.start.slice(11, 16), // Extract time from start
      name: event.summary,
      endTime: event.end.slice(11, 16), // Extract time from end
      data: event.calendar
    }));
  };
  const day = '2024-11-14';
  return(
    <SafeAreaView style={styles.container}>
      <Agenda
        items={{
         
          '2024-11-13': [
  {name: 'PHYS 2326.001 - Lamya Saleh', data: "classes"},
  {name: 'Veer Waje - Brother Interview', data: "AKPSI events"}
],
'2024-11-13': [
  {name: 'CS 2340.006 - Alice Wang', data: "classes"},
  {name: 'CS 3345.002 - Omar Hamdy', data: "classes"}
],
'2024-11-14': [
  {name: 'PHYS 2326.001 - Lamya Saleh', data: "classes"},
  {name: 'LAB PHYS 2126.119', data: "classes"},
  {name: 'CS 3345.503 - Sruthi Chappidi', data: "classes"}
],
'2024-11-15': [
  {name: 'CS 2340.006 - Alice Wang', data: "classes"},
  {name: 'CS 3345.002 - Omar Hamdy', data: "classes"},
],
'2024-11-16': [
  {name: 'PHYS 2326.001 - Lamya Saleh', data: "classes"},
  {name: 'CS 3345.503 - Sruthi Chappidi', data: "classes"},
  {name: 'PHYS 2326 Exam 3', data: "exams"}
]
        }}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style = {styles.item}>
            
            <Text style = {styles.container}>{item.name}</Text>
            <Text style = {styles.container}>{item.data}</Text>
          </TouchableOpacity>
        )}
        theme={{
          backgroundColor: '#fff3e0', // Main background color
          calendarBackground: '#fff3e0', // Main background color
          textSectionTitleColor: '#835e45', // Brown for section titles
          selectedDayBackgroundColor: '#ebbf44', // Yellow for selected day background
          selectedDayTextColor: '#ffffff', // White for selected day text
          todayTextColor: '#835e45', // Brown for today's text
          dayTextColor: '#000000', // Black for day text
          textDisabledColor: '#d9e1e8', // Disabled text color
          dotColor: '#835e45', // Brown for dots
          selectedDotColor: '#ffffff', // White for selected dots
          arrowColor: '#835e45', // Brown for arrows
          monthTextColor: '#ebbf44', // Yellow for month text
          indicatorColor: '#ebbf44', // Yellow for indicator
          agendaDayTextColor: '#000000', // Black for agenda day text
          agendaDayNumColor: '#000000', // Black for agenda day number
          agendaTodayColor: '#835e45', // Brown for agenda today
          agendaKnobColor: '#ebbf44' // Yellow for agenda knob
        }}
      />
    </SafeAreaView>
  )
};



export default CalendarScreen;

const styles = StyleSheet.create({
  agendaBackground: {
    backgroundColor: '#fff3e0',
  },
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
    color: '#000000',
  },
}) 
