import React, { useState, useEffect, useRef } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import MainScreen from "./MainScreenF";
import LogInScreen from "./Pages/LogIn";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Registration from "./Pages/Registration";
import { firebase } from "./Utilities/Firebase";
import Constants from "expo-constants";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

//추가할 폰트는 여기에 먼저쓰고 fontFamily에서 쓰면 됩니당~
const getFont = () =>
  Font.loadAsync({
    Dancing: require("./assets/fonts/Dancing.ttf"),
    EBS훈민정음새론L: require("./assets/fonts/EBS훈민정음새론L.ttf"),
    EBS훈민정음새론R: require("./assets/fonts/EBS훈민정음새론R.ttf"),
    EBS훈민정음새론SB: require("./assets/fonts/EBS훈민정음새론SB.ttf"),
    "IBMPlexSansKR-Light": require("./assets/fonts/IBMPlexSansKR-Light.ttf"),
    "IBMPlexSansKR-Regular": require("./assets/fonts/IBMPlexSansKR-Regular.ttf"),
    "IBM-SB": require("./assets/fonts/IBMPlexSans-SemiBold.ttf"),
    "Mono-SB": require("./assets/fonts/RobotoMono-SemiBold.ttf"),
    "Balloo2-SB":require('./assets/fonts/Baloo2-SemiBold.ttf'),
    "Balloo2-R": require('./assets/fonts/Baloo2-Regular.ttf'),
  });

const RootStack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [fontloaded, setFontsLoaded] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [notification, setNotification] = useState({});
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotification().then((token) => setToken(token));
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    const usersRef = firebase.firestore().collection("users");
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.email)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoaded(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoaded(false);
          });
      } else {
        setLoaded(false);
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
      unsubscribe();
    };
  }, []);

  if (fontloaded && !loaded) {
    return (
      <NavigationContainer>
        <RootStack.Navigator options={{ headerShown: false }}>
          {user ? (
            <RootStack.Screen name="Main" options={{ headerShown: false }}>
              {(props) => (
                <MainScreen {...props} extraData={user} token={token} />
              )}
            </RootStack.Screen>
          ) : (
            <>
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
            </>
          )}
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

async function registerForPushNotification() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
