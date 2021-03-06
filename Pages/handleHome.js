import React, { Component,useState,useEffect } from "react";
import { Container, Button, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import HomeTabF from "./HomeTabF";
import ViewList from "./CommunityPage/subCommunityPage/showList";
import AddWriting from "./CommunityPage/subCommunityPage/addWriting";
import SearchWriting from "./CommunityPage/subCommunityPage/searchWriting";
import SeeWriting from "./CommunityPage/subCommunityPage/seeWriting";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

const AllStack = createStackNavigator();

function handleHome({ route}) {
  //커뮤니티 세부페이지 들어가면 탭안보이는 코드
  const user = route.params.extraData;
  const courseName = route.params.courseName;
  const navigation = useNavigation();
  route.state && route.state.index > 0
  ? navigation.setOptions({ tabBarVisible: false })
  : navigation.setOptions({ tabBarVisible: true });
  
  //여기에 각 페이지별 리스트 추가해주면 될 것 같아용
  return (
    <AllStack.Navigator>
      <AllStack.Screen name="Main" options={{ headerShown: false }}>
        {(props) => (
          <HomeTabF {...props} courseName={courseName} extraData={user} />
        )}
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

export default handleHome;

const style = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    marginLeft: "5%",
  },
});
