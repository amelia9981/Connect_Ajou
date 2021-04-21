import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ProfilePicture from "react-native-profile-picture";

const data = [
  {
    id: "1",
    name: "Amy",
    time: "10 min ago",
    content: "hey",
    isPicture: false,
    url: "",
  },
];

class ChatList extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Feather name="layout" size={24} style={{ color: tintColor }} />
    ),
  };

  moveToChat() {
    this.props.navigation.navigate("Chat"),
      {
        name: data.name,
      };
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={style.box} onPress={() => this.moveToChat()}>
        <ProfilePicture
          style={{ resizeMode: "contain", flex: 1 }}
          width={80}
          height={80}
          backgroundColor={"#2c5e9e"}
          isPicture={item.isPicture}
          user={item.name}
          URLPicture={item.url}
        />
        <View style={{ flex: 2, marginLeft: "5%" }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={style.name}>{item.name}</Text>
            <Text style={style.time}>{item.time}</Text>
          </View>
          <Text style={style.content}>{item.content}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={style.container}>
        <FlatList
          data={data}
          renderItem={this.renderItem}
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
