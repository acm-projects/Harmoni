import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Calendar} from 'react-native-calendars';
import React from 'react';
import Home from './img/home.png'; 
import Calendar2 from './img/calendar.png'; 
import Messages from './img/messages.png';
import Server from './img/server.png'; 

const CalendarScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style = {styles.containEventsStyle}>
            <Calendar
            style={styles.calendarStyle}
            theme={{
                calendarBackground: '#FFFFFF',
                textMonthFontWeight: 'bold',
                arrowColor: '#FEDE69',
                todayTextColor: '#FEDE69',
                dotColor: '#FEDE69'
            }}
            onDayPress={day=>{
                <>
                </>
            }}/>
            <View style = {styles.ClassStyle}>
                <Text>Class: 8:30 - 12:00</Text>
            </View>
            <View style = {styles.MeetingStyle}>
                <Text>Meeting: 4:00 - 5:30</Text>
            </View>
            <View style = {styles.PersonalStyle}>
                <Text>Date Night: 8:00 - 10:30</Text>
            </View>
      </View>
      <View style={styles.bottomNavBar}>
        <TouchableOpacity onPress={() => navigation.navigate('MainHomeScreen')}>
          <Image source={Home} style={styles.iconStyle} />
        </TouchableOpacity>
          <Image source={Calendar2} style={styles.iconStyle} />
        <Image source={Messages} style={styles.iconStyle} />
        <Image source={Server} style={styles.iconStyle} />
      </View>
    </View>
  )
}
export default CalendarScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: '#FFF3E6'
    },
    containEventsStyle: { 
        height: 800,
        padding: 20,
        borderRadius: 16,
        backgroundColor: 'white',
        marginTop: 50
    },
    calendarStyle: {
        padding: 20,
        borderRadius: 16,
        height: 400
    },
    ClassStyle: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FEDE69',
        color: '#FFFFFF',
        borderRadius: 20,
        height: 80,
    },
    MeetingStyle: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#CA82C8',
        borderRadius: 20,
        height: 80,
    },
    PersonalStyle: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'lightgreen',
        borderRadius: 20,
        height: 80,
    },
    bottomNavBar: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Space the icons evenly
        backgroundColor: '#fff', // Background for the nav bar
        paddingVertical: 10, // Padding for the nav bar
        borderTopWidth: 1,
        borderTopColor: '#ddd', // Light border at the top of the nav bar
      },
      iconStyle: {
        width: 25,
        height: 25,
      },
})

















