import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';


import handleAll from './CommunityPage/handlePage/handleAllNav';
import handleCampus from './CommunityPage/handlePage/handleCampusNav';
import handleInfo from './CommunityPage/handlePage/handleInfoNav';
import handleFriend from './CommunityPage/handlePage/handleFriendNav';

const AppTabNavigator = createMaterialTopTabNavigator(
    {
        ALL: { screen: handleAll },
        Info: { screen: handleInfo },
        Campus: { screen: handleCampus },
        Friends: { screen: handleFriend },
    },
    {
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

export default class CommunityMain extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Feather name='list' size={24} style={{ color: tintColor }} />
        ),
        header:null
    }
    render() {
        return (
                <AppTabContainer />
        );
    }
}
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});