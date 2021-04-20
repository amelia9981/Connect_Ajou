import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, SectionList, TouchableOpacity, Alert } from 'react-native';
import { Container, Header } from 'native-base';


export default class findFriend extends Component {
    constructor() {
        super();
        // 대량의 데이터
        this.state = {
            sectionDatas: [
                // SectionList의 섹션 하나 객체에는 title, data 2개의 프로퍼티 필요
                { title: 'Find Friend Group', data: ["Sports mate", "Finding Party Mates", "Finding Roommates", "Languague Exchange", "Major Study", "Other Hobby"] },

            ],
        };
    }
    render() {
        return (
            <View style={style.container}>
                <SectionList
                    sections={this.state.sectionDatas}
                    renderSectionHeader={({ section }) => {
                        return (
                            <View style={style.sectionHeader}>
                                <Text style={style.sectionTitle}>{section.title}</Text>
                            </View>
                        );
                    }}
                    renderItem={({ item, navigation, index, section }) => {
                        return (
                            <TouchableOpacity style={style.itemView} onPress={() => {
                                this.props.navigation.push("ViewList")
                            }} >
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
    container: {
        flex: 1,
        backgroundColor: "#F6F8F8",
    },
    sectionHeader: {
        padding: "1.5%",
        backgroundColor: "#5995DD",
    },
    sectionTitle: {
        marginLeft: "5%",
        flex: 1,
        fontFamily: "Mono-SB",
        fontSize: 20,
        color: "white",
    },
    itemView: {
        marginLeft: "5%",
        padding: '1.5%',
        flex: 1,
        flexDirection: 'row',
        fontFamily: "IBMPlexSansKR-Regular",
        fontSize: 15,
        color: "#3D3D3D",
    },
});