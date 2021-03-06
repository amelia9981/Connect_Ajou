import React, { Component, useState, useEffect, useLayoutEffect } from "react";
import { TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Body, CardItem, Card, Header, Left, Right } from "native-base";
import { firebase } from "../../../Utilities/Firebase";

const SearchWriting = ({ navigation, route }) => {
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");
  const listName = route.params.listName;
  const [isSearch, setisSearch] = useState(false);
  const listRf = firebase.firestore().collection(listName);
  const [writing, setWriting] = useState([]);

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
    fetchWriting();

    return () => {
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const fetchWriting = () => {
    if (writing) {
      setWriting([]);
    }
    listRf
      .where("title", "<=", search)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setWriting((prev) => [data, ...prev]);
        });
      });

    setisSearch(false);
  };

  return (
    <>
      <Header style={{ backgroundColor: "white", borderColor: "#D7DDE2" }}>
        <Left>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Feather name="x" size={30} />
          </TouchableOpacity>
        </Left>
        <Body>
          <TextInput
            style={{ backgroundColor: "#eeeeee", width: "170%", height: 40 }}
            placeholder="Search"
            onChangeText={(text) => setSearch(text)}
            value={search}
          />
        </Body>
        <Right>
          <TouchableOpacity
            onPress={() => {
              fetchWriting();
              setisSearch(true);
            }}
          >
            <Feather name="search" size={30} />
          </TouchableOpacity>
        </Right>
      </Header>
      <ScrollView style={style.container}>
        {isSearch
          ? writing.map((writing) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.push("See", { data: writing, listName: listName });
                }}
                key={writing.title}
              >
                <Card style={style.box}>
                  <CardItem style={{ height: 40 }}>
                    <Text style={style.title}> {writing.title} </Text>
                  </CardItem>
                  <CardItem style={{ height: 30 }}>
                    <Text style={style.content}> {writing.content} </Text>
                  </CardItem>
                  <CardItem style={{ height: 40 }}>
                    <Left>
                      <AntDesign
                        name="hearto"
                        size={15}
                        style={{ color: "red", marginRight: 5 }}
                      />
                      <Text
                        style={{
                          marginRight: 5,
                          fontFamily: "EBS??????????????????L",
                        }}
                      >
                        {writing.like.length}
                      </Text>
                      <MaterialCommunityIcons
                        name="comment-outline"
                        size={15}
                        style={{ color: "black", marginRight: 5 }}
                      />
                      <Text
                        style={{
                          marginRight: 5,
                          fontFamily: "EBS??????????????????L",
                        }}
                      >
                        {writing.comments.length}
                      </Text>
                    </Left>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
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
    fontFamily: "EBS??????????????????SB",
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
    fontFamily: "EBS??????????????????SB",
    fontSize: 15,
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
    flex: 1,
    paddingTop: "1%",
    fontFamily: "IBMPlexSansKR-Regular",
    fontSize: 13,
    color: "#3D3D3D",
    textAlign: "left",
    paddingLeft: "2%",
  },
});
export default SearchWriting;
