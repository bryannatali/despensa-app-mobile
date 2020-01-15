import React, { useRef, useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { Header } from 'react-native-elements';
import api from '../services/api';

export default function NewCategory({ navigation }) {
    const id = navigation.getParam('id');

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');

    const inputRef = useRef();

    function handleNavigateBack() {
        navigation.navigate('NewItem', { id });
    }

    async function handleAddCategoryItem() {
        await api.post('/categories', {
            name
        });

        Alert.alert('Category created!');
        handleNavigateBack();
    }

    useEffect(() => {
        inputRef.current.focus();
    }, [inputRef])

    useEffect(() => {
        async function loadCategories() {
            const response = await api.get('/categories');

            setCategories(response.data);
        }

        loadCategories();
    }, [])

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} style={styles.container}>
            <Header
                leftComponent={{ icon: 'angle-left', color: '#fff', type: 'font-awesome', onPress: handleNavigateBack }}
                centerComponent={{ text: 'New Category', style: styles.marketListNameHeader }}
                backgroundColor='#5a52d1'
            />
            <View style={styles.form}>
                <Text style={styles.label}>
                    Category Name
                </Text>
                <TextInput
                    style={styles.input}
                    ref={inputRef}
                    value={name}
                    onChangeText={setName}
                />
                <TouchableOpacity style={styles.button} onPress={handleAddCategoryItem}>
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