import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { firebase } from "../../Utilities/Firebase";

function Chat({ route }) {
  const thread = route.params.thread;
  const user = route.params.user;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("chat")
      .doc(thread._id)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((docSnapshot) => {
          const data = {
            _id: docSnapshot.id,
            text: "",
            createdAt: new Date().getTime(),
            ...docSnapshot.data(),
          };
          if (!docSnapshot.data().system) {
            data.user = {
              ...docSnapshot.data().user,
              name: docSnapshot.data().user.fullName,
            };
          }
          return data;
        });

        setMessages(messages);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  async function onSend(messages) {
    const text = messages[0].text;

    firebase
      .firestore()
      .collection("chat")
      .doc(thread._id)
      .collection("messages")
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.email,
          name: user.fullName,
        },
      });

    await firebase
      .firestore()
      .collection("chat")
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        { merge: true }
      );
  }

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: "#5995DD",
        },
        right: {
          backgroundColor: "#D7DDE2",
        },
      }}
      textStyle={{
        left: {
          color: "#ffffff",
          fontFamily: "IBMPlexSansKR-Regular",
        },
        right: {
          color: "#000000",
          fontFamily: "IBMPlexSansKR-Regular",
        },
      }}
      timeTextStyle={{
        left: {
          color: "#ffffff",
          fontFamily: "IBMPlexSansKR-Regular",
        },
        right: {
          color: "#000000",
          fontFamily: "IBMPlexSansKR-Regular",
        },
      }}
      style={style.container}
    />
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: user.email,
      }}
      renderAvatar={null}
      showAvatarForEveryMessage={true}
      alwaysShowSend={true}
      renderBubble={renderBubble}
    />
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Chat;
