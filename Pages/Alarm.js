import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import Notification from "./AlarmPage/Notification";
import Message from "./AlarmPage/Message";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
class AlarmTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Feather name="bell" size={24} style={{ color: tintColor }} />
    ),
  };
  render() {
    return (
      <Tab.Navigator tabBarOptions={{
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
    }}>
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Message" component={Message} />
    </Tab.Navigator>
    )
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
