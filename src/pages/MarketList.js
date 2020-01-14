import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import api from '../services/api';

import { Header } from 'react-native-elements';
import MarketListItem from '../components/MarketListItem';

export default function MarketList({ navigation }) {
    const id = navigation.getParam('id');
    const [marketList, setMarketList] = useState({});

    function handleNavigateBack() {
        navigation.navigate('List');
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
            />
            <FlatList
                style={styles.list}
                data={marketList.categories}
                keyExtractor={category => category._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        <FlatList
                            style={styles.list}
                            data={item.items}
                            keyExtractor={item => item._id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <MarketListItem marketListItem={item} />
                            )}
                        />
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    droidSafeView: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    list: {},
    marketListNameHeader: {
        fontSize: 18,
        color: '#fff'
    },
});