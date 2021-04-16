import React, { Component , useState} from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
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

const AppNavigaitor = createAppContainer(switchNavigator);

export default function App(){

  const [fontloaded, setFontsLoaded] = useState(false);

  if(fontloaded){
    return <AppNavigaitor />;
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


