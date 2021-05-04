import React, { Component, useState, useEffect} from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { CardItem, Card, Left, Container } from 'native-base';
import { Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import { firebase } from '../../../Utilities/Firebase';
import { Button } from 'react-native-paper';
import { Directions } from 'react-native-gesture-handler';


//하트 누르기 
//DB => 하트 수

const seeWriting = ({ navigation, route }) => {
    const [com,setCom] =useState("")
    const [like, setLike] = useState()
    const [comments,setComments] = useState([])

    const writing = route.params.data;
    const listName = route.params.listName;
    const db = firebase.firestore().collection(listName)
    const user = route.params.extraData
    //댓글달기
    const onSubmit = () => {
        const comment={
            user,
            text:com,
            time:Date.now()
        };
        console.log(comment)
        setComments((prev) => [comment, ...prev]);
        db.doc(writing.title)
            .update({
                comments:comments
            })
            .then(() => {
               console.log("update!!!")
            });
        setCom("");
    };
    console.log(com)

    //가져오기
    const getData = () => {
        db.doc(writing.title).get().then((doc) => {
            const data = doc.data().comments
            setComments(data);
        })
    }
    useEffect(() => {
        getData();
    }, []);

    const likeCnt = () => {
        if (click) {
            alert("You already liked it")
        }
        click = true; //색 칠할 수 있도록
        setLike(writing.like + 1);
    }

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
            <Card style={style.box} >
                <CardItem>
                    <Text style={style.title}> {writing.title}</Text>
                </CardItem>
                <CardItem cardBody>
                    <Text style={style.content}> {writing.content} </Text>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button>
                            <Feather name='heart' style={{ color: 'black', marginRight: 5 }} />
                        </Button>
                        <Text>{writing.like}</Text>
                        <Feather name='heart' style={{ color: 'black', marginRight: 5 }} />
                        <Text>count</Text>
                    </Left>
                </CardItem>
            </Card>
            {
                comments.map((comment) => (
                    <TouchableOpacity onPress={() => { navigation.push("See", { data: writing, listName: listName }) }}>
                        <Card style={style.box} >
                            <CardItem>
                                <Text style={style.title}> {comment.user.fullName} </Text>
                            </CardItem>
                            <CardItem cardBody>
                                <Text style={style.content}> {comment.text} </Text>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
        <Container style={{flexDirection:'row'}}>
                <TextInput style={style.input_id} placeholder="Comment"
                    onChangeText={(text) => setCom(text)}
                    value={com}
                />
                <Button style={style.btn} value="ADD" onPress={() => { onSubmit() }} />
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