import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import viewList from '../subCommunityPage/showList';
import addWriting from '../subCommunityPage/addWriting';
import searchWriting from '../subCommunityPage/searchWriting';
import seeWriting from '../subCommunityPage/seeWriting';
import schoolLife from '../schoolLife';

const CampusNav = createStackNavigator({
    Main: { screen: schoolLife },
    ViewList: { screen: viewList },
    Add: { screen: addWriting },
    Search: { screen: searchWriting },
    See: { screen: seeWriting }
})
const AppTabContainer = createAppContainer(CampusNav);

export default class handleCampus extends Component {
    
    render() {
        return (
            <AppTabContainer />
        );
    }
}