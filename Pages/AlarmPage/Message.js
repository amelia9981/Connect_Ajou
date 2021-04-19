import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

class Message extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Feather name="layout" size={24} style={{ color: tintColor }} />
    ),
  };
  render() {
    return (
      <View style={style.container}>
        <Text>Message</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Message;