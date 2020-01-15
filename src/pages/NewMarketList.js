import React, { useRef, useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TextInput, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from 'react-native';

import { Header } from 'react-native-elements';
import api from '../services/api';

export default function NewCategory({ navigation }) {
    const [name, setName] = useState('');
    const [user, setUser] = useState(null);

    const inputRef = useRef();

    function handleNavigateBack() {
        navigation.navigate('List');
    }

    function navigateToList(id) {
        navigation.navigate('MarketList', { id })
    }

    async function handleAddList() {
        const response = await api.post('/marketlists', {
            name
        }, { 
            headers: {
                user: user._id
            }
        });

        Alert.alert('New MarketList created!');
        navigateToList(response.data._id);
    }

    useEffect(() => {
        inputRef.current.focus();
    }, [inputRef]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            setUser(JSON.parse(user));
        });
    }, []);

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} style={styles.container}>
            <Header
                leftComponent={{ icon: 'angle-left', color: '#fff', type: 'font-awesome', onPress: handleNavigateBack }}
                centerComponent={{ text: 'New MarketList', style: styles.marketListNameHeader }}
                backgroundColor='#5a52d1'
            />
            <View style={styles.form}>
                <Text style={styles.label}>
                    List Name
                </Text>
                <TextInput
                    style={styles.input}
                    ref={inputRef}
                    value={name}
                    onChangeText={setName}
                    placeholder="Give a name to your list"
                />
                <TouchableOpacity style={styles.button} onPress={handleAddList}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    marketListNameHeader: {
        fontSize: 18,
        color: '#fff'
    },

    button: {
        height: 42,
        backgroundColor: '#5a52d1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 24,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});