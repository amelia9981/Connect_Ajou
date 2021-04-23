import React, { Component } from 'react';
import {TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Container } from 'native-base';

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
        <ScrollView>
            <Container style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>(navigation.goBack())}>
                    <Feather name='arrow-left' size={25} />
                </TouchableOpacity>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Title, Content "
                />
            </Container>
        </ScrollView>
        //카드 컴포넌트 추가하기
        
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