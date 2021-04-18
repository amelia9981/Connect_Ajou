import React, { Component } from "react";
import { StyleSheet, Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

// 하단 탭에 들어갈 컴포넌트들
import showAll from "./showAll";
import schoolLife from "./schoolLife";
import findFriend from "./FindFriend";
import getInfo from "./GetInfo";

const AppTabNavigator = createMaterialTopTabNavigator(
    {
        ALL: { screen: showAll },
        Info: { screen: getInfo },
        Campus: { screen: schoolLife },
        Friends: { screen: findFriend },
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

class kindOfC extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return <AppTabContainer />; // AppTabContainet 컴포넌트를 리턴한다.
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default kindOfC;
