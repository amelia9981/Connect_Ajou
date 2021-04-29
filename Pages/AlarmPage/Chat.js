import React, { Component, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { GiftedChat } from "react-native-gifted-chat";
import Firebase from "../../Utilities/Firebase";

function Message(props) {
  const user = props.extraData;
  const [message,setMessage] = useState([])
  const Chat = firebase.firestore().collection('Chat')

  useEffect(()=>{

  })
  return(<Text>Hello</Text>)
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Message;
