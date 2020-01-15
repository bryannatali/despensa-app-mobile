import React, { useRef, useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TextInput, StyleSheet, Picker, TouchableOpacity, Alert } from 'react-native';

import { Header } from 'react-native-elements';
import api from '../services/api';

export default function NewItem({ navigation }) {
    const id = navigation.getParam('id');

    const [categories, setCategories] = useState([]);
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');

    const inputRef = useRef();

    function handleNavigateBack() {
        navigation.navigate('MarketList', { id });
    }

    async function handleAddNewItem() {
        await api.post(`/marketlists/${id}/items`, {
            name: item,
            quantity,
            category_id: category
        });

        Alert.alert('Item created!');
        handleNavigateBack();
    }

    function handleAddCategory() {
        navigation.navigate('NewCategory', { id })
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
                centerComponent={{ text: 'New Item', style: styles.marketListNameHeader }}
                backgroundColor='#5a52d1'
            />
            <View style={styles.form}>
                <Text style={styles.label}>
                    Item Name
                </Text>
                <TextInput
                    style={styles.input}
                    ref={inputRef}
                    value={item}
                    onChangeText={setItem}
                />
                <Text style={styles.label}>
                    Quantity
                </Text>
                <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={quantity}
                    onChangeText={setQuantity}
                />

                <View style={styles.flexRow}>
                    <Text style={styles.label}>
                        Item Category
                    </Text>
                    <TouchableOpacity style={[styles.button, styles.buttonNew]} onPress={handleAddCategory}>
                        <Text style={styles.buttonText}>New</Text>
                    </TouchableOpacity>
                </View>

                <Picker onValueChange={value => setCategory(value)} selectedValue={category}>
                    {
                        categories.map(category => (
                            <Picker.Item key={category._id} label={category.name} value={category._id} />
                        ))
                    }
                </Picker>
                <TouchableOpacity style={styles.button} onPress={handleAddNewItem}>
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

    buttonNew: {
        padding: 10
    },

    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});