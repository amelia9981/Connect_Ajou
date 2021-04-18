import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, SectionList, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Container } from 'native-base';

//리스트보기

export default class viewList extends Component{
    static navigationOptions = {
        headerShown: false,
      };
    
    render(){
        return(
            <Container style={style.container}>
                <Text>Main</Text>
            </Container>
        )
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#F6F8F8'
    },
    headContainer: {
        marginTop: 10,
        height: 40,
        borderBottomColor: '#D7DDE2',
        borderWidth: 1,
    },
    title: {
        marginTop: 20,
        marginLeft: 10,
        fontSize: 25,
        fontFamily: 'EBS훈민정음새론SB'
    },
    sectionHeader: {
        padding: 4,
        backgroundColor: "#eeeeee",
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    itemView: {
        padding: 8,
    },
});
