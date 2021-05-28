import React, { Component, useState, useEffect} from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import { Card, Container,CardItem, Thumbnail, Body, Left, Right,  Icon } from 'native-base';
import { Feather, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import { firebase } from '../../../Utilities/Firebase';
import { Button } from 'react-native-paper';
import { Directions } from 'react-native-gesture-handler';

const seeWriting = ({ navigation, route }) => {;
    const [text,setText] = useState("")
    const [allcomment,setAllComment] = useState([])
    const [currentLike,setCurrentLike] = useState([])
    const writing = route.params.data;
    const listName = route.params.listName;
    const user = route.params.extraData
    const userEmail = route.params.extraData.email
    const listener =()=>{
        firebase.firestore().collection(listName).onSnapshot(snapshot=>{
            let changes = snapshot.docChanges();
            console.log(changes.type)
        })
        getData()
    }
    const addLike=()=>{
        if(currentLike.indexOf(userEmail) != -1){
            firebase.firestore().collection(listName).doc(writing.title).update({
                like: firebase.firestore.FieldValue.arrayRemove(userEmail)
            })
        }
        else{
            firebase.firestore().collection(listName).doc(writing.title)
                .update({
                    like: firebase.firestore.FieldValue.arrayUnion(userEmail)
                })
        }
        listener()
        //없으면 추가
    }
    const onSubmit = () => {
        const comment = {
            user,
            text: text,
            time: Date.now()
        };
        firebase.firestore().collection(listName).doc(writing.title)
            .update({
                comments: firebase.firestore.FieldValue.arrayUnion(comment)
            })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        setText("");
        listener()
    };

    //가져오기
    const getData = () => {
        const dbCom = firebase.firestore().collection(listName).doc(writing.title)       
        dbCom.get().then((doc) => {
                const data = doc.data().comments
                setAllComment(data);
                const likeList = doc.data().like
                setCurrentLike(likeList);
        })
    }
    useEffect(() => {
        getData();
    }, []);
 
    navigation.setOptions({
        headerTitle:null,
        headerRightContainerStyle: {
            marginRight: '3%',
            padding: '3%',
            alignItems: "center",
            justifyContent: "center",
        },

        headerRight: () => (
            //메세지 보내기 페이지로 이동
            <Container style={{ flexDirection: 'row' }}>
                <Button style={{}} onPress={()=>{}}>
                    <MaterialCommunityIcons name="refresh" size={30} color="black" />
                </Button>
                <TouchableOpacity onPress={()=>{navigation.navigate("Chat", {receiver: writing.user})}}>
                    <Feather name='message-square' size={30} />
                </TouchableOpacity>
                
            </Container>
            
        ),
    });
    //썸네일 추가 이미지 & 이름
    //댓글 입력할 수 있는
    return (
        <>
        <ScrollView style={style.container}>
                <Card style={style.box}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri:writing.creator.url}} />
                            <Body>
                                <Text>{writing.creator.fullName}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Text style={style.title}> {writing.title}</Text>
                    </CardItem>
                    <CardItem>
                        <Text style={style.content}> {writing.content} </Text>
                    </CardItem>
                    <CardItem style={{ height: 45 }}>
                        <Left>
                            <TouchableOpacity onPress={() => { addLike() }}>
                                <Ionicons name='ios-heart' style={{ color: 'black', marginRight: 5 }} />
                            </TouchableOpacity>
                            <Text>{writing.like.length}</Text>
                            <Ionicons name="chatbubble" style={{ color: 'black', marginRight: 5 }} />
                            <Text>{writing.comments.length}</Text>
                        </Left>
                    </CardItem>
                </Card>
                {
                    allcomment.map((comment) => (
                        <Card style={style.box} >
                            <CardItem>
                                <Left>
                                    <Thumbnail source={{uri:comment.user.url}} />
                                    <Body>
                                        <Text style={style.title}> {comment.user.fullName} </Text>
                                    </Body>
                                </Left>
                            </CardItem>

                            <CardItem cardBody>
                                <Text style={style.content}> {comment.text} </Text>
                            </CardItem>
                        </Card>
                    ))
                }
        </ScrollView>
        <Container style={{flexDirection:'row'}}>
                <TextInput style={style.input_id} placeholder="Comment"
                    onChangeText={(text) => { setText(text)}}
                    value={text}
                />
                <Button style={style.btn} title="ADD" onPress={() => { onSubmit() }} />
        </Container>   
        </>
    )
}
const style = StyleSheet.create({
    container: {
        backgroundColor: "#F6F8F8",
    },
    header: {
        backgroundColor: 'white',
    },
    headerTitle: {
        fontFamily: 'EBS훈민정음새론SB',
        marginTop: '5%',
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
    input_id: {
        fontFamily: "IBMPlexSansKR-Light",
        position: "absolute",
        bottom: '10%',
        left:'5%',
        padding: 10,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderColor: "#5995DD",
        borderWidth: 2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 10,
        width: '70%',
        height: 54,
    },
    btn:{
        position: "absolute",
        bottom: '10%',
        left:'80%',
        backgroundColor:'#5995DD',
        height:54,
        width:'15%',
    }
});
export default seeWriting;

