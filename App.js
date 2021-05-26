import React, { useState, useEffect } from "react";
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

  const registerForPushNotification = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("It requires your permissions");
      return;
    }
    const getToken = (await Notifications.getExpoPushTokenAsync()).data;
    setToken(getToken);

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  useEffect(() => {
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
      unsubscribe();
      registerForPushNotification();
      Notifications.addNotificationReceivedListener(_handleNotification);
      Notifications.addNotificationResponseReceivedListener(
        _handleNotificationResponse
      );
    };
  }, []);

  const _handleNotification = (notification) => {
    setNotification({ notification: notification });
  };

  const _handleNotificationResponse = (response) => {
    console.log(response);
  };

  if (fontloaded && !loaded) {
    return (
      <NavigationContainer>
        <RootStack.Navigator options={{ headerShown: false }}>
          {user ? (
            <RootStack.Screen name="Main" options={{ headerShown: false }}>
              {(props) => <MainScreen {...props} extraData={user} />}
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
