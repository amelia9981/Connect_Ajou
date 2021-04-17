import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import findFriend from '../FindFriend';
import viewList from '../subCommunityPage/showList';
import addWriting from '../subCommunityPage/addWriting';
import searchWriting from '../subCommunityPage/searchWriting';
import seeWriting from '../subCommunityPage/seeWriting';

const FriendNav = createStackNavigator({
    Main: { screen: findFriend },
    ViewList: { screen: viewList },
    Add: { screen: addWriting },
    Search: { screen: searchWriting },
    See: { screen: seeWriting }
})
const AppTabContainer = createAppContainer(FriendNav);

export default class handleFriend extends Component {
    
    render() {
        return (
            <AppTabContainer />
        );
    }
}