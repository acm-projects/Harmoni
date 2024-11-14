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
        theme = {backgroundColor = '#fff30'}
        items={{
         
          '2024-10-29': [
  {name: 'PHYS 2326.001 - Lamya Saleh', data: "classes"},
  {name: 'CS 3377.0W1 - SMD', data: "classes"},
  {name: 'CS 3345.503 - Sruthi Chappidi', data: "classes"},
  {name: 'Veer Waje - Brother Interview', data: "AKPSI events"}
],
'2024-10-30': [
  {name: 'CS 2340.006 - Alice Wang', data: "classes"},
  {name: 'CS 3345.002 - Omar Hamdy', data: "classes"}
],
'2024-10-31': [
  {name: 'PHYS 2326.001 - Lamya Saleh', data: "classes"},
  {name: 'CS 3377.0W1 - SMD', data: "classes"},
  {name: 'LAB PHYS 2126.119', data: "classes"},
  {name: 'CS 3345.503 - Sruthi Chappidi', data: "classes"}
],
'2024-11-04': [
  {name: 'CS 2340.006 - Alice Wang', data: "classes"},
  {name: 'CS 3345.002 - Omar Hamdy', data: "classes"},
],
'2024-11-05': [
  {name: 'PHYS 2326.001 - Lamya Saleh', data: "classes"},
  {name: 'CS 3377.0W1 - SMD', data: "classes"},
  {name: 'CS 3345.503 - Sruthi Chappidi', data: "classes"},
  {name: 'PHYS 2326 Exam 3', data: "exams"}
],
'2024-11-08': [
  {name: 'ML and AI Research Meeting', data: "extracurricular events"},
  {name: 'akpsi/fintech hackathon', data: "AKPSI events"}
],
'2024-11-09': [
  {name: 'akpsi/fintech hackathon', data: "AKPSI events"}
],
'2024-11-13': [
  {name: 'Babatise Awobokun - Brother Interview', data: "AKPSI events"},
  {name: 'Ilan Perez - Brother Interview', data: "AKPSI events"},
  {name: 'CS 3345 Exam 2', data: "exams"}
],
'2024-11-14': [
  {name: 'CS 3345 Exam 2', data: "exams"},
  {name: 'Brotherhood Event - Fam Line Game Night', data: "exams"}
],
'2024-11-16': [
  {name: 'COURT OF HONOR', data: "exams"}
],
'2024-11-22': [
  {name: 'ML and AI Research Meeting', data: "extracurricular events"}
],
'2024-12-11': [
  {name: 'CS 2340 Exam 3 (Final)', data: "exams"}
],
'2024-12-20': [
  {name: 'ML and AI Research Meeting', data: "extracurricular events"}
]
        }}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style = {styles.item}>
            <Text style = {styles.container}>{item.name}</Text>
            <Text style = {styles.container}>{item.data}</Text>
          </TouchableOpacity>
        )}
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

  },
  item:{
    backgroundColor: 'lightblue',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 25,
  }
})   
