import React, { Component, useState, useEffect } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Body, CardItem, Card, Container, Header, Left, Right } from 'native-base';

import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { firebase } from '../../../Utilities/Firebase';

const SearchWriting = ({ navigation, route }) => {
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
    const [search,setSearch] = useState("")
    const listName = route.params.listName;
    const [isSearch,setisSearch] = useState(false);
    const listRf = firebase.firestore().collection(listName)
    const [writing,setWriting] = useState([])

    const fetchWriting = () => {
        listRf
            .where('title', '==', search)
            .get()
            .then((snapshot) => {
                writing = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                });
                setWriting(writing);
            })
        
    }
 
    navigation.setOptions({
        headerShown:false
    });
    console.log(writing)
    return (
        <>
       <KeyboardAwareScrollView>
            <Header style={{ backgroundColor: 'white', borderColor:"#D7DDE2"}}>
               <Left>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Feather name='x' size={30} />
                    </TouchableOpacity>
               </Left>
               <Body>
                    <TextInput style={{ backgroundColor: '#eeeeee', width: '170%',height:40 }} 
                        placeholder="Search" onChangeText={(text) => setSearch(text)}
                        value={search}/>
               </Body>
               <Right>
                    <TouchableOpacity onPress={fetchWriting()}>
                        <Feather name='search' size={30} />
                    </TouchableOpacity>
               </Right>
           </Header>
       </KeyboardAwareScrollView>
       <ScrollView>
                {
                    writing.map((writing) => (
                        <TouchableOpacity onPress={() => { navigation.push("See", { data: writing, listName: listName }) }}>
                            <Card style={style.box} >
                                <CardItem style={{ height: 40 }}>
                                    <Text style={style.title}> {writing.title} </Text>
                                </CardItem>
                                <CardItem style={{ height: 30 }}>
                                    <Text style={style.content}> {writing.content} </Text>
                                </CardItem>
                                <CardItem style={{ height: 40 }}>
                                    <Left>
                                        <AntDesign name="hearto" size={15} style={{ color: 'red', marginRight: 5 }} />
                                        <Text style={{ marginRight: 5, fontFamily: 'EBS훈민정음새론L' }}>{writing.like.length}</Text>
                                        <MaterialCommunityIcons name="comment-outline" size={15} style={{ color: 'black', marginRight: 5 }} />
                                        <Text style={{ marginRight: 5, fontFamily: 'EBS훈민정음새론L' }}>{writing.comments.length}</Text>
                                    </Left>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                    ))
                }
       </ScrollView>
            
    </>
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
export default SearchWriting;