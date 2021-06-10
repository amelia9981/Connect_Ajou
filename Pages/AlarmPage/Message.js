import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatList from "./ChatList";
import Chat from "./Chat";
import { firebase } from "../../Utilities/Firebase";

const MsgStack = createStackNavigator();

function MessageNav({ route, navigation }) {
  const [user, setUser] = useState({});
  route.state && route.state.index > 0
    ? navigation.setOptions({ tabBarVisible: false })
    : navigation.setOptions({ tabBarVisible: true });

  useEffect(() => {
    const curUserEmail = firebase.auth().currentUser.providerData[0].email;
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(curUserEmail)
      .onSnapshot((snapshot) => {
        const getUser = snapshot.data();
        setUser(getUser);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <MsgStack.Navigator initialRouteName="Message">
      <MsgStack.Screen name="ChatList" options={{ headerShown: false }}>
        {(props) => <ChatList {...props} extraData={user} />}
      </MsgStack.Screen>
      <MsgStack.Screen
        name="Chat"
        component={Chat}
        options={({ route }) => ({
          title:
            route.params.thread.target.email == user.email
              ? route.params.thread.user.fullName
              : route.params.thread.name,
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
