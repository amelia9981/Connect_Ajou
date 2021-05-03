import React, { Component } from 'react';
import { Container, Button, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HandleCommunity from './handleCommunity';
import ViewList from './CommunityPage/subCommunityPage/showList';
import AddWriting from './CommunityPage/subCommunityPage/addWriting';
import SearchWriting from './CommunityPage/subCommunityPage/searchWriting';
import SeeWriting from './CommunityPage/subCommunityPage/seeWriting';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator();
const AllStack = createStackNavigator();

function CommunityMain({route,navigation}){
    //커뮤니티 세부페이지 들어가면 탭안보이는 코드
    const user = route.params.extraData
    route.state && route.state.index > 0
        ? navigation.setOptions({ tabBarVisible: false })
        : navigation.setOptions({ tabBarVisible: true });
    
    //여기에 각 페이지별 리스트 추가해주면 될 것 같아용
        return (
        <AllStack.Navigator>
            <AllStack.Screen name="Main" component ={HandleCommunity} options={{headerShown:false}} initialParams ={{extraData:user}}/>
                <AllStack.Screen name="ViewList" component={ViewList} initialParams={{ extraData: user }}/>
                <AllStack.Screen name="Add" component={AddWriting} initialParams={{ extraData: user }} />
                <AllStack.Screen name="Search" component={SearchWriting} initialParams={{ extraData: user }} />
                <AllStack.Screen name="See" component={SeeWriting} initialParams={{ extraData: user }} />
        </AllStack.Navigator>
    );
    
}

export default CommunityMain;
 
const style = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection:'row',
        marginLeft:'5%'
    }
});