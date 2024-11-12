// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // Icons for navigation

// const StudyBuddiesScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
      
//       {/* Top Bar */}
//       <View style={styles.topBar}>
//         <TouchableOpacity onPress={() => navigation.openDrawer()}>
//           <Ionicons name="menu" size={28} color="black" />
//         </TouchableOpacity>
//         <Text style={styles.title}>Studybuddies</Text>
//       </View>

//       {/* Circular Events */}
//       <View style={styles.circleContainer}>
//       <TouchableOpacity style={styles.circleContainer} onPress={() => navigation.navigate('ACMMeeting')}>
//         <View style={styles.largeCircle}>
//           <Text>Weekly ACM Meeting</Text>
//           <Text>(Pending)</Text>
//         </View>
//       </TouchableOpacity>

//         <View style={styles.rowContainer}>
//           <View style={styles.smallCircle}>
//             <Text style={styles.circleText}>Boba on Thur</Text>
//             <Text style={styles.statusText}>(Approved)</Text>
//           </View>

//           <View style={styles.mediumCircle}>
//             <Text style={styles.circleText}>Study Session on Fri</Text>
//             <Text style={styles.statusText}>(Approved)</Text>
//           </View>

//           <View style={styles.smallCircle}>
//             <Text style={styles.circleText}>Ramen</Text>
//             <Text style={styles.statusText}>(Approved)</Text>
//           </View>
//         </View>
//       </View>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNavBar}>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <Ionicons name="home" size={28} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('CalendarScreen')}>
//           <Ionicons name="calendar" size={28} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('AddEvent')}>
//           <Ionicons name="add-circle" size={28} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
//           <Ionicons name="chatbox" size={28} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('Server')}>
//           <Ionicons name="server" size={28} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff3e0',
//     paddingTop: 40,
//   },
//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     justifyContent: 'space-between',
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#333',
//   },
//   circleContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   rowContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: 20,
//   },
//   largeCircle: {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     backgroundColor: '#e1f7d5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 30,
//     borderColor: '#000',
//     borderWidth: 3,
//   },
//   mediumCircle: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     backgroundColor: '#ffbdbd',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: '#000',
//     borderWidth: 3,
//   },
//   smallCircle: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: '#c9c9ff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: '#000',
//     borderWidth: 3,
//   },
//   circleText: {
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   statusText: {
//     textAlign: 'center',
//     fontSize: 12,
//     color: '#666',
//   },
//   bottomNavBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 10,
//     backgroundColor: '#fff3e0',
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//   },
// });

// export default StudyBuddiesScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const PollCard = ({ poll, onVote }) => {
  const [selected, setSelected] = useState(null);
  const animatedScale = new Animated.Value(1);
  const animatedPosition = new Animated.Value(0);

  const handleVote = (optionIndex) => {
    setSelected(optionIndex);
    onVote(poll.id, optionIndex);
    
    // Animate the selection
    Animated.sequence([
      Animated.spring(animatedScale, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 100,
      }),
      Animated.spring(animatedScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
      }),
    ]).start();
  };

  useEffect(() => {
    // Entrance animation
    Animated.spring(animatedPosition, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 8,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.pollCard,
        {
          transform: [
            { scale: animatedScale },
            {
              translateY: animatedPosition.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
          opacity: animatedPosition,
        },
      ]}
    >
      <View style={styles.pollHeader}>
        <Text style={styles.pollTitle}>{poll.question}</Text>
        <Text style={styles.pollDeadline}>{poll.deadline}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {poll.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selected === index && styles.selectedOption,
            ]}
            onPress={() => handleVote(index)}
          >
            <View style={styles.optionContent}>
              <Text style={[
                styles.optionText,
                selected === index && styles.selectedOptionText
              ]}>
                {option.text}
              </Text>
              
              {selected !== null && (
                <View style={styles.votePercentage}>
                  <View 
                    style={[
                      styles.percentageBar,
                      { width: `${option.votes}%` },
                      selected === index && styles.selectedPercentageBar
                    ]}
                  />
                  <Text style={styles.percentageText}>{option.votes}%</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.pollFooter}>
        <View style={styles.voterInfo}>
          <Ionicons name="people-outline" size={16} color="#666" />
          <Text style={styles.voterText}>{poll.totalVotes} votes</Text>
        </View>
        {poll.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

const ModernPollScreen = ({ navigation }) => {
  const [polls] = useState([
    {
      id: 1,
      question: "When should we schedule our next ACM meeting?",
      deadline: "Ends in 2 hours",
      options: [
        { text: "Tuesday 3PM", votes: 45 },
        { text: "Wednesday 4PM", votes: 30 },
        { text: "Thursday 2PM", votes: 25 },
      ],
      totalVotes: 120,
      tags: ["ACM", "Meeting"]
    },
    {
      id: 2,
      question: "Preferred study location for finals week?",
      deadline: "Ends in 5 hours",
      options: [
        { text: "Library 4th Floor", votes: 55 },
        { text: "Student Center", votes: 25 },
        { text: "CS Building Lab", votes: 20 },
      ],
      totalVotes: 85,
      tags: ["Finals", "Study"]
    },
    {
      id: 3,
      question: "Next social event preference?",
      deadline: "Ends in 1 day",
      options: [
        { text: "Boba & Board Games", votes: 40 },
        { text: "Pizza & Code Night", votes: 35 },
        { text: "Tech Talk & Snacks", votes: 25 },
      ],
      totalVotes: 150,
      tags: ["Social", "Event"]
    },
  ]);

  const handleVote = (pollId, optionIndex) => {
    // Handle vote logic here
    console.log(`Voted for option ${optionIndex} in poll ${pollId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('CommunityScreen')}>{/*navigation.openDrawer()*/}
          <Ionicons name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Active Polls</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.pollsContainer}
        showsVerticalScrollIndicator={false}
      >
        {polls.map((poll) => (
          <PollCard
            key={poll.id}
            poll={poll}
            onVote={handleVote}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  pollsContainer: {
    flex: 1,
    padding: 16,
  },
  pollCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pollHeader: {
    marginBottom: 16,
  },
  pollTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  pollDeadline: {
    fontSize: 14,
    color: '#666',
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionButton: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f7ff',
  },
  optionContent: {
    flexDirection: 'column',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  votePercentage: {
    marginTop: 8,
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    overflow: 'hidden',
  },
  percentageBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#ddd',
    borderRadius: 2,
  },
  selectedPercentageBar: {
    backgroundColor: '#007AFF',
  },
  percentageText: {
    position: 'absolute',
    right: 0,
    top: -20,
    fontSize: 12,
    color: '#666',
  },
  pollFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  voterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  voterText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  tag: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#007AFF',
  },
});

export default ModernPollScreen;