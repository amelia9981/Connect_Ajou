import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import getInfo from './CommunityPage/GetInfo';
import showAll from './CommunityPage/showAll';
import findFriend from './CommunityPage/FindFriend';
import schoolLife from './CommunityPage/schoolLife';

import listShow from'./CommunityPage/subCommunityPage/showList';
import { createStackNavigator } from 'react-navigation-stack';

const Screens = {
    ALL:{screen:showAll},
    viewList:{screen:listShow},
}
const subCommunityPages = createStackNavigator(Screens);

const AppTabContainer = createAppContainer(subCommunityPages);





export default class CommunityMain extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Feather name='list' size={24} style={{ color: tintColor }} />
        ),
        header: null
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