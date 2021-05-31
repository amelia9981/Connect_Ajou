import React, { Component, useState, useEffect} from 'react';
import { ScrollView,View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import { Card, Container,CardItem, Thumbnail, Body, Left, Right,  Icon } from 'native-base';
import { Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { firebase } from '../../../Utilities/Firebase';
import { Button } from 'react-native-paper';
import { Directions } from 'react-native-gesture-handler';

//실시간 좋아요 업데이트 & 폰트들 정리
const seeWriting = ({ navigation, route }) => {;
    const [text,setText] = useState("")
    const [allcomment,setAllComment] = useState([])
    const [currentLike,setCurrentLike] = useState([])
    const writing = route.params.data;
    const listName = route.params.listName;
    const [user, setUser] = useState({});
    const [isReRendering,setReRendering]=useState(0);

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

    const listener =()=>{
        firebase.firestore().collection(listName).onSnapshot(snapshot=>{
            let changes = snapshot.docChanges();
            console.log(changes.type)
        })
        getData()
    }
    const addLike=()=>{
        if(currentLike.indexOf(user.email) != -1){
            firebase.firestore().collection(listName).doc(writing.title).update({
                like: firebase.firestore.FieldValue.arrayRemove(user.email)
            })
            .then(()=>{
                setReRendering(isReRendering+1);
                getData()
            })
        }
        else{
            firebase.firestore().collection(listName).doc(writing.title)
                .update({
                    like: firebase.firestore.FieldValue.arrayUnion(user.email)
                })
                .then(() => {
                    setReRendering(isReRendering + 1);
                    getData()
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
                setReRendering(isReRendering + 1);
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        setText("");
        listener()
    };

    const moveToChat = async (commentAuthor) => {
      let thread = {};
      if (commentAuthor.email !== user.email) {
        firebase
          .firestore()
          .collection("chat")
          .onSnapshot((snapshot) => {
            snapshot.docs.map((docSnapshot) => {
              if (docSnapshot.data().target.email == commentAuthor.email) {
                thread = {
                  _id: docSnapshot.data().target.email,
                  ...docSnapshot.data(),
                };
                navigation.navigate("Alarm", {
                  screen: "Message",
                  params: {
                    screen: "Chat",
                    params: { thread: thread, user: user },
                  },
                });
                return;
              }
            });
            if (
              Object.keys(thread).length === 0 &&
              thread.constructor === Object
            ) {
              thread = {
                latestMessage: {
                  text: "",
                  createdAt: new Date().getTime(),
                },
                name: commentAuthor.fullName,
                target: {
                  email: commentAuthor.email,
                },
                user: user,
              };
  
              firebase
                .firestore()
                .collection("chat")
                .doc(commentAuthor.email)
                .set(thread, { merge: true });
  
              firebase
                .firestore()
                .collection("chat")
                .doc(commentAuthor.email)
                .collection("messages")
                .add({
                  text: "Your chat room has been created.",
                  createdAt: new Date().getTime(),
                  system: true,
                });
  
              navigation.navigate("Alarm", {
                screen: "Message",
                params: {
                  screen: "Chat",
                  params: {
                    thread: {
                      _id: commentAuthor.email,
                      ...thread,
                    },
                    user: user,
                  },
                },
              });
            }
            return;
          });
      } else {
        navigation.navigate("User");
      }
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
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="refresh" size={25} style={{marginRight:10}}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather name='message-square' size={25} />
                </TouchableOpacity>
            </View>
        ),
    });


    return (
        <>
        <ScrollView style={style.container}>
                <Card style={style.box}>
                    <CardItem>
                        <Left>
                            <Thumbnail style={{width:50,height:50}} source={{uri:writing.creator.url}} />
                            <Body style={{flexDirection:'column'}}>
                                <Text style={{ fontFamily:'EBS훈민정음새론L'}}> From : {writing.creator.fullName}</Text>
                                <Text style={style.title}> Title:  {writing.title}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Text style={style.content}> {writing.content} </Text>
                    </CardItem>
                    <CardItem style={{ height: 45 }}>
                        <Left>
                            <TouchableOpacity onPress={() => { addLike() }}>
                                <AntDesign name="hearto" size={15} style={{ color: 'red', marginRight: 5 }} />
                            </TouchableOpacity>
                            <Text style={{  marginRight: 5 }}>{writing.like.length}</Text>
                            <MaterialCommunityIcons name="comment-outline" size={15} style={{ color: 'black', marginRight: 5 }} />
                            <Text>{writing.comments.length}</Text>
                        </Left>
                    </CardItem>
                </Card>
                {
                    allcomment.map((comment) => (
                        <Card style={style.box} >
                            <CardItem>
                                <Left>
                                  <TouchableOpacity onPress={() => {moveToChat(comment.user)}}>
                                    <Thumbnail style={{width:30,height:30, color:'#1E3D6B'}} source={{uri:comment.user.url}} />
                                  </TouchableOpacity>
                                    <Body>
                                        <Text style={{ fontFamily: 'EBS훈민정음새론L' }}> {comment.user.fullName} </Text>
                                    </Body>
                                </Left>
                            </CardItem>

                            <CardItem cardBody>
                                <Text style={style.content}> {'>'}{'>'} {comment.text} </Text>
                            </CardItem>
                        </Card>
                    ))
                }
                <Container style={{height:60}}></Container>
        </ScrollView>
            <Container style={{ flexDirection: 'row', backgroundColor: "#F6F8F8"}}>
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
        fontFamily: "EBS훈민정음새론SB",
        paddingTop:2,
        fontSize: 20,
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
        fontFamily: "Balloo2-SB",
        fontSize: 15,
        color: "#3D3D3D",
        paddingLeft:50,
        paddingBottom:10
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

