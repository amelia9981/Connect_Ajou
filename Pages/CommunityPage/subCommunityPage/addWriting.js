import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import {  Left, Header} from 'native-base';
import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';

//

const addWriting = ({ navigation, route }) => {
    navigation.setOptions({
        headerTitle: null,
        headerRightContainerStyle: {
            marginRight: '3%',
            padding: '1%'
        }, 
        headerLeftContainerStyle: {
            marginLeft: '3%',
            padding: '1%'
        },
        headerLeft:()=>(
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                <Feather name='x' size={30}/>
            </TouchableOpacity>
        ),
        headerRight: () => (
            //저장하고 리프레스
            <Button style={style.button} onPress={()=>{navigation.goBack()}} title='Save'/>
        ),
    });

    return (
        <View style={{ padding: 10 }}>
            <TextInput
                style={{ height: 40 }}
                placeholder="Type here to translate!"
            />
        </View>
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
    button:{
        backgroundColor: '#5995DD',
        borderRadius: 10,
        fontFamily: "EBS훈민정음새론SB",

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
export default addWriting;