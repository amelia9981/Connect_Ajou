import React, { Component } from "react";
import { StyleSheet, Platform } from "react-native";
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

// 하단 탭에 들어갈 컴포넌트들
import HomeTab from "./Pages/HomeTabF";
import CommunityMain from "./Pages/CommunityMain";
import TimetableTab from "./Pages/TimetableTab";
import AlarmTab from "./Pages/Alarm";
import UserTab from "./Pages/User";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

class MainScreen extends Component{
  render(){
    const user = this.props.extraData;
    return(
        <Tab.Navigator 
        screenOptions={{}}
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
          showLabel: false,
          indicatorStyle: {
            backgroundColor: "#1E3D6B",
          },
        }}
        >
          <Tab.Screen name="Home" component={HomeTab} options={{
            tabBarIcon: ({ color }) => (
              <Feather name='home' size={24} color={color} />
            )}}
            />
          <Tab.Screen name="Community" component={CommunityMain} options={{
            tabBarIcon: ({ color }) => (
              <Feather name='list' size={24} color={color} />
            )
          }} initialParams={{extraData:user}}/>
          <Tab.Screen name="Timetable" component={TimetableTab} options={{
            tabBarIcon: ({ color }) => (
              <Feather name='layout' size={24} color={color} />
            )
        }} 
          />
        <Tab.Screen name="Alarm" options={{
          tabBarIcon: ({ color }) => (
            <Feather name='bell' size={24} color={color} />
          )
        }}>
          {props => <AlarmTab {...props} extraData={user} />}
        </Tab.Screen>
          <Tab.Screen name="User"options={{
            tabBarIcon: ({ color }) => (
              <Feather name='user' size={24} color={color} />
            )
          }}>
          {props => <UserTab {...props} extraData={user} />}
        </Tab.Screen>
        </Tab.Navigator>
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
