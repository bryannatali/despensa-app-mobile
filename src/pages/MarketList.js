import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import api from '../services/api';

import { Header } from 'react-native-elements';

import CategoryCollapse from '../components/CategoryCollapse';

export default function MarketList({ navigation }) {
    const id = navigation.getParam('id');
    const [marketList, setMarketList] = useState({});

    function handleNavigateBack() {
        navigation.navigate('List');
    }

    function handleAddItem() {
        navigation.navigate('NewItem', { id });
    }

    useEffect(() => {
        async function loadMarketList() {
            const response = await api.get(`/marketlists/${id}`);

            setMarketList(response.data);
        }

        loadMarketList();
    }, [id]);
    return (
        <SafeAreaView>
            <Header
                leftComponent={{ icon: 'angle-left', color: '#fff', type: 'font-awesome', onPress: handleNavigateBack }}
                centerComponent={{ text: marketList.name, style: styles.marketListNameHeader }}
                rightComponent={{ icon: 'plus', color: '#fff', type: 'font-awesome', size: 20 }}
                backgroundColor='#5a52d1'
            />
            <FlatList
                style={styles.list}
                data={marketList.categories}
                keyExtractor={category => category._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <CategoryCollapse item={item} />
                )}
            />
            <View style={styles.addItemContainer}>
                <TouchableOpacity style={styles.addItemButton} onPress={handleAddItem}>
                    <Text style={styles.addItemText}>Add Item</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    droidSafeView: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },

    marketListNameHeader: {
        fontSize: 18,
        color: '#fff'
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
});