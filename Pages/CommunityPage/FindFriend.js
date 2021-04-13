import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, SectionList, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';

export default class findFriend extends Component {

    constructor() {
        super();

        // 대량의 데이터
        this.state = {
            sectionDatas: [
                // SectionList의 섹션 하나 객체에는 title, data 2개의 프로퍼티 필요
                { title: 'Get Info', data: ["Official Announcement", "About Course", "Campus", "Random Question"] },
                { title: 'Find Friend', data: ["Sports mate", "Finding Party Mates", "Finding Roommates"] },
                { title: 'Food Yummy', data: ["Near Campus", "Vege Restaurant", "Halal Restaurant"] },
                { title: 'Study Group', data: ["Languague Exchange", "Major Study", "Other Hobby"] },
            ],
        };
    }
    render() {
        return (
            <ScrollView style={style.root}>
                {/* 리스트에 그룹칭이 가능하 리스트뷰 */}
                {/* 3개의 필수 속성 */}
                {/* 1) section - 섹션 title과 섹션별 data들을 가진 대량의 데이터*/}
                {/* 2) renderSectionHeader - 섹션별 title영역에 그려질 컴포넌트를 리턴하는 콜백함수 지정 */}
                {/* 3) renderItem - 섹션별 Item영역에 그려질 컴포넌트를 리턴하는 콜백함수 지정 */}
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
                            <TouchableOpacity style={style.itemView} onPress={() => { this.clickItem(item) }} >
                                <Text style={style.itemView}>{item}</Text>
                            </TouchableOpacity>
                        );
                    }}
                    // keyExtractor={(item,index)=>{return index}}
                    keyExtractor={(item, index) => index}
                >

                </SectionList>
            </ScrollView>
        );
    }//render method..
    clickItem = (item) => {
        Alert.alert(item);
    }
}

const style = StyleSheet.create({
    root: { flex: 1, padding: 16 },
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
