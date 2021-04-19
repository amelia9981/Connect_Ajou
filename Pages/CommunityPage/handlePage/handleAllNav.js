import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import showAll from '../showAll';
import viewList from '../subCommunityPage/showList';
import addWriting from '../subCommunityPage/addWriting';
import searchWriting from '../subCommunityPage/searchWriting';
import seeWriting from '../subCommunityPage/seeWriting';

const Stack = createStackNavigator();
export default class handleAll extends Component{
    render(){
        return(
            <NavigationContainer independent={true}>
                <Stack.Navigator initialRouteName="Main">
                    <Stack.Screen name="Main" component={showAll} />
                    <Stack.Screen name="ViewList" component={viewList} />
                    <Stack.Screen name="Add" component={addWriting} />
                    <Stack.Screen name="Search" component={searchWriting} />
                    <Stack.Screen name="See" component={seeWriting} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
/*tabBarPosition: "top",
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
            labelStyle: { marginTop:40, fontSize:15,fontFamily:"EBS훈민정음새론SB"},*/