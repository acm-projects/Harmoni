// import React from 'react';
// import { Image, StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import Home from './img/home.png';
// import Calendar from './img/calendar.png';
// import Messages from './img/messages.png';
// import Server from './img/server.png';
// import JohnDoe from './img/johndoe.png';
// import Icon from 'react-native-vector-icons/Feather'; 


// export default function MainHomeScreen({navigation}) {
//   const today = new Date();
//   const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Header Section */}
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.dateText}>
//               {today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
//             </Text>
//             <Text style={styles.greetingText}>Hello, Kartik</Text>
//           </View>
//           <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
//             <Image source={JohnDoe} style={styles.profileImage} />
//           </TouchableOpacity>
//         </View>

//         {/* Mini Calendar */}
//         <View style={styles.miniCalendarContainer}>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {days.map((day, index) => {
//               const isToday = index === today.getDay();
//               return (
//                 <TouchableOpacity key={index}>
//                   <View style={[styles.dayContainer, isToday && styles.todayContainer]}>
//                     <Text style={[styles.dayText, isToday && styles.todayText]}>{day}</Text>
//                     <Text style={[styles.dateNumber, isToday && styles.todayText]}>
//                       {15 + index}
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               );
//             })}
//           </ScrollView>
//         </View>

//         {/* Main Content */}
//         <View style={styles.content}>
//           {/* Active Polls Card */}
//           <TouchableOpacity>
//             <LinearGradient
//               colors={['#FFD700', '#FFC400']}
//               style={styles.card}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//             >
//               <View style={styles.cardHeader}>
//                 <Text style={styles.cardTitle}>Active Polls</Text>
//                 <View style={styles.badge}>
//                   <Text style={styles.badgeText}>5</Text>
//                 </View>
//               </View>
//               <Text style={styles.cardSubtitle}>You have 5 polls to vote for</Text>
//               <View style={styles.tagContainer}>
//                 {['Study buddies', 'Fam Bam', 'Chem 1301'].map((tag, index) => (
//                   <View key={index} style={styles.tag}>
//                     <Text style={styles.tagText}>{tag}</Text>
//                   </View>
//                 ))}
//               </View>
//             </LinearGradient>
//           </TouchableOpacity>

//           {/* Upcoming Events Card */}
//           <TouchableOpacity>
//             <LinearGradient
//               colors={['#90EE90', '#7BC67B']}
//               style={styles.card}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//             >
//               <Text style={styles.cardTitle}>Upcoming Events</Text>
//               {[
//                 '1pm: Rock Climbing w/ Buddies',
//                 '7pm: Chem Review Session',
//                 'Tomorrow: 10am Brunch w/ Fam Bam'
//               ].map((event, index) => (
//                 <View key={index} style={styles.eventItem}>
//                   <View style={styles.eventDot} />
//                   <Text style={styles.eventText}>{event}</Text>
//                 </View>
//               ))}
//             </LinearGradient>
//           </TouchableOpacity>

//           {/* Exam Card */}
//           <TouchableOpacity>
//             <LinearGradient
//               colors={['#FFB6C1', '#FF9AAA']}
//               style={[styles.card, styles.examCard]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//             >
//               <View style={styles.examContent}>
//                 <View>
//                   <Text style={styles.cardTitle}>Exam!</Text>
//                   <Text style={styles.examDetails}>Chem 1301 Exam 1</Text>
//                   <Text style={styles.examLocation}>2pm @ Sci 1.220</Text>
//                 </View>
//                 <View style={styles.examIcon}>
//                   <Text style={styles.examEmoji}>📚</Text>
//                 </View>
//               </View>
//             </LinearGradient>
//           </TouchableOpacity>

