import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatList from "./ChatList";
import Chat from "./Chat";

const MsgStack = createStackNavigator();

function MessageNav(props) {
  const user = props.extraData;
  route.state && route.state.index > 0
    ? this.navigation.setOptions({ tabBarVisible: false })
    : this.navigation.setOptions({ tabBarVisible: true });

  return (
    <MsgStack.Navigator initialRouteName="Message">
      <MsgStack.Screen name="ChatList" options={{ headerShown: false }}>
        {(props) => <ChatList {...props} extraData={user} />}
      </MsgStack.Screen>
      <MsgStack.Screen
        name="Chat"
        component={Chat}
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
      />
    </MsgStack.Navigator>
  );
}

export default MessageNav;
