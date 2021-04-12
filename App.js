import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import MainScreen from './MainScreenF';

const AppStackNavigator = createStackNavigator({
  Main: {
    screen: MainScreen // MainScreen 컴포넌트를 네비게이터에 등록
  }
});

export default createAppContainer(AppStackNavigator);
