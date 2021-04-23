import React, { Component } from 'react';
import { View,ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CardItem, Card,  Left } from 'native-base';

//하트수 표시 & 댓글수 표시


//리스트보기
const viewList=({ navigation, route })=>{
        var name = route.params.name
        navigation.setOptions({
            headerTitle: name,
            headerRightContainerStyle:{
                marginRight:'3%',
                padding:'1%'
            },
            headerRight: () => (
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Search')}>
                        <Feather name='search' size={25}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Add')}>
                        <Feather name='plus-square' size={25}/>
                    </TouchableOpacity>
                </View>
            ),
        });
        
        //DB에서 가지고 오는거 나중에 수정 필요!! 일단 카드세개로 구성
        return(
            <ScrollView style={style.container}>
                
                <TouchableOpacity onPress={() => {
                    navigation.push("See")
                }}>
                    <Card style={style.box} >
                        <CardItem>
                            <Text style={style.title}> TITLE </Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Text style={style.content}> blablablabla </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Feather name='heart' />
                            </Left>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </ScrollView>
        )
    }

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F8F8",
    },
    header:{
        backgroundColor:'white',
    },
    headerTitle:{
        fontFamily:'EBS훈민정음새론SB',
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
    headerButtonL:{
        backgroundColor:'white',
        marginLeft:'5%',
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
export default viewList;