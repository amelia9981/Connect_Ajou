import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, SectionList, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import listShow from './showList';
import seeWriting from './seeWriting';
import searchWriting from './searchWriting';
import addWriting from './addWriting';
//네비게이터 확인용

const AppStackNavigator = createStackNavigator({
    ViewList: {
        screen: listShow // MainScreen 컴포넌트를 네비게이터에 등록
    }
});

export default createAppContainer(AppStackNavigator);