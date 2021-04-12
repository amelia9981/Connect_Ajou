import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

// 하단 탭에 들어갈 컴포넌트들
import HomeTab from './Pages/HomeTabF'
import CommunityMain from './Pages/CommunityMain'
import TimetableTab from './Pages/TimetableTab'
import AlarmTab from './Pages/Alarm'
import UserTab from './Pages/User'


const AppTabNavigator = createMaterialTopTabNavigator({
    HomeTab: { screen: HomeTab },
    CommunityMain: { screen: CommunityMain },
    TimetableTab: { screen: TimetableTab },
    AlarmTab: { screen: AlarmTab },
    UserTab: { screen: UserTab }
}, {
    animationEnabled: true,
    swipeEnabled: false,
    tabBarPosition: "bottom",
    tabBarOptions: {
        style: {
            ...Platform.select({
                ios: {
                    backgroundColor: 'white',
                },
                android:{
                    backgroundColor:"white",
                }
            })
        },
        iconStyle: { height: 30 },
        activeTintColor: '#1E3D6B',
        inactiveTintColor: '#D7DDE2',
        upperCaseLabel: false,
        showLabel: false,
        showIcon: true,
    }
});

const AppTabContainet = createAppContainer(AppTabNavigator);

export default class MainScreen extends Component {

    static navigationOptions = {
        header: null
    }

    render() {
        return <AppTabContainet />; // AppTabContainet 컴포넌트를 리턴한다.
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});