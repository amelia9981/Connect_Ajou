import React, { Component, useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert, KeyboardAvoidingView, Keyboard } from 'react-native';
import {  Left, Header, Form} from 'native-base';
import { Feather } from '@expo/vector-icons';
import {firebase} from '../../../Utilities/Firebase';
//
const addWriting = ({ navigation, route}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const listName=route.params.listName;
    
    const onSubmit = async (event) => {
        firebase
        .firestore().collection(listName).doc(title)
        .set({title,content})
        .then(() => {
            navigation.goBack()
        });
        setTitle("");
        setContent("")
    };

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
            <Button style={style.button} onPress={() => { onSubmit() }}title='Save'/>
        ),
    });

    return (
        <KeyboardAvoidingView style={{ padding: 10 }}>
            <Form>
            <TextInput
                style={{ height: 40 }}
                placeholder="Title"
                onChangeText={(text) => setTitle(text)}
                value={title}
            />
            <TextInput
                style={{height:300}}
                placeholder="Content"
                onChangeText={(text) => setContent(text)}
                value={content}
            />
            </Form>

        </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
   
});
export default addWriting;