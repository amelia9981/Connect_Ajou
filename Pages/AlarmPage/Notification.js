import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";
import { firebase } from "../../Utilities/Firebase";

function Notification(props) {
  const [data, setData] = useState([]);
  const notiCount = props.notiCount;

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("notification")
      .orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.size) {
          const notices = querySnapshot.docs.map((docSnapshot) => {
            return {
              ...docSnapshot.data(),
            };
          });
          setData(notices);
        } else {
          console.log("No such document!");
        }
      });

    return () => {
      unsubscribe();
    };
  }, []);

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

  const renderItem = ({ item }) => {
    const isRead = item.isRead;

    return (
      <TouchableOpacity
        style={[style.box, isRead ? style.boxRead : style.boxUnRead]}
        onPress={() => noticeClick(item)}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={style.title}>{item.title}</Text>
          <Text style={style.time}>{calculateTime(item.createdAt)}</Text>
        </View>
        <Text style={style.content}>{item.content}</Text>
      </TouchableOpacity>
    );
  };

  const noticeClick = async (item) => {
    Linking.canOpenURL(item.url).then((supported) => {
      if (supported) {
        Linking.openURL(item.url);
      } else {
        Linking.openURL(
          "https://www.ajou.ac.kr/oia/notice/notice.do?mode=list&srCategoryId=108&srSearchKey=&srSearchVal="
        );
      }
    });

    await firebase
      .firestore()
      .collection("notification")
      .doc(`${item.id}`)
      .set(
        {
          isRead: true,
        },
        { merge: true }
      )
      .catch(function (error) {
        console.error("Error: ", error);
      });
  };

  return (
    <View style={style.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
  list: {
    paddingVertical: "5%",
    justifyContent: "space-evenly",
  },
  box: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: "5%",
    padding: "5%",
    width: 380,
    height: 120,
  },
  boxRead: {
    borderColor: "#D7DDE2",
  },
  boxUnRead: {
    borderColor: "#2C5E9E",
  },
  title: {
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
    flex: 2,
    paddingTop: "3%",
    fontFamily: "IBMPlexSansKR-Regular",
    fontSize: 13,
    color: "#3D3D3D",
  },
});

export default Notification;
