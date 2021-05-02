import React, { Component, useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert, KeyboardAvoidingView, Keyboard } from 'react-native';
import {  Left, Header, Form} from 'native-base';
import { Feather } from '@expo/vector-icons';
import {firebase} from '../../../Utilities/Firebase';
//
const addWriting = ({ navigation, route}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [writing,setWriting] = useState([])
    const CommunityRef = firebase.firestore().collection('Community');
    const listName=route.params.listName;
    const onAdd = () => {
        const data = {
            title,
            content,
            createdAt: Date.now()
        };
    
            CommunityRef
                .doc()
                .add(data)
                .then(() => {
                    navigation.goBack()
                })
                .catch((error) => {
                    alert(error)
                })
        
        //const CommunityRef = firebase.firestore().collection('Community');
        
    }

    navigation.setOptions({
        headerTitle: null,
        headerRightContainerStyle: {
            marginRight: '3%',
            padding: '1%'
        }, 
        headerLeftContainerStyle: {
            marginLeft: '3%',
            padding: '1%'
        },
        headerLeft:()=>(
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                <Feather name='x' size={30}/>
            </TouchableOpacity>
        ),
        headerRight: () => (
            //저장하고 리프레스
            <Button style={style.button} onPress={()=>onAdd} title='Save'/>
        ),
    });

    
    return (
        <KeyboardAvoidingView style={{ padding: 10 }}>
            <Form onSubmit={onAdd}>
            <TextInput
                style={{ height: 40 }}
                placeholder="Title"
                onChange={(text)=> setTitle(text)}
                value ={title}

            />
            <TextInput
                placeholder="Content"
                onChange={(text)=>setContent(text)}
                value={content}
            />
            </Form>

        </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
   
});
export default addWriting;