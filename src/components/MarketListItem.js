import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CheckBox } from 'react-native-elements'

export default function MarketListItem({ marketListItem }) {
    const [item, setItem] = useState({});

    function handleCheckItem() {
        setItem({ ...item, bought: !item.bought });
    }

    useEffect(() => {
        setItem(marketListItem);
    }, [marketListItem]);

    return (
        <View style={[styles.container, styles.mainContainer]}>
            <View style={styles.container}>
                <CheckBox checked={item.bought} onPress={handleCheckItem} />
                <Text style={styles.name}>{item.name}</Text>
            </View>
            <Text style={styles.quantity}>{item.quantity}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',  
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    mainContainer: {
        paddingRight: 20,
        backgroundColor: '#eee'
    },

    name: {
        fontSize: 16,
    },

    quantity: {
        fontSize: 12,
        fontWeight: 'bold'
    },
});