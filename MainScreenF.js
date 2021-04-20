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
class MainScreen extends Component {
 
  render() {
    return(
      <NavigationContainer>
        <Tab.Navigator 
        labeled='false'  
        barStyle={{backgroundColor:'white'}}
          tabBarOptions={{ activeTintColor:"#1E3D6B", inactiveTintColor: "#D7DDE2"}}
        >
          <Tab.Screen name="Home" component={HomeTab} options={{
            tabBarIcon: ({ tintColor }) => (
              <Feather name='home' size={24} style={{ color: tintColor }} />
            )}}/>
          <Tab.Screen name="Community" component={CommunityMain} options={{
            
            tabBarIcon: ({ tintColor }) => (
              <Feather name='list' size={24} style={{ color: tintColor }} />
            )
          }} />
          <Tab.Screen name="Timetable" component={TimetableTab} options={{
            tabBarIcon: ({ tintColor }) => (
              <Feather name='layout' size={24} style={{ color: tintColor }} />
            )
          }}/>
          <Tab.Screen name="Alarm" component={AlarmTab} options={{
            tabBarIcon: ({ tintColor }) => (
              <Feather name='bell' size={24} style={{ color: tintColor }} />
            )
          }}/>
          <Tab.Screen name="User" component={UserTab} options={{
            tabBarIcon: ({ tintColor }) => (
              <Feather name='user' size={24} style={{ color: tintColor }} />
            )
          }} />
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
