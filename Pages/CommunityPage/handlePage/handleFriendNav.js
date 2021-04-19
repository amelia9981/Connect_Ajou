import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import showAll from '../showAll';
import viewList from '../subCommunityPage/showList';
import addWriting from '../subCommunityPage/addWriting';
import searchWriting from '../subCommunityPage/searchWriting';
import seeWriting from '../subCommunityPage/seeWriting';

const Stack = createStackNavigator();

export default function handleFriend({ navigation, route }) {
    console.log('route.state ? ', route.state && route.state);
    console.log('route.state.index ? ', route.state && route.state.index);
    route.state && route.state.index > 0
        ? navigation.setOptions({ tabBarVisible: false })
        : navigation.setOptions({ tabBarVisible: true });
    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={showAll} />
            <Stack.Screen name="ViewList" component={viewList} />
            <Stack.Screen name="Add" component={addWriting} />
            <Stack.Screen name="Search" component={searchWriting} />
            <Stack.Screen name="See" component={seeWriting} />
        </Stack.Navigator>
    );
}