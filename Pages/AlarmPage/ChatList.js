import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ProfilePicture from "react-native-profile-picture";
import { firebase } from "../../Utilities/Firebase";
import { useNavigation } from "@react-navigation/core";

function ChatList(props) {
  const user = props.extraData;
  const navigation = useNavigation();
  const [threads, setThreads] = useState([]);
  const [isReRendering, setReRendering] = useState(0);
  const isPicture = false;

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("chat")
      .orderBy("latestMessage.createdAt", "desc")
      .onSnapshot((snapshot) => {
        const threads = [];
        snapshot.docs.map((docSnapshot) => {
          if (
            docSnapshot.data().user.email == user.email ||
            docSnapshot.data().target.email == user.email
          ) {
            let thread = {
              _id: docSnapshot.data().target.email,
              ...docSnapshot.data(),
            };
            threads.push(thread);
          }
        });

        setThreads(threads);
        setReRendering(isReRendering + 1);
      });
    return () => {
      unsubscribe();
    };
  }, [threads]);

  const calculateTime = (messageTime) => {
    const current = new Date().getTime();
    const messageDate = new Date(messageTime);
    let quotient = Math.floor((current - messageTime) / 60000);

    if (quotient <= 0) {
      return "just now";
    } else if (quotient < 60) {
      let result = quotient.toString();
      return result + " min ago";
    } else if (quotient < 24 * 60) {
      quotient = Math.floor(quotient / 60);
      let result = quotient.toString();
      return result + " hour ago";
    } else {
      return messageDate.toString().slice(0, 10);
    }
  };

  const moveToChat = (item) => {
    navigation.navigate("Chat", { thread: item, user: user });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={style.box} onPress={() => moveToChat(item)}>
        <ProfilePicture
          style={{ resizeMode: "contain", flex: 1 }}
          width={80}
          height={80}
          backgroundColor={"#2c5e9e"}
          isPicture={isPicture}
          user={item.name}
        />
        <View style={{ flex: 2, marginLeft: "5%" }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={style.name}>{item.name}</Text>
            <Text style={style.time}>
              {calculateTime(item.latestMessage.createdAt)}
            </Text>
          </View>
          <Text style={style.content}>
            {item.latestMessage.text.slice(0, 90)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.container}>
      <FlatList
        data={threads}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={style.list}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F8F8",
  },
  box: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D7DDE2",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: "5%",
    padding: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 380,
    height: 100,
  },
  profile_photo: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(215, 221, 226, 1)",
    borderWidth: 1,
    borderRadius: 35,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingVertical: "5%",
    justifyContent: "space-evenly",
  },
  name: {
    flex: 1,
    fontFamily: "IBMPlexSansKR-Regular",
    fontSize: 15,
    color: "#3D3D3D",
  },
  time: {
    flex: 3,
    fontFamily: "IBMPlexSansKR-Regular",
    fontSize: 12,
    color: "#3D3D3D",
    textAlign: "right",
  },
  content: {
    flex: 1,
    paddingTop: "3%",
    fontFamily: "IBMPlexSansKR-Regular",
    fontSize: 13,
    color: "#3D3D3D",
  },
});
export default ChatList;
