import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as GoogleGenerativeAI from '@google/generative-ai';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);

    const apiKey = "AIzaSyBtunoQDSmYcWy1YiFGajaF3xJwR1NzjeA";
    const [modalVisible, setModalVisible] = useState(false);

    const useEffect = (() => {
        const startChat = async () => {};
        
    })

    const onOffModal = () => {
    setModalVisible(!modalVisible);
    }

    {/* <Text style={styles.modalText}>This is the modal content</Text> */}
    {/* <TouchableOpacity onPress={() => setModalVisible(false)}>
        <Text style={styles.closeButton}>Close</Text>
    </TouchableOpacity> */}
    return (
        <View style={styles.container}>
        {/* Modal */}
        {modalVisible && (
            <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                

            </View>
            </View>
        )}

        {/* Floating Action Button */}
        <LinearGradient
            colors={['#1880fe', '#8690fe']}
            style={styles.floatingButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <TouchableOpacity 
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onPress={onOffModal}
            >
            <StarIcon name="star-four-points-outline" size={24} color="#fff" />
            </TouchableOpacity>
        </LinearGradient>
        </View>
    );
    };

    export default ChatBot;

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff3e0',
    },
    modalOverlay: {
        position: 'absolute',
        top:  -855,
        left: -5,
        right: -5,
        bottom: -15,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        height: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    closeButton: {
        fontSize: 16,
        color: '#1880fe',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FF6347',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    });
