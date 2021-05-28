import React, { Component, useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Button, Icon } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { CardItem, Card, Left, Body, Thumbnail } from 'native-base';
import { firebase } from '../../../Utilities/Firebase';

//하트수 표시 & 댓글수 표시
//리스트보기
const viewList=({ navigation, route })=>{
    const [writing,setWriting] = useState([])
    const listName = route.params.name;
    const db = firebase.firestore().collection(listName)
    const user = route.params.extraData
    const getData=()=>{
        db.get().then((querySnapshot)=>{
            querySnapshot.forEach(doc => {
                const data = doc.data()
                setWriting((prev)=>[data,...prev]);
            });
        })
    }
    useEffect(() => {
        getData();
    }, []);        
    
    navigation.setOptions({
        headerTitle: listName,
        headerRightContainerStyle:{
            marginRight:'3%',
            padding:'1%'
        },
        headerRight: () => (
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Search',{listName:listName})}>
                    <Feather name='search' size={25}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.push('Add',{listName:listName})}>
                    <Feather name='plus-square' size={25}/>
                </TouchableOpacity>
            </View>
        ),
    });
        
    return(
        <ScrollView style={style.container}>
                {
                    writing.map((writing) => (
                        <TouchableOpacity onPress={() => {navigation.push("See", {data : writing, listName:listName} )}}>
                            <Card style={style.box} >
                                <CardItem>
                                    <Text style={style.title}> {writing.title} </Text>
                                </CardItem>
                                <CardItem>
                                    <Text style={style.content}> {writing.content} </Text>
                                </CardItem>
                    
                                <CardItem style={{ height: 45 }}>
                                    <Left>
                                        <Ionicons name='ios-heart' size={10} style={{ color: 'black', marginRight: 5 }} />
                                        <Text style={{ marginRight: 5, fontFamily:'IBMPlexSansKR-Light'}}>{writing.like.length}</Text>
                                        <Ionicons name="chatbubble" size ={10} style={{ color: 'black', marginRight: 5 }} />
                                        <Text style={{ marginRight: 5 }}>{writing.comments.length}</Text>
                                    </Left>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        )
    }

const style = StyleSheet.create({
    container: {
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
        textAlign:'left'
    },
});
export default viewList;
