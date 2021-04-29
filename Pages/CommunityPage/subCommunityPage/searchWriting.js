import React, { Component } from 'react';
import {TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Body, Container, Header, Left, Right } from 'native-base';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';

//
const searchWriting = ({ navigation, route }) => {
    navigation.setOptions({
        headerShown:false
    });

    return (
       <KeyboardAwareScrollView>
            <Header style={{ backgroundColor: 'white', borderColor:"#D7DDE2"}}>
               <Left>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Feather name='x' size={30} />
                    </TouchableOpacity>
               </Left>
               <Body>
                    <TextInput style={{ backgroundColor: '#eeeeee', width: '170%',height:40 }} 
                        placeholder="Search"/>
               </Body>
               <Right>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Feather name='search' size={30} />
                    </TouchableOpacity>
               </Right>
           </Header>

       </KeyboardAwareScrollView>
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