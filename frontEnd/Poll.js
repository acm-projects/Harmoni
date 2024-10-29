import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import RNPoll, { IChoice } from 'react-native-poll'
import RNAnimated from 'react-native-animated-component'
import { Navigation } from 'lucide-react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const choices = [
    { id: 1, choice: '1PM', votes: 0},
    { id: 2, choice: '2PM', votes: 0},
    { id: 3, choice: '3PM', votes: 0}
]


export default function Poll( {navigation} ){
   

  return (
    <SafeAreaView style={styles.container}>
        <Text
            style={{
                padding: 1,
              marginTop: 10,
              fontSize: 40,
              fontWeight: 'bold'
            }}>
            Polls
          </Text>
      <RNPoll 
      style={{
        width: 350,
      }}
      appearFrom="left"
      animationDuration={150}
      totalVotes={4}
      choices={choices}
      PollContainer={RNAnimated}
      PollItemContainer={RNAnimated}
      borderColor='#FEDE69'
      fillBackgroundColor='#FEDE69'
      defaultChoiceBorderWidth={1}
      selectedChoiceBorderWidth={2}
      onChoicePress={(selectedChoice: IChoice) =>
        {console.log("SelectedChoice: ", selectedChoice);}
      }
      />
      <RNPoll 
      style={{
        width: 350
      }}
      appearFrom="left"
      animationDuration={150}
      totalVotes={10}
      choices={choices}
      PollContainer={RNAnimated}
      PollItemContainer={RNAnimated}
      borderColor='#FEDE69'
      fillBackgroundColor='#FEDE69'
      defaultChoiceBorderWidth={1}
      selectedChoiceBorderWidth={2}
      onChoicePress={(selectedChoice: IChoice) =>
        {console.log("SelectedChoice: ", selectedChoice);}
      }
      />
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        alignItems: 'center',
        backgroundColor: '#fff3e0'
    }
})

