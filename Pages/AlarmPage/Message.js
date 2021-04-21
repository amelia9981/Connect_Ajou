import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatList from "./ChatList";
import Chat from "./Chat";

const MsgStack = createStackNavigator();

class MessageNav extends Component {
  render() {
    return (
      <MsgStack.Navigator initialRouteName="Message">
        <MsgStack.Screen
          name="ChatList"
          component={ChatList}
          options={{ headerShown: false }}
        />
        <MsgStack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: false }}
        />
      </MsgStack.Navigator>
    );
  }
}

export default MessageNav;
