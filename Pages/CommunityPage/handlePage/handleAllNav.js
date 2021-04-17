import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import showAll from '../showAll';
import viewList from '../subCommunityPage/showList';
import addWriting from '../subCommunityPage/addWriting';
import searchWriting from '../subCommunityPage/searchWriting';
import seeWriting from '../subCommunityPage/seeWriting';

const AllNav = createStackNavigator({
    Main: { screen: showAll },
    ViewList: { screen: viewList },
    Add: { screen: addWriting },
    Search: { screen: searchWriting },
    See: { screen: seeWriting }
})
const AppTabContainer = createAppContainer(AllNav);

export default class handleAll extends Component{
    render(){
        return(
            <AppTabContainer />
        );
    }
}