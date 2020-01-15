import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Platform, StyleSheet, Text, AsyncStorage, FlatList, TouchableOpacity } from 'react-native';

import api from '../services/api';

import { Header } from 'react-native-elements';

export default function List({ navigation }) {
    const [marketLists, setMarketLists] = useState([]);

    useEffect(() => {
        async function loadMarketLists(userId) {
            const response = await api.get('/marketlists', {
                headers: {
                    user: userId
                }
            });

            setMarketLists(response.data);
        }

        AsyncStorage.getItem('user').then(user => {
            const loggedUser = JSON.parse(user);

            loadMarketLists(loggedUser._id);
        })
    }, []);

    function handleNavigate(id) {
        navigation.navigate('MarketList', { id });
    }

    function handleCreateNewList() {
        navigation.navigate('NewMarketList');
    }

    async function handleLogout() {
        await AsyncStorage.removeItem('user');
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'Despensa App', style: { color: '#fff' } }}
                rightComponent={{ icon: 'power-off', color: '#fff', type: 'font-awesome', onPress: handleLogout }}
                backgroundColor='#5a52d1'
            />
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    data={marketLists}
                    keyExtractor={marketList => marketList._id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.listItem} onPress={() => handleNavigate(item._id)}>
                            <Text style={styles.icon}>Icon</Text>
                            <Text style={styles.marketListName}>{item.name}</Text>
                            <Text style={styles.marketListItems}>12</Text>
                        </TouchableOpacity>
                    )}
                />
                <View style={styles.addItemContainer}>
                    <TouchableOpacity style={styles.addItemButton} onPress={handleCreateNewList}>
                        <Text style={styles.addItemText}>New List</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    droidSafeView: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },

    container: {

    },

    list: {

    },

    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 10,

    },

    icon: {

    },

    marketListName: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    marketListItems: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    addItemContainer: {
        flexDirection: 'row',
    },

    addItemButton: {
        padding: 12,
        backgroundColor: '#5a52d1',
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 10
    },

    addItemText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})