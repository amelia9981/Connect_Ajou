import React, { Component, useEffect, useState } from "react";
import { Platform } from "react-native";
import Notification from "./AlarmPage/Notification";
import Message from "./AlarmPage/Message";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { firebase } from "../Utilities/Firebase";

const Tab = createMaterialTopTabNavigator();

function AlarmTab(props) {
  const user = props.extraData;
  let notiCount;

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("notification")
      .onSnapshot((querySnapshot) => {
        notiCount = 0;
        if (querySnapshot.size) {
          querySnapshot.forEach((doc) => {
            console.log(doc.data().isRead);
            if (doc.data().isRead == true) {
              notiCount++;
            }
          });
        } else {
          console.log("No such document!");
        }
        console.log(notiCount);
      });
    return () => {
      unsubscribe();
    };
  }, []);

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
      <Tab.Screen name="Notification">
        {(props) => <Notification {...props} notiCount={notiCount} />}
      </Tab.Screen>
      <Tab.Screen name="Message">
        {(props) => <Message {...props} extraData={user} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default AlarmTab;