//           <TouchableOpacity>
//             <LinearGradient
//               colors={['#87CEFA', '#5FB6E5']}
//               style={styles.card}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//             >
//               <Text style={styles.cardTitle}>Discover...</Text>
//               <Text style={styles.cardSubtitle}>Explore new activities</Text>
//               <View style={styles.exploreIcon}>
//                 <Text style={styles.exploreEmoji}>🔍</Text>
//               </View>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//       {/* <View style={styles.bottomNav}>
//         {[
//           { icon: Home, label: 'Home', active: true },
//           { icon: Calendar, label: 'Calendar' },
//           { icon: Messages, label: 'Community' },
//           { icon: Server, label: 'Menu' }
//         ].map((item, index) => (
//           <TouchableOpacity 
//             key={index} 
//             style={styles.navItem}
//             onPress={() => item.label !== 'Home' && navigation.navigate(`${item.label}Screen`)}
//           >
//             <View style={[styles.navButton, item.active && styles.activeNavButton]}>
//               <Image 
//                 source={item.icon} 
//                 style={[styles.navIcon, item.active && styles.activeNavIcon]} 
//               />
//             </View>
//             <Text style={[styles.navLabel, item.active && styles.activeNavLabel]}>
//               {item.label}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View> */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('MainHomeScreen')}>
//           <Icon name="home" size={24} color="#835e45" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('CalendarScreen')}>
//           <Icon name="calendar" size={24} color="#835e45" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('CommunityScreen')}>
//           <Icon name="message-circle" size={24} color="#835e45" />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Icon name="server" size={24} color="#835e45" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('FriendsScreen')}>
//           <Icon name="users" size={24} color="#835e45" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff3e0',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 10,
//   },
//   dateText: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 4,
//   },
//   greetingText: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#1A1A1A',
//   },
//   profileImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 50,
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   miniCalendarContainer: {
//     marginVertical: 20,
//     paddingLeft: 20,
//   },
//   dayContainer: {
//     width: 60,
//     height: 80,
//     marginRight: 12,
//     borderRadius: 20,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   todayContainer: {
//     backgroundColor: '#1A1A1A',
//   },
//   dayText: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 4,
//   },
//   dateNumber: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#1A1A1A',
//   },
//   todayText: {
//     color: '#fff',
//   },
//   content: {
//     padding: 20,
//   },
//   card: {
//     borderRadius: 24,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: 8,
//   },
//   badge: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   badgeText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#1A1A1A',
//   },
//   cardSubtitle: {
//     fontSize: 15,
//     color: '#1A1A1A',
//     opacity: 0.8,
//     marginBottom: 12,
//   },
//   tagContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 8,
//   },
//   tag: {
//     backgroundColor: 'rgba(255, 255, 255, 0.3)',
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     marginRight: 8,
//     marginBottom: 8,
//   },
//   tagText: {
//     fontSize: 13,
//     color: '#1A1A1A',
//   },
//   eventItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   eventDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#1A1A1A',
//     marginRight: 12,
//   },
//   eventText: {
//     fontSize: 15,
//     color: '#1A1A1A',
//   },
//   examCard: {
//     paddingVertical: 16,
//   },
//   examContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   examDetails: {
//     fontSize: 16,
//     color: '#1A1A1A',
//     marginBottom: 4,
//   },
//   examLocation: {
//     fontSize: 14,
//     color: '#1A1A1A',
//     opacity: 0.8,
//   },
//   examIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'rgba(255, 255, 255, 0.3)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   examEmoji: {
//     fontSize: 24,
//   },
//   exploreIcon: {
//     alignItems: 'center',
//     marginTop: 12,
//   },
//   exploreEmoji: {
//     fontSize: 24,
//   },
//   // bottomNav: {
//   //   flexDirection: 'row',
//   //   justifyContent: 'space-around',
//   //   paddingVertical: 12,
//   //   paddingHorizontal: 20,
//   //   backgroundColor: '#fff3e0',
//   //   borderTopLeftRadius: 0,
//   //   borderTopRightRadius: 0,
//   //   shadowColor: '#000',
//   //   shadowOffset: { width: 0, height: -4 },
//   //   shadowOpacity: 0.08,
//   //   shadowRadius: 8,
//   //   elevation: 8,
//   //   marginBottom: -60
//   // },
//   // navItem: {
//   //   alignItems: 'center',
//   // },
//   // navButton: {
//   //   width: 50,
//   //   height: 50,
//   //   borderRadius: 25,
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   // },
//   // activeNavButton: {
//   //   backgroundColor: '#F0F0F0',
//   // },
//   // navIcon: {
//   //   width: 24,
//   //   height: 24,
//   //   opacity: 0.5,
//   // },
//   // activeNavIcon: {
//   //   opacity: 1,
//   // },
//   // navLabel: {
//   //   fontSize: 12,
//   //   color: '#666',
//   //   marginTop: 4,
//   // },
//   // activeNavLabel: {
//   //   color: '#1A1A1A',
//   //   fontWeight: '500',
//   // },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingVertical: 16,
//     backgroundColor: '#fff3e0',
//     borderTopWidth: 1,
//     borderTopColor: '#fff3e0',
//     marginBottom: -20
//   },
// });

import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

export default function MainHomeScreen({navigation}) {
  const today = new Date();
  const [selectedCategory, setSelectedCategory] = useState('today');
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Floating Profile Bubble */}
      <TouchableOpacity 
        style={styles.floatingProfile}
        onPress={() => navigation.navigate('ProfilePage')}
      >
        <LinearGradient
          colors={['#FF6B6B', '#FFE66D']}
          style={styles.gradientBubble}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.profileInitial}>K</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Main Content */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.mainScroll}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.timeDisplay}>
            {today.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </Text>
          <Text style={styles.dateDisplay}>
            {today.toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
          <Text style={styles.welcomeText}>Welcome back, Kartik</Text>
        </View>

        {/* Category Selector */}
        <View style={styles.categorySelector}>
          {[
            { id: 'today', label: 'Today', icon: 'sun' },
            { id: 'tasks', label: 'Tasks', icon: 'check-square' },
            { id: 'social', label: 'Social', icon: 'users' }
          ].map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Icon 
                name={category.icon} 
                size={24} 
                color={selectedCategory === category.id ? '#fff' : '#835e45'} 
              />
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Priority Card */}
        <TouchableOpacity>
          <LinearGradient
            colors={['#FF6B6B', '#FF8E8E']}
            style={styles.priorityCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.priorityHeader}>
              <Icon name="alert-circle" size={28} color="#FFF" />
              <Text style={styles.priorityTitle}>Priority</Text>
            </View>
            <View style={styles.examInfo}>
              <Text style={styles.examTitle}>Chemistry Exam</Text>
              <Text style={styles.examTime}>In 2 hours</Text>
              <View style={styles.locationChip}>
                <Icon name="map-pin" size={16} color="#FF6B6B" />
                <Text style={styles.locationText}>Sci 1.220</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Active Polls Section */}
        <View style={styles.pollsSection}>
          <Text style={styles.sectionTitle}>Active Polls</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.pollsScroll}
          >
            {['Study buddies', 'Fam Bam', 'Chem 1301'].map((poll, index) => (
              <TouchableOpacity key={index} style={styles.pollCard}>
                <LinearGradient
                  colors={['#4FACFE', '#00F2FE']}
                  style={styles.pollGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Icon name="bar-chart-2" size={24} color="#FFF" />
                  <Text style={styles.pollTitle}>{poll}</Text>
                  <View style={styles.pollTimeChip}>
                    <Icon name="clock" size={12} color="#4FACFE" />
                    <Text style={styles.pollTimeText}>4h left</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Timeline Section */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Timeline</Text>
          {[
            { time: '1:00 PM', event: 'Rock Climbing', icon: 'trending-up', color: '#FFD93D' },
            { time: '7:00 PM', event: 'Chem Review', icon: 'book', color: '#6C63FF' },
            { time: '10:00 AM', event: 'Brunch w/ Fam', icon: 'coffee', color: '#4FACFE' }
          ].map((item, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: item.color }]} />
              {index !== 2 && <View style={styles.timelineLine} />}
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTime}>{item.time}</Text>
                <View style={styles.timelineEvent}>
                  <Text style={styles.timelineEventText}>{item.event}</Text>
                  <Icon name={item.icon} size={20} color={item.color} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[
          { icon: 'home', screen: 'MainHomeScreen' },
          { icon: 'calendar', screen: 'CalendarScreen' },
          { icon: 'message-circle', screen: 'CommunityScreen' },
          { icon: 'server', screen: null },
          { icon: 'users', screen: 'FriendsScreen' }
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.navItem,
              item.icon === 'plus-circle' && styles.centerNavItem
            ]}
            onPress={() => item.screen && navigation.navigate(item.screen)}
          >
            <Icon 
              name={item.icon} 
              size={item.icon === 'plus-circle' ? 40 : 24} 
              color={item.icon === 'plus-circle' ? '#FF6B6B' : '#835e45'} 
            />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e0',
  },
  floatingProfile: {
    position: 'absolute',
    top: 75,
    right: 25,
    zIndex: 100,
  },
  gradientBubble: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  profileInitial: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
  },
  mainScroll: {
    flex: 1,
    paddingTop: 60,
  },
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  timeDisplay: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  dateDisplay: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  categorySelector: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#FFF',
    gap: 8,
  },
  selectedCategory: {
    backgroundColor: '#835e45',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#835e45',
  },
  selectedCategoryText: {
    color: '#FFF',
  },
  priorityCard: {
    margin: 24,
    borderRadius: 24,
    padding: 24,
  },
  priorityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  priorityTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  examInfo: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
  },
  examTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  examTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE8E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  pollsSection: {
    paddingLeft: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
    paddingRight: 24,
  },
  pollsScroll: {
    paddingRight: 24,
  },
  pollCard: {
    marginRight: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  pollGradient: {
    width: 160,
    height: 180,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
  },
  pollTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginTop: 12,
  },
  pollTimeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  pollTimeText: {
    fontSize: 12,
    color: '#4FACFE',
    fontWeight: '500',
  },
  timelineSection: {
    padding: 24,
    paddingBottom: 100,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 6,
  },
  timelineLine: {
    position: 'absolute',
    left: 5,
    top: 18,
    width: 2,
    height: 40,
    backgroundColor: '#E0E0E0',
  },
  timelineContent: {
    flex: 1,
    marginLeft: 12,
  },
  timelineTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timelineEvent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
  },
  timelineEventText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff3e0',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#fff3e0',
    marginBottom: -25,
  },
  navItem: {
    padding: 8,
  },
  centerNavItem: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
});