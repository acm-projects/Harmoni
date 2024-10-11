// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'; // Import your HomeScreen
import RegisterPage from './RegisterPage';
import WelcomeBackScreen from './WelcomeBackScreen'; // Import your WelcomeBackScreen
import MainHomeScreen from './MainHomeScreen';
import CalendarScreen from './CalendarScreen'; // Your calendar screen
import Community from './Community';

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
        <Stack.Screen name="Community" component={Community} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
