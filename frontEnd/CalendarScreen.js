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
          arrowColor: '835e45', // Change the arrow color
          monthTextColor: 'ffcc00', // Change the month text color
          indicatorColor: 'ffcc00', // Change the indicator color
          agendaDayTextColor: 'black', // Change the agenda day text color
          agendaDayNumColor: 'gray', // Change the agenda day number color
          agendaTodayColor: '835e45', // Change the agenda today color
          agendaKnobColor: 'ffcc00' // Change the agenda knob color
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
}) 
