import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, SectionList, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Container, Header } from 'native-base';


export default class showAll extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Feather name='list' size={24} style={{ color: tintColor }} />
        ),
    }
    constructor() {
        super();
        // 대량의 데이터
        this.state = {
            sectionDatas: [
                // SectionList의 섹션 하나 객체에는 title, data 2개의 프로퍼티 필요
                { title: 'Get Info', data: ["Official Announcement", "About Course", "Campus", "Random Question"] },
                { title: 'School Life', data: ["Random Chatting","School Events","Near Campus", "Vege Restaurant", "Halal Restaurant"] },
                { title: 'Find Friend Group', data: ["Sports mate", "Finding Party Mates", "Finding Roommates", "Languague Exchange", "Major Study", "Other Hobby"] },
            ],
        };
    }
    render() {
        return (
            <View style={{flex:1}}>
                    <SectionList
                        sections={this.state.sectionDatas}
                        renderSectionHeader={({ section }) => {
                            return (
                                <View style={style.sectionHeader}>
                                    <Text style={style.sectionTitle}>{section.title}</Text>
                                </View>
                            );
                        }}
                        renderItem={({ item, index, section }) => {
                            return (
                                <TouchableOpacity style={style.itemView} onPress={() => { this.props.navigation.navigate("ViewList") }} >
                                    <Text style={style.itemView}>{item}</Text>
                                </TouchableOpacity>
                            );
                        }}
                        // keyExtractor={(item,index)=>{return index}}
                        keyExtractor={(item, index) => index}
                    >
                    </SectionList>
            </View>
        );
    }//render method..
}


const style = StyleSheet.create({
    container:{
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#F6F8F8'
    },
    header:{
        borderBottomColor:'#D7DDE2',
        backgroundColor:'white',
        flexDirection: "row",
        borderWidth:1,
        height:60
    },
    title:{
        fontSize: 25,
        fontFamily:'EBS훈민정음새론SB',
        marginLeft: 20,
        marginTop:15,
        marginBottom:10,
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
