import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatList from "./ChatList";
import Chat from "./Chat";

const MsgStack = createStackNavigator();

function MessageNav(props) {

    const user = props.extraData;
    return (
      <MsgStack.Navigator initialRouteName="Message">
        <MsgStack.Screen
          name="ChatList"
          component={ChatList}
          options={{ headerShown: false }}
        />
        <MsgStack.Screen
          name="Chat"
          options={{ headerShown: false }}
        >
          {props => <Chat {...props} extraData={user} />}
        </MsgStack.Screen>
      </MsgStack.Navigator>
    );
  
}

export default MessageNav;
