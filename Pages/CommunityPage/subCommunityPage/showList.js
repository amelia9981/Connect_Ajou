import React, { Component, useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Button, Icon } from 'react-native';
import { Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { CardItem, Card, Left, Body, Thumbnail, Right } from 'native-base';
import { firebase } from '../../../Utilities/Firebase';

//실시간 업데이트
const viewList=({ navigation, route })=>{
    const [writing,setWriting] = useState([])
    const listName = route.params.name;
    const db = firebase.firestore().collection(listName)
    const [user, setUser] = useState({});

    useEffect(() => {
        const curUserEmail = firebase.auth().currentUser.providerData[0].email;
        const unsubscribe = firebase
            .firestore()
            .collection("users")
            .doc(curUserEmail)
            .onSnapshot((snapshot) => {
                const getUser = snapshot.data();
                setUser(getUser);
            });
        //getData();

        return () => {
            unsubscribe();
        };
    }, []);
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
                    <Feather name='search' size={25} style={{ marginRight: 10 }}/>
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
                                <CardItem style={{height:40}}>
                                    <Text style={style.title}> {writing.title} </Text>
                                </CardItem>
                                <CardItem style={{height:30}}>
                                    <Text style={style.content}> {writing.content} </Text>
                                </CardItem>
                                <CardItem style={{ height: 40 }}>
                                    <Left>
                                        <AntDesign name="hearto" size={15} style={{ color: 'red', marginRight: 5 }} />
                                        <Text style={{ marginRight: 5, fontFamily:'EBS훈민정음새론L'}}>{writing.like.length}</Text>
                                        <MaterialCommunityIcons name="comment-outline" size ={15} style={{ color: 'black', marginRight: 5 }} />
                                        <Text style={{ marginRight: 5, fontFamily:'EBS훈민정음새론L'}}>{writing.comments.length}</Text>
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
    item:{
    },
    box: {
        backgroundColor: "#FFFFFF",
        borderColor: "#D7DDE2",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: "0.5%",
        paddingLeft:'2%',
    },
    title: {
        flex: 1,
        fontFamily: "EBS훈민정음새론SB",
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
        flex: 1,
        paddingTop: "1%",
        fontFamily: "IBMPlexSansKR-Regular",
        fontSize: 13,
        color: "#3D3D3D",
        textAlign:'left',
        paddingLeft: '2%'
    },
});
export default viewList;
