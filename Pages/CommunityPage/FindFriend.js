import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, SectionList, TouchableOpacity, Alert } from 'react-native';
import { Container, Header } from 'native-base';


export default class findFriend extends Component {
    static navigationOptions = {
        headerShown: false,
      };

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
            <Container>
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
            </Container>
        );
    }//render method..
    clickItem = (item) => {
        Alert.alert(item);
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
