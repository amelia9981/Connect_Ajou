import React, { Component , useState} from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoadingScreen from "./Pages/Loading";
import MainScreen from "./MainScreenF";
import LogInScreen from "./Pages/LogIn";


//추가할 폰트는 여기에 먼저쓰고 fontFamily에서 쓰면 됩니당~
const getFont = ()=>Font.loadAsync({
  'Dancing': require("./assets/fonts/Dancing.ttf"),
  'EBS훈민정음새론L': require("./assets/fonts/EBS훈민정음새론L.ttf"),
  'EBS훈민정음새론R': require("./assets/fonts/EBS훈민정음새론R.ttf"),
  'EBS훈민정음새론SB': require("./assets/fonts/EBS훈민정음새론SB.ttf"),
  "IBMPlexSansKR-Light": require("./assets/fonts/IBMPlexSansKR-Light.ttf"),
  "IBMPlexSansKR-Regular": require("./assets/fonts/IBMPlexSansKR-Regular.ttf"),
});
/*
const Stack = createStackNavigator();

const switchNavigator = createSwitchNavigator(
  {
    LoadingScreen: LoadingScreen,
    MainScreen: MainScreen,
    LogInScreen: LogInScreen,
  },
  {
    initialRouteName: "LoadingScreen",
  }
);
*/
export default function App(){

  const [fontloaded, setFontsLoaded] = useState(false);

  if(fontloaded){
    return (<MainScreen/>);
  }
  else{
    return(
      <AppLoading
        startAsync={getFont}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    ); 
  }
}


