import React, { Component } from "react";
import { Platform } from "react-native";
import Notification from "./AlarmPage/Notification";
import Message from "./AlarmPage/Message";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

function AlarmTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarPosition: "top",
        swipeEnabled: false,
      })}
      tabBarOptions={{
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
      }}
    >
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Message" component={Message} />
    </Tab.Navigator>
  );
}

export default AlarmTab;
