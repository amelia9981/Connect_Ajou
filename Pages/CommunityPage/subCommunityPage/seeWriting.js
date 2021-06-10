import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { Card, Container, CardItem, Body, Left, Right } from "native-base";
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { firebase } from "../../../Utilities/Firebase";
import ProfilePicture from "react-native-profile-picture";

//실시간 좋아요 업데이트 & 폰트들 정리
const seeWriting = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [allcomment, setAllComment] = useState([]);
  const [currentLike, setCurrentLike] = useState([]);
  const writing = route.params.data;
  const listName = route.params.listName;
  const [user, setUser] = useState({});
  const [isReRendering, setReRendering] = useState(0);
  const [reModal, setReModal] = useState(false);
  const [reTitle, setReTitle] = useState();
  const [reContent, setReContent] = useState();

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
    getData();

    return () => {
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: null,
      headerRightContainerStyle: {
        marginRight: "3%",
        padding: "3%",
        alignItems: "center",
        justifyContent: "center",
      },
      //글 삭제, 수정
      //if cur user == wrting.user=> 삭제 수정 선택가능
      //comment 도 동일하게
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => moveToChat(writing.creator)}>
            <Feather
              name="message-square"
              size={25}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <MaterialCommunityIcons
              name="menu"
              size={25}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const listener = () => {
    firebase
      .firestore()
      .collection(listName)
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        console.log(changes.type);
      });
    getData();
  };

  const addLike = () => {
    if (currentLike.indexOf(user.email) != -1) {
      firebase
        .firestore()
        .collection(listName)
        .doc(writing.title)
        .update({
          like: firebase.firestore.FieldValue.arrayRemove(user.email),
        })
        .then(() => {
          setReRendering(isReRendering + 1);
          getData();
        });
    } else {
      firebase
        .firestore()
        .collection(listName)
        .doc(writing.title)
        .update({
          like: firebase.firestore.FieldValue.arrayUnion(user.email),
        })
        .then(() => {
          setReRendering(isReRendering + 1);
          getData();
        });
    }
    listener();
    //없으면 추가
  };

  const fetchProfileUrlFromStorage = (author) => {
    let authorUrl = author.url;
    if (author.picture) {
      const storageRef = firebase.storage().ref(`${author.email}`);
      storageRef.getDownloadURL().then((url) => {
        if (author.url !== url) {
          authorUrl = url;
        }
      });
    }
    return authorUrl;
  };
  const onSubmit = () => {
    const comment = {
      _id: Math.random().toString(36).slice(2),
      user,
      text: text,
      time: Date.now(),
    };
    firebase
      .firestore()
      .collection(listName)
      .doc(writing.title)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(comment),
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
    listener();
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
  function getData() {
    const dbCom = firebase.firestore().collection(listName).doc(writing.title);
    dbCom.onSnapshot((doc) => {
      const data = doc.data().comments;

      setAllComment(data);
      const likeList = doc.data().like;
      setCurrentLike(likeList);
    });
  }

  const delWriting = () => {
    //if current user == writing user
    if (user.email == writing.creator.email) {
      Alert.alert("Do you Really want to delete it?", "", [
        {
          text: "No",
          onPress: () => console.log("NO"),
        },
        {
          //input 받아야하는데??hmmm
          text: "Yes",
          onPress: () => {
            firebase
              .firestore()
              .collection(listName)
              .doc(writing.title)
              .delete();
            navigation.goBack();
          },
        },
      ]);
    }
  };
  function delComment(comment) {
    if (user.email == comment.user.email) {
      Alert.alert("Do you Really want to delete it?", "", [
        {
          text: "No",
          onPress: () => console.log("NO"),
        },
        {
          //input 받아야하는데??hmmm
          text: "Yes",
          onPress: () => {
            firebase
              .firestore()
              .collection(listName)
              .doc(writing.title)
              .update({
                comments: firebase.firestore.FieldValue.arrayRemove(comment),
              });
          },
        },
      ]);
    }
  }
  const reWriting = () => {
    if (user.email == writing.creator.email) {
      setReModal(true);
    }
  };
  const reWritingUpdate = () => {
    setReModal(false);
    firebase.firestore().collection(listName).doc(writing.title).update({
      title: reTitle,
      content: reContent,
    });
    navigation.goBack();
  };

  return (
    <>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View
          style={{
            marginLeft: "50%",
            marginTop: 50,
            marginRight: 10,
            backgroundColor: "#F6F8F8",
            padding: 20,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <AntDesign
              name="close"
              size={24}
              color="black"
              style={{ justifyContent: "center", alignContent: "center" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              delWriting();
            }}
          >
            <Text
              style={{
                fontFamily: "EBS훈민정음새론SB",
                fontSize: 20,
                color: "#3D3D3D",
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              reWriting();
            }}
          >
            <Text
              style={{
                fontFamily: "EBS훈민정음새론SB",
                paddingTop: 5,
                fontSize: 20,
                color: "#3D3D3D",
                alignContent: "center",
              }}
            >
              Revise
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={reModal} animationType="slide" transparent={true}>
        <View
          style={{
            borderColor: "3D3D3D",
            margin: 50,
            backgroundColor: "#F6F8F8",
            padding: 20,
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            style={{ height: 20, paddingLeft: 10 }}
            placeholder={writing.title}
            onChangeText={(text) => setReTitle(text)}
            value={reTitle}
          />
          <TextInput
            style={{ height: 300, paddingLeft: 10 }}
            placeholder={writing.content}
            onChangeText={(text) => setReContent(text)}
            value={reContent}
          />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              height: 50,
              justifyContent: "center",
              alignContent: "center",
              marginTop: 8,
            }}
          >
            <View style={style.button_register}>
              <TouchableOpacity onPress={() => setReModal(false)}>
                <Text style={style.button_text}>Close</Text>
              </TouchableOpacity>
            </View>
            <View style={style.button_login}>
              <TouchableOpacity onPress={() => reWritingUpdate()}>
                <Text style={style.button_text}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView style={style.container}>
        <Card style={style.box}>
          <CardItem>
            <Left>
              <ProfilePicture
                style={{ resizeMode: "contain" }}
                width={50}
                height={50}
                backgroundColor={"#2c5e9e"}
                isPicture={writing.creator.picture}
                user={writing.creator.fullName}
                URLPicture={fetchProfileUrlFromStorage(writing.creator)}
              />
              <Body style={{ flexDirection: "column" }}>
                <Text style={{ fontFamily: "EBS훈민정음새론L" }}>
                  {" "}
                  From : {writing.creator.fullName}
                </Text>
                <Text style={style.title}> Title: {writing.title}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Text style={style.content}> {writing.content} </Text>
          </CardItem>
          <CardItem style={{ height: 45 }}>
            <Left>
              <TouchableOpacity
                onPress={() => {
                  addLike();
                }}
              >
                <AntDesign
                  name="hearto"
                  size={15}
                  style={{ color: "red", marginRight: 5 }}
                />
              </TouchableOpacity>
              <Text style={{ marginRight: 5 }}>{currentLike.length}</Text>
              <MaterialCommunityIcons
                name="comment-outline"
                size={15}
                style={{ color: "black", marginRight: 5 }}
              />
              <Text>{allcomment.length}</Text>
            </Left>
          </CardItem>
        </Card>
        {allcomment.map((comment) => (
          <Card style={style.box} key={comment._id}>
            <CardItem>
              <Left>
                <TouchableOpacity
                  onPress={() => {
                    moveToChat(comment.user);
                  }}
                  key={comment._id}
                >
                  <ProfilePicture
                    style={{ resizeMode: "contain" }}
                    width={25}
                    height={25}
                    backgroundColor={"#2c5e9e"}
                    isPicture={comment.user.picture}
                    user={comment.user.fullName}
                    URLPicture={fetchProfileUrlFromStorage(comment.user)}
                  />
                </TouchableOpacity>
                <Body>
                  <Text style={{ fontFamily: "EBS훈민정음새론L" }}>
                    {" "}
                    {comment.user.fullName}{" "}
                  </Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem cardBody>
              <Text style={style.content}>
                {" "}
                {">"}
                {">"} {comment.text}{" "}
              </Text>
              <Right>
                <TouchableOpacity
                  onPress={() => {
                    delComment(comment);
                  }}
                >
                  <AntDesign
                    name="delete"
                    size={15}
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
        ))}
        <Container style={{ height: 60 }}></Container>
      </ScrollView>
      <Container style={{ flexDirection: "row", backgroundColor: "#F6F8F8" }}>
        <TextInput
          style={style.input_id}
          placeholder="Comment"
          onChangeText={(text) => {
            setText(text);
          }}
          value={text}
        />
        <TouchableOpacity
          style={style.btn}
          title="ADD"
          onPress={() => {
            onSubmit();
          }}
        >
          <Text style={style.btn_text}>ADD</Text>
        </TouchableOpacity>
      </Container>
    </>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: "#F6F8F8",
  },
  header: {
    backgroundColor: "white",
  },
  headerTitle: {
    fontFamily: "EBS훈민정음새론SB",
    marginTop: "5%",
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
    paddingTop: 2,
    fontSize: 20,
    color: "#3D3D3D",
  },
  headerButtonL: {
    backgroundColor: "white",
    marginLeft: "5%",
  },
  headerButtonR: {
    backgroundColor: "white",
    marginRight: "5%",
  },
  content: {
    flex: 2,
    fontFamily: "Balloo2-SB",
    fontSize: 15,
    color: "#3D3D3D",
    paddingLeft: 50,
    paddingBottom: 10,
  },
  input_id: {
    fontFamily: "IBMPlexSansKR-Light",
    position: "absolute",
    bottom: "10%",
    left: "5%",
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "#5995DD",
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 10,
    width: "70%",
    height: 54,
  },
  btn: {
    position: "absolute",
    bottom: "10%",
    left: "80%",
    backgroundColor: "#5995DD",
    height: 54,
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  btn_text: {
    justifyContent: "center",
    color: "#FFFFFF",
    fontSize: 17,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button_register: {
    fontFamily: "IBMPlexSansKR-Regular",
    position: "absolute",
    bottom: "28%",
    left: "10%",
    backgroundColor: "rgba(30, 61, 107, 0.8)",
    borderRadius: 20,
    shadowColor: "rgb(215,  221,  226)",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 3,
    color: "rgba(255, 255, 255, 1)",
    marginTop: 5,
    fontSize: 25,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "center",
    width: 100,
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button_login: {
    fontFamily: "IBMPlexSansKR-Regular",
    position: "absolute",
    bottom: "28%",
    right: "10%",
    marginTop: 5,
    backgroundColor: "rgba(30, 61, 107, 0.8)",
    borderRadius: 20,
    shadowColor: "rgb(215,  221,  226)",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 3,
    color: "rgba(255, 255, 255, 1)",
    fontSize: 25,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "center",
    width: 100,
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button_text: {
    justifyContent: "center",
    color: "#FFFFFF",
    fontSize: 17,
  },
});
export default seeWriting;
