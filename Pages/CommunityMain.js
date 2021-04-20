import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import showAll from './CommunityPage/showAll';
import getInfo from './CommunityPage/GetInfo';
import findFriend from './CommunityPage/FindFriend';
import schoolLife from './CommunityPage/schoolLife';
import viewList from './CommunityPage/subCommunityPage/showList';
import addWriting from './CommunityPage/subCommunityPage/addWriting';
import searchWriting from './CommunityPage/subCommunityPage/searchWriting';
import seeWriting from './CommunityPage/subCommunityPage/seeWriting';

const Tab = createBottomTabNavigator();
const AllStack = createStackNavigator();
const InfoStack = createStackNavigator();
const CampusStack = createStackNavigator();
const FriendStack = createStackNavigator();

const handleAll = ({ navigation, route }) => {
    navigation.setOptions({ tabBarVisible: false })
    return (
        <AllStack.Navigator initialRouteName="Main">
            <AllStack.Screen name="Main" component={showAll} options={{ headerShown: false }} />
            <AllStack.Screen name="ViewList" component={viewList} />
            <AllStack.Screen name="Add" component={addWriting} />
            <AllStack.Screen name="Search" component={searchWriting} />
            <AllStack.Screen name="See" component={seeWriting} />
        </AllStack.Navigator>
    );
}

const handleInfo = ({ navigation, route }) => {
    navigation.setOptions({ tabBarVisible: false })
    return (
        <InfoStack.Navigator initialRouteName="Main">
            <InfoStack.Screen name="Main" component={getInfo} options={{ headerShown: false }} />
            <InfoStack.Screen name="ViewList" component={viewList} />
            <InfoStack.Screen name="Add" component={addWriting} />
            <InfoStack.Screen name="Search" component={searchWriting} />
            <InfoStack.Screen name="See" component={seeWriting} />
        </InfoStack.Navigator>
    );
}

const handleCampus = ({ navigation, route }) => {
    navigation.setOptions({ tabBarVisible: false })
    return (
        <CampusStack.Navigator initialRouteName="Main">
            <CampusStack.Screen name="Main" component={schoolLife} options={{ headerShown: false }} />
            <CampusStack.Screen name="ViewList" component={viewList} />
            <CampusStack.Screen name="Add" component={addWriting} />
            <CampusStack.Screen name="Search" component={searchWriting} />
            <CampusStack.Screen name="See" component={seeWriting} />
        </CampusStack.Navigator>
    );
}

const handleFriend = ({ navigation, route }) => {
    navigation.setOptions({ tabBarVisible: false })  
    return (
        <FriendStack.Navigator initialRouteName="Main">
            <FriendStack.Screen name="Main" component={findFriend} options={{ headerShown: false }} />
            <FriendStack.Screen name="ViewList" component={viewList} />
            <FriendStack.Screen name="Add" component={addWriting} />
            <FriendStack.Screen name="Search" component={searchWriting} />
            <FriendStack.Screen name="See" component={seeWriting} />
        </FriendStack.Navigator>
    );
}
export default class CommunityMain extends Component {
    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="All" component={handleAll} />
                <Tab.Screen name="Info" component={handleInfo} />
                <Tab.Screen name="Campus" component={handleCampus} />
                <Tab.Screen name="Friends" component={handleFriend} />
            </Tab.Navigator>
        )
    }
}
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});