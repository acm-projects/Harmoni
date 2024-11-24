import {View, StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Agenda, Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";

const GroupCalendarScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  const [calendarItems, setCalendarItems] = useState({});
  const [groupEmails, setGroupEmails] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = await AsyncStorage.getItem('userData');
      console.log(storedUserData)
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    };

    const getEmails = async () => {
      const group = await AsyncStorage.getItem('groupName');
      console.log("NAMES " + group);
      const response = await axios.get(`http://localhost:8000/getEmails?groupName=${group}`);
      console.log(response.data);
      setGroupEmails(response.data.memberEmails);
    }

    fetchUserData();
    getEmails();
  }, []);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        let combinedItems = [{
          "calendarId": "7e11452251f9c27cf69f3a9b05b9d7146cff5e6016ea7813a84d7a897826@group.calendar.google.com",
          "summary": "Free Time",
          "_id": "6720604c639d3a1a1e72fa2e",
          "events":[
            {
              "summary": "Abyss Watch Party",
              "start": "2024-11-28T13:00:00.000Z",
              "end": "2024-11-28T14:00:00.000Z",
              "_id": "673c208fcfcc3da603d11"
            },
            {
              "summary": "ACM Meeting",
              "start": "2024-11-28T13:00:00.000Z",
              "end": "2024-11-28T14:00:00.000Z",
              "_id": "673283c297cbf8cb4b30b"
            }
          ]
        }]
        for (const email of groupEmails) {
          const response = await axios.get(`http://localhost:8000/api/event/stored-events/${email}`);
          const parsedItems = parseDataCalendar(response.data);
          combinedItems = { ...combinedItems, ...parsedItems };
        }
        setCalendarItems(combinedItems);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };
  
    if (groupEmails.length > 0) {
      fetchCalendarData();
    }
  }, [groupEmails]);

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
    },
    {
      text: "Back",
      icon: "", // Ensure you have an icon for the button
      name: "bt_community",
      position: 2
    }
  ];

  return(
    <SafeAreaView style={styles.container}>
      <Agenda
        items={calendarItems}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={[
            styles.item, 
            exam.some(exam => item.name.includes(exam)) ? styles.examItem : 
            assignment.some(assignment => item.name.includes(assignment)) ? styles.assignmentItem : 
            item.data.includes("Free Time") ? styles.freeTimeItem : null
          ]}>
            <Text style={[
              styles.container, 
              exam.some(exam => item.name.includes(exam)) ? styles.examItem : 
              assignment.some(assignment => item.name.includes(assignment)) ? styles.assignmentItem : 
              item.data.includes("Free Time") ? styles.freeTimeItem : null
            ]}>
              {item.name}
            </Text>
            <Text style={[
              styles.container, 
              exam.some(exam => item.name.includes(exam)) ? styles.examItem : 
              assignment.some(assignment => item.name.includes(assignment)) ? styles.assignmentItem : 
              item.data.includes("Free Time") ? styles.freeTimeItem : null
            ]}>
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
          } else if (name === "bt_community") {
            navigation.navigate("Community");
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
  freeTimeItem: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    borderColor: '#000000ff',
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
