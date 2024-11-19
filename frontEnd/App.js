// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './LoginPages/HomeScreen'; // Import your HomeScreen
import RegisterPage from './LoginPages/RegisterPage';
import WelcomeBackScreen from './LoginPages/WelcomeBackScreen'; // Import your WelcomeBackScreen
import MainHomeScreen from './MainHomeScreen';
import CalendarScreen from './CalendarScreen'; // Your calendar screen
import Community from './Community';
import StudyBuddiesScreen from './StudyBuddiesScreen'
import ACMMeetingScreen from './ACMMeetingScreen'
import Poll from './Poll';
import ProfilePage from './ProfilePage';
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import GroupCalendarScreen from './groupCalendarScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainScreens(){
  return(
    <Tab.Navigator
    initialRouteName='MainScreens'
    screenOptions={{ 
      headerShown: false, 
      tabBarStyle: { backgroundColor: '#fff3e0', borderTopWidth: 0 }, // Remove outline
      tabBarIconStyle: { marginBottom: -20 } // Adjust icon position
    }}>
      <Tab.Screen 
        name="Home" 
        component={MainHomeScreen}
        options={{title: '',
          tabBarIcon:({size, color})=>(
            <FontAwesome6 name='house-chimney'
            size={size + 0} color={color}/> // Increase size by 5
          ),
          tabBarActiveTintColor: '#3a372d'
        }}
      />
      <Tab.Screen 
        name = "CalendarScreen" 
        component={CalendarScreen}
        options={{title: '',
          tabBarIcon:({size, color})=>(
            <MaterialCommunityIcons name='calendar'
            size={size + 5} color={color}/> // Increase size by 5
          ),
          tabBarActiveTintColor: '#ffc800'
        }} 
      />
      <Tab.Screen 
        name = "groups" 
        component={CommunityScreens}
        options={{title: '',
          tabBarIcon:({size, color})=>(
            <MaterialCommunityIcons name='account-group'
            size={size + 5} color={color}/> // Increase size by 5
          ),
          tabBarActiveTintColor: '#fec700'
        }}
        />
    </Tab.Navigator>
  )
}
function CommunityScreens() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Community" component={Community} options={{ headerShown: false }} />
      <Stack.Screen name="StudyBuddies" component={StudyBuddiesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ACM Meeting Screen" component={ACMMeetingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Poll" component={Poll} options={{ headerShown: false}} />
      
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WelcomeBack" component={WelcomeBackScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false}} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false}} />
        <Stack.Screen name="MainHomeScreen" component={MainScreens} options={{ headerShown: false}}/>
        <Stack.Screen name="GroupCalendarScreen" component={GroupCalendarScreen} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
