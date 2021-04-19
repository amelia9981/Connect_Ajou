import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import handleAll from './CommunityPage/handlePage/handleAllNav';
import handleCampus from './CommunityPage/handlePage/handleCampusNav';
import handleInfo from './CommunityPage/handlePage/handleInfoNav';
import handleFriend from './CommunityPage/handlePage/handleFriendNav';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import showAll from './CommunityPage/showAll';

const Tab = createBottomTabNavigator();

const Option = {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "top",
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
}
export default function CommunityMain({navigation,route}) {
    console.log('route.state ? ', route.state && route.state);
    console.log('route.state.index ? ', route.state && route.state.index);
    route.state && route.state.index > 0
    ? navigation.setOptions({ tabBarVisible: false })
    : navigation.setOptions({ tabBarVisible: true });
        return (
            <Tab.Navigator tabBarOptions={{tabBarPosition:'top'}}>
                <Tab.Screen name="All" component={handleAll} />
                <Tab.Screen name="Info" component={handleInfo}/>
                <Tab.Screen name="Campus" component={handleCampus} />
                <Tab.Screen name="Friends" component={handleFriend} />
            </Tab.Navigator>
        )
    }

 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});