import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import getInfo from '../GetInfo';
import viewList from '../subCommunityPage/showList';
import addWriting from '../subCommunityPage/addWriting';
import searchWriting from '../subCommunityPage/searchWriting';
import seeWriting from '../subCommunityPage/seeWriting';

const Stack = createStackNavigator();
export default class handleInfo extends Component {
    static navigationOptions = {
        headerShown: false,
      };
      
    render() {
        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator initialRouteName="Main">
                    <Stack.Screen name="Main" component={getInfo} />
                    <Stack.Screen name="ViewList" component={viewList} />
                    <Stack.Screen name="Add" component={addWriting} />
                    <Stack.Screen name="Search" component={searchWriting} />
                    <Stack.Screen name="See" component={seeWriting} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}