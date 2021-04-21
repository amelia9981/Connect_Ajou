import React, { Component } from 'react';
import { Container, Button, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import showAll from './CommunityPage/showAll';
import getInfo from './CommunityPage/GetInfo';
import findFriend from './CommunityPage/FindFriend';
import schoolLife from './CommunityPage/schoolLife';
import viewList from './CommunityPage/subCommunityPage/showList';
import addWriting from './CommunityPage/subCommunityPage/addWriting';
import searchWriting from './CommunityPage/subCommunityPage/searchWriting';
import seeWriting from './CommunityPage/subCommunityPage/seeWriting';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator();
const AllStack = createStackNavigator();

class handleCommunity extends Component {
    render(){
        return(
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarPosition: "top",
                swipeEnabled: false,
            })}
                tabBarOptions={{
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
                    labelStyle: {
                        marginTop: 40,
                        fontSize: 15,
                        fontFamily: "EBS훈민정음새론SB",
                    },
                    indicatorStyle: {
                        backgroundColor: "#1E3D6B",
                    },
                }}>
            <Tab.Screen name="All" component={showAll} />
            <Tab.Screen name="Info" component={getInfo} />
            <Tab.Screen name="Campus" component={schoolLife} />
            <Tab.Screen name="Friends" component={findFriend} />
        </Tab.Navigator >
        )
    }
}

class CommunityMain extends Component{
    render(){
    //커뮤니티 세부페이지 들어가면 탭안보이는 코드
    this.props.route.state && this.props.route.state.index > 0
        ? this.props.navigation.setOptions({ tabBarVisible: false })
        : this.props.navigation.setOptions({ tabBarVisible: true });
    
    //여기에 각 페이지별 리스트 추가해주면 될 것 같아용
        return (
            <AllStack.Navigator>
            <AllStack.Screen name="Main" component={handleCommunity}  options={{headerShown:false}}/>
                <AllStack.Screen name="ViewList" component={viewList} />
                <AllStack.Screen name="Add" component={addWriting} />
                <AllStack.Screen name="Search" component={searchWriting}/>
                <AllStack.Screen name="See" component={seeWriting} />
        </AllStack.Navigator>
    );
    }
}

export default CommunityMain;
 
const style = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection:'row',
        marginLeft:'5%'
    }
});