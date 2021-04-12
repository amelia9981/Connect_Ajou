import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default class showAll extends Component {
    render() {
        return (
            <View style={style.container}>
                <Text>HomeTab</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        backgroundColor: 'white',
        borderColor: '#D7DDE2',
        borderRadius: 10,
    }
});