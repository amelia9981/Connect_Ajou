import React, { Component } from 'react';
import { ScrollView, View, TextInput, Text, StyleSheet, SectionList, TouchableOpacity, Alert } from 'react-native';
import { CardItem, Card, Container, Left, Button, Header, Right } from 'native-base';

import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';

//
const searchWriting = ({ navigation, route }) => {
    navigation.setOptions({
        headerTitle: null,
        headerRightContainerStyle: {
            marginRight: '3%',
            padding: '1%'
        },
        headerRight: () => (
            //메세지 보내기 페이지로 이동
            <TouchableOpacity>
                <Feather name='message-square' size={25} />
            </TouchableOpacity>
        ),
    });

    return (
        <TextInput
            style={{ height: 40 }}
            placeholder="Type here to translate!"
        />
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F8F8",
    },
    header: {
        backgroundColor: 'white',
    },
    headerTitle: {
        fontFamily: 'EBS훈민정음새론SB',
        marginTop: 15,
        fontSize: 20,
        alignContent: "flex-start",

    },
    box: {
        backgroundColor: "#FFFFFF",
        borderColor: "#D7DDE2",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: "0.5%",
        padding: "1%",
    },
    title: {
        flex: 1,
        fontFamily: "IBM-SB",
        fontSize: 15,
        color: "#3D3D3D",
    },
    headerButtonL: {
        backgroundColor: 'white',
        marginLeft: '5%',
    },
    headerButtonR: {
        backgroundColor: 'white',
        marginRight: '5%',
    },
    content: {
        flex: 2,
        paddingTop: "3%",
        fontFamily: "IBMPlexSansKR-Regular",
        fontSize: 13,
        color: "#3D3D3D",
    },
});
export default searchWriting;