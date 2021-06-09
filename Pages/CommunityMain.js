import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from "../Utilities/Firebase";
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import HandleCommunity from "./handleCommunity";
import ViewList from "./CommunityPage/subCommunityPage/showList";
import AddWriting from "./CommunityPage/subCommunityPage/addWriting";
import SearchWriting from "./CommunityPage/subCommunityPage/searchWriting";
import SeeWriting from "./CommunityPage/subCommunityPage/seeWriting";

const Tab = createMaterialTopTabNavigator();
const AllStack = createStackNavigator();

function CommunityMain({ route, navigation }) {
  //커뮤니티 세부페이지 들어가면 탭안보이는 코드
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

  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "All";

    switch (routeName) {
      case "All":
        return "All";
      case "Info":
        return "Info";
      case "Campus":
        return "Campus";
      case "Friends":
        return "Friends";
    }
  }

  return (
    <AllStack.Navigator>
      <AllStack.Screen
        name="Main"
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          headerShown: false,
        })}
      >
        {(props) => <HandleCommunity {...props} extraData={user} />}
      </AllStack.Screen>
      <AllStack.Screen
        name="ViewList"
        component={ViewList}
        initialParams={{ extraData: user }}
      />
      <AllStack.Screen
        name="Add"
        component={AddWriting}
        initialParams={{ extraData: user }}
      />
      <AllStack.Screen
        name="Search"
        component={SearchWriting}
        initialParams={{ extraData: user }}
      />
      <AllStack.Screen
        name="See"
        component={SeeWriting}
        initialParams={{ extraData: user }}
      />
    </AllStack.Navigator>
  );
}

export default CommunityMain;

const style = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    marginLeft: "5%",
  },
});
