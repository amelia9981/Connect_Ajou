import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const data = [
  {
    id: "1",
    title: "Notice 1",
    time: "10 min ago",
    content:
      "[OIA] COVID-19 Caution Letter from the Director of Office of International Affairs",
    url:
      "https://www.ajou.ac.kr/oia/notice/notice.do?mode=view&articleNo=107992&article.offset=0&articleLimit=10&srCategoryId=108",
  },
  {
    id: "2",
    title: "Notice 2",
    time: "15 min ago",
    content:
      "[OIA] COVID-19 Social Distancing Level 2 in Seoul Metropolitan Area (extended until May 2nd)",
    url:
      "https://www.ajou.ac.kr/oia/notice/notice.do?mode=view&articleNo=107411&article.offset=0&articleLimit=10&srCategoryId=108",
  },
  {
    id: "3",
    title: "Notice 3",
    time: "20 min ago",
    content: "Change of Immigration Information",
    url:
      "https://www.ajou.ac.kr/oia/notice/notice.do?mode=view&articleNo=107619&article.offset=0&articleLimit=10&srCategoryId=108",
  },
];

const noticeClick = async (url) => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      Linking.openURL(
        "https://www.ajou.ac.kr/oia/notice/notice.do?mode=list&srCategoryId=108&srSearchKey=&srSearchVal="
      );
    }
  });
};

const renderItem = ({ item }) => {
  const url = item.url;

  return (
    <TouchableOpacity style={style.box} onPress={() => noticeClick(url)}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text style={style.title}>{item.title}</Text>
        <Text style={style.time}>{item.time}</Text>
      </View>
      <Text style={style.content}>{item.content}</Text>
    </TouchableOpacity>
  );
};

class Notification extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Feather name="layout" size={24} style={{ color: tintColor }} />
    ),
  };

  render() {
    return (
      <View style={style.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(notice) => notice.id}
          contentContainerStyle={style.list}
        />
      </View>
    );
  }
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
    borderColor: "#D7DDE2",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: "5%",
    padding: "5%",
    width: 380,
    height: 120,
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
