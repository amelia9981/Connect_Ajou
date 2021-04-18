import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import Notification from "./AlarmPage/Notification";
import Message from "./AlarmPage/Message";

const AppTabNavigator = createMaterialTopTabNavigator(
  {
    Notification: { screen: Notification },
    Message: { screen: Message },
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "top",
    tabBarOptions: {
      style: {
        ...Platform.select({
          ios: {
            backgroundColor: "white",
          },
          android: {
            backgroundColor: "white",
          },
        }),
      },
      activeTintColor: "#1E3D6B",
      inactiveTintColor: "#D7DDE2",
      upperCaseLabel: false,
      showLabel: true,
      labelStyle: {
        marginTop: 40,
        fontSize: 15,
        fontFamily: "EBS훈민정음새론SB",
      },
      indicatorStyle: {
        backgroundColor: "#1E3D6B",
      },
    },
  }
);

const AppTabContainer = createAppContainer(AppTabNavigator);

class AlarmTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Feather name="bell" size={24} style={{ color: tintColor }} />
    ),
  };
  render() {
    return <AppTabContainer />;
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
