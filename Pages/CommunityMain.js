import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import getInfo from './CommunityPage/GetInfo';
import showAll from './CommunityPage/showAll';
import findFriend from './CommunityPage/FindFriend';
import study from './CommunityPage/study';
import Foody from './CommunityPage/Foody';

const AppTabNavigator = createMaterialTopTabNavigator({
    All: { screen: showAll },
    getInfo: { screen: getInfo },
    findFriend: { screen: findFriend },
    Foody: { screen: Foody },
    study: { screen: study }
}, {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "top",
    tabBarOptions: {
        style: {
            ...Platform.select({
                ios: {
                    backgroundColor: 'white',
                },
                android: {
                    backgroundColor: "white",
                }
            })
        },
        iconStyle: { height: 40 },
        activeTintColor: '#1E3D6B',
        inactiveTintColor: '#D7DDE2',
        upperCaseLabel: false,
        showLabel: false,
        showIcon: true,
    }
});

const AppTabContainet = createAppContainer(AppTabNavigator);

export default class CommunityMain extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Feather name='list' size={24} style={{ color: tintColor }} />
        )
    }
    render() {
        return (
                <AppTabContainet />
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