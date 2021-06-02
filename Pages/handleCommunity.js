import React, { Component } from "react";
import { Container, Button, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import showAll from "./CommunityPage/showAll";
import getInfo from "./CommunityPage/GetInfo";
import findFriend from "./CommunityPage/FindFriend";
import schoolLife from "./CommunityPage/schoolLife";

const Tab = createMaterialTopTabNavigator();

function HandleCommunity(props) {
  const user = props.extraData;

  return (
    <Tab.Navigator
      screenOptions={() => ({
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
      <Tab.Screen
        name="All"
        component={showAll}
        initialParams={{ extraData: user }}
      />
      <Tab.Screen
        name="Info"
        component={getInfo}
        initialParams={{ extraData: user }}
      />
      <Tab.Screen
        name="Campus"
        component={schoolLife}
        initialParams={{ extraData: user }}
      />
      <Tab.Screen
        name="Friends"
        component={findFriend}
        initialParams={{ extraData: user }}
      />
    </Tab.Navigator>
  );
}
const style = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    marginLeft: "5%",
  },
});
export default HandleCommunity;
