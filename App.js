import React, { Component, useState, useEffect } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import LoadingScreen from "./Pages/Loading";
import MainScreen from "./MainScreenF";
import LogInScreen from "./Pages/LogIn";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Registration from "./Pages/Registration";
import { firebase } from './Utilities/Firebase';

//추가할 폰트는 여기에 먼저쓰고 fontFamily에서 쓰면 됩니당~
const getFont = () =>
  Font.loadAsync({
    Dancing: require("./assets/fonts/Dancing.ttf"),
    EBS훈민정음새론L: require("./assets/fonts/EBS훈민정음새론L.ttf"),
    EBS훈민정음새론R: require("./assets/fonts/EBS훈민정음새론R.ttf"),
    EBS훈민정음새론SB: require("./assets/fonts/EBS훈민정음새론SB.ttf"),
    "IBMPlexSansKR-Light": require("./assets/fonts/IBMPlexSansKR-Light.ttf"),
    "IBMPlexSansKR-Regular": require("./assets/fonts/IBMPlexSansKR-Regular.ttf"),
    "IBM-SB": require('./assets/fonts/IBMPlexSans-SemiBold.ttf'),
    'Mono-SB': require('./assets/fonts/RobotoMono-SemiBold.ttf'),
  });

const RootStack = createStackNavigator();

export default function App() {
  const [fontloaded, setFontsLoaded] = useState(false);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            
          })
          .catch((error) => {
            setLoaded(false)
          });
      } else {
        setLoaded(false)
      }
    });
  }, []);

  if (fontloaded && loaded) {
    return (
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Loading">
          <RootStack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Registration"
            component={Registration}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="LogIn"
            component={LogInScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFont}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }
  
}
