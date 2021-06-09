import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from "../Utilities/Firebase";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import HomeTabMain from "./HomeTab/HomeTabMain";
import AddFavorites from "./HomeTab/AddFavorites";

const HomeStack = createStackNavigator();

function HomeTab(props) {
  const [user, setUser] = useState(props.extraData);
  const [currentDay, setCurrentDay] = useState(new Date().getDay() - 1);
  const [todayCourses, setTodayCourses] = useState([]);

  useEffect(() => {
    const curUserEmail = firebase.auth().currentUser.providerData[0].email;
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(curUserEmail)
      .onSnapshot((snapshot) => {
        const getUser = snapshot.data();
        setUser(getUser);
      });

    let temp_array = [];
    for (var row = 0; row < 7; row++) {
      let courseName = props.courseName;
      temp_array.push(courseName[row][currentDay]);
    }
    if (temp_array.size) {
      setTodayCourses(temp_array);
    } else {
      setTodayCourses("Nothing's for Today");
    }

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen
        name="HomeTabMain"
        options={{
          animationEnabled: false,
        }}
      >
        {(props) => (
          <HomeTabMain
            {...props}
            extraData={user}
            todayCourses={todayCourses}
          />
        )}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="AddFavorites"
        options={{
          animationEnabled: false,
        }}
      >
        {(props) => <AddFavorites {...props} extraData={user} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

export default HomeTab;
