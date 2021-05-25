import React, { Component, useState } from 'react';
import {TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Body, Container, Header, Left, Right } from 'native-base';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { firebase } from '../../../Utilities/Firebase';

const SearchWriting = ({ navigation, route }) => {
    const user = route.params.extraData
    const [search,setSearch] = useState("")
    const listName = route.params.listName;
    const isSearch=false;
    const listRf = firebase.firestore().collection(listName)
    const [writing,setWriting] = useState([])
    const getData = () => {
        listRf.where("title","array-contains",search).get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                const data = doc.data()
                setWriting((prev) => [data, ...prev]);
            });
        })
    }
    useEffect(() => {
        getData();
    }, []);

    navigation.setOptions({
        headerShown:false
    });

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
                    <TouchableOpacity onPress={() => {isSearch=true}}>
                        <Feather name='search' size={30} />
                    </TouchableOpacity>
               </Right>
           </Header>
       </KeyboardAwareScrollView>
            {isSearch ? 
                writing.map((writing) => (
                    <TouchableOpacity onPress={() => { navigation.push("See", { data: writing, listName: listName }) }}>
                        <Card style={style.box} >
                            <CardItem>
                                <Text style={style.title}> {writing.title} </Text>
                            </CardItem>
                            <CardItem cardBody>
                                <Text style={style.content}> {writing.content} </Text>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Feather name='heart' size={25} style={{ color: 'black', marginRight: 5 }} />
                                    <Text>{writing.like}</Text>
                                </Left>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                ))
            :null}
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