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
        <View style={[styles.container, styles.padding]}>
            <View style={styles.container}>
                <CheckBox checked={item.bought} onPress={handleCheckItem} />
                <Text>{item.name}</Text>
            </View>
            <Text>{item.quantity}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',  
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    padding: {
        paddingRight: 20
    },
});