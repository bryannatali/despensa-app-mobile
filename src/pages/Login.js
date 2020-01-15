import React, { useState, useEffect } from 'react';
import { View, Image, AsyncStorage, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';

import Logo from '../assets/logo.png';

import api from '../services/api';

export default function Login({ navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit() {
        const response = await api.post('/sessions', {
            username: username.split('@')[0],
            password,
        });

        await AsyncStorage.setItem('user', JSON.stringify(response.data));

        navigation.navigate('List');
    }

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(JSON.parse(user)) {
                navigation.navigate('List')
            }
        });
    }, [])

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <Image source={Logo} alt='Despensa App'/>
            <View style={styles.form}>
                <Text style={styles.label}>Your username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your username"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={username}
                    onChangeText={setUsername}
                />
                <Text style={styles.label}>Your password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your password"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#5a52d1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
})