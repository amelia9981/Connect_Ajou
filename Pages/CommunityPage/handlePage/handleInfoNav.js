import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import getInfo from '../GetInfo';
import viewList from '../subCommunityPage/showList';
import addWriting from '../subCommunityPage/addWriting';
import searchWriting from '../subCommunityPage/searchWriting';
import seeWriting from '../subCommunityPage/seeWriting';

const InfoNav = createStackNavigator({
    Main: { screen: getInfo },
    ViewList: { screen: viewList },
    Add: { screen: addWriting },
    Search: { screen: searchWriting },
    See: { screen: seeWriting }
})
const AppTabContainer  = createAppContainer(InfoNav);

export default class handleInfo extends Component {
    static navigationOptions = {
        headerShown: false,
      };
      
    render() {
        return (
            <AppTabContainer />
        );
    }
}