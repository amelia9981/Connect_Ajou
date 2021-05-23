import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatList from "./ChatList";
import Chat from "./Chat";
import { Button } from "native-base";

const MsgStack = createStackNavigator();

function MessageNav(props) {
  const user = props.extraData;
  return (
    <MsgStack.Navigator initialRouteName="Message">
      <MsgStack.Screen name="ChatList" options={{ headerShown: false }}>
        {(props) => <ChatList {...props} extraData={user} />}
      </MsgStack.Screen>
      <MsgStack.Screen
        name="Chat"
        options={({ route }) => ({
          title: route.params.thread.name,
          headerTintColor: "#1E3D6B",
          headerStyle: {
            height: 70,
            backgroundColor: "#FFFFFF",
            borderBottomColor: "#F6F8F8",
            borderBottomWidth: 2,
          },
          headerLeftContainerStyle: {
            height: 10,
          },
          headerTitleContainerStyle: {
            height: 80,
            alignItems: "center",
          },
          headerTitleStyle: {
            fontSize: 25,
            fontFamily: "IBMPlexSansKR-Regular",
          },
        })}
      >
        {(props) => <Chat {...props} extraData={user} />}
      </MsgStack.Screen>
    </MsgStack.Navigator>
  );
}

export default MessageNav;
