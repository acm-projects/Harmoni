// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'; // Import your HomeScreen
import RegisterPage from './RegisterPage';
import WelcomeBackScreen from './WelcomeBackScreen'; // Import your WelcomeBackScreen
import MainHomeScreen from './MainHomeScreen';
import CalendarScreen from './CalendarScreen'; // Your calendar screen
import Community from './Community';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainScreens(){
  return(
    <Tab.Navigator
    initialRouteName='MainScreens'
    screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="MainHomeScreen" 
        component={MainHomeScreen}
        options={{title: 'Home',
          tabBarIcon:({size, color})=>(
            <MaterialCommunityIcons name='home'
            size={size} color={color}/>
          ),
          tabBarActiveTintColor: '#FEDE69'
        }}
      />
      <Tab.Screen 
        name = "CalendarScreen" 
        component={CalendarScreen}
        options={{title: 'Calendar',
          tabBarIcon:({size, color})=>(
            <MaterialCommunityIcons name='calendar'
            size={size} color={color}/>
          ),
          tabBarActiveTintColor: '#FEDE69'
        }} 
      />
      <Tab.Screen 
        name = "Community" 
        component={Community}
        options={{title: 'Groups',
          tabBarIcon:({size, color})=>(
            <Ionicons name='people'
            size={size} color={color}/>
          ),
          tabBarActiveTintColor: '#FEDE69'
        }}
        />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WelcomeBack" component={WelcomeBackScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false}} />
        <Stack.Screen name="MainScreens" component={MainScreens} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
