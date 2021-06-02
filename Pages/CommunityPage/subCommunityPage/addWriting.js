import React, { Component, useEffect, useLayoutEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Left, Header, Form } from "native-base";
import { Feather, Ionicons } from "@expo/vector-icons";
import { firebase } from "../../../Utilities/Firebase";

const AddWriting = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [Writing, setWriting] = useState({ title, content });
  const listName = route.params.listName;
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

    return () => {
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: null,
      headerRightContainerStyle: {
        marginRight: "3%",
        padding: "1%",
      },
      headerLeftContainerStyle: {
        marginLeft: "3%",
        padding: "1%",
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Feather name="x" size={30} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        //저장하고 리프레스
        <Button
          style={style.button}
          onPress={() => {
            onSubmit();
          }}
          title="Save"
        />
      ),
    });
  });

  const onSubmit = async (event) => {
    firebase
      .firestore()
      .collection(listName)
      .doc(title)
      .set({
        _id: Math.random().toString(36).slice(2),
        title: title,
        content: content,
        creator: user,
        createdAt: Date.now(),
        like: [],
        comments: [],
      })
      .then(() => {
        navigation.goBack();
      });
    setTitle("");
    setContent("");
  };

  return (
    <KeyboardAvoidingView style={{ padding: 10 }}>
      <Form>
        <TextInput
          style={{ height: 20, paddingLeft: 10 }}
          placeholder="Title"
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        <TextInput
          style={{ height: 300, paddingLeft: 10 }}
          placeholder="Content"
          onChangeText={(text) => setContent(text)}
          value={content}
        />
      </Form>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({});
export default AddWriting;
