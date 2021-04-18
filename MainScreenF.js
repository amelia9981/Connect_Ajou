import React, { Component } from "react";
import { StyleSheet, Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { Feather } from '@expo/vector-icons';

// 하단 탭에 들어갈 컴포넌트들
import HomeTab from "./Pages/HomeTabF";
import CommunityMain from "./Pages/CommunityMain";
import TimetableTab from "./Pages/TimetableTab";
import AlarmTab from "./Pages/Alarm";
import UserTab from "./Pages/User";

const AppTabNavigator = createMaterialTopTabNavigator(
  {
    HomeTab: { screen: HomeTab },
    CommunityMain: {
      screen: CommunityMain, navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Feather name='list' size={24} style={{ color: tintColor }} />
        ),
        header: null}},
    TimetableTab: { screen: TimetableTab },
    AlarmTab: { screen: AlarmTab },
    UserTab: { screen: UserTab },
  },
  {
    animationEnabled: true,
    swipeEnabled: false,
    tabBarPosition: "bottom",
    tabBarOptions: {
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
      iconStyle: { height: 30 },
      activeTintColor: "#1E3D6B",
      inactiveTintColor: "#D7DDE2",
      upperCaseLabel: false,
      showLabel: false,
      showIcon: true,
    },
  }
);

const AppTabContainer = createAppContainer(AppTabNavigator);

class MainScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return <AppTabContainer />; // AppTabContainet 컴포넌트를 리턴한다.
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MainScreen;
