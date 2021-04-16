import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

class AlarmTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Feather name="bell" size={24} style={{ color: tintColor }} />
    ),
  };
  render() {
    return (
      <View style={style.container}>
        <Text>HomeTab</Text>
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

export default AlarmTab;
