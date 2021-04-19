import React, { Component } from "react";
import { StyleSheet, Platform } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

// 하단 탭에 들어갈 컴포넌트들
import HomeTab from "./Pages/HomeTabF";
import CommunityMain from "./Pages/CommunityMain";
import TimetableTab from "./Pages/TimetableTab";
import AlarmTab from "./Pages/Alarm";
import UserTab from "./Pages/User";

const Tab = createMaterialBottomTabNavigator();
class MainScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return(
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{
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
          },
        }}>
          <Tab.Screen name="Home" component={HomeTab} />
          <Tab.Screen name="Community" component={CommunityMain} />
          <Tab.Screen name="Timetable" component={TimetableTab} />
          <Tab.Screen name="Alarm" component={AlarmTab} />
          <Tab.Screen name="User" component={UserTab} />
        </Tab.Navigator>
      </NavigationContainer>
    );
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
