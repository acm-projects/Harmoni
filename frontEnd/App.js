import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './LoginPages/HomeScreen'; // Import your HomeScreen
import RegisterPage from './LoginPages/RegisterPage';
import WelcomeBackScreen from './LoginPages/WelcomeBackScreen'; // Import your WelcomeBackScreen
import MainHomeScreen from './MainHomeScreen';
import CalendarScreen from './CalendarScreen'; // Your calendar screen
import Community from './Community';
import StudyBuddies from './StudyBuddiesScreen';
import ACMMeetingScreen from './ACMMeetingScreen'; // Import the new screen
import ProfilePage from './LoginPages/ProfilePage';
import FriendsScreen from './LoginPages/FriendsScreen';
import AdditionalInfoPage from './LoginPages/AdditionalInfoPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WelcomeBack" component={WelcomeBackScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false}} />
        <Stack.Screen name="MainHomeScreen" component={MainHomeScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{headerShown: false}} />
        <Stack.Screen name="CommunityScreen" component={Community} options={{headerShown: false}} />
        <Stack.Screen name="StudyBuddies" component={StudyBuddies} options={{headerShown: false}} />
        <Stack.Screen name="ACMMeeting" component={ACMMeetingScreen} options={{headerShown: false}} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} options={{headerShown: false}}/>
        <Stack.Screen name="FriendsScreen" component={FriendsScreen} options={{headerShown: false}}/>
        <Stack.Screen name="AdditionalInfoPage" component={AdditionalInfoPage} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
