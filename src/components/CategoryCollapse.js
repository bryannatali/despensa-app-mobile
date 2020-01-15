import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import { Icon } from 'react-native-elements';

import MarketListItem from './MarketListItem';

export default function CategoryCollapse({ item }) {
    const [show, setShow] = useState(false);
    const [icon, setIcon] = useState(false);

    function handleShow() {
        setIcon(!icon);
        setShow(!show);
    }

    return (
        <View>
            <TouchableOpacity style={styles.listItemHeader} activeOpacity={.8} onPress={handleShow}>
                <Text style={styles.category}>{item.name}</Text>
                <Icon name={!icon ? 'angle-down' : 'angle-up'} type='font-awesome' color='#fff' />
            </TouchableOpacity>
            {
                show ? (
                    <FlatList
                        style={styles.list}
                        data={item.items}
                        keyExtractor={item => item._id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <MarketListItem marketListItem={item} />
                        )}
                    />
                ) : (
                        <></>
                    )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    list: {},

    listItemHeader: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#a2db69',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    category: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
})