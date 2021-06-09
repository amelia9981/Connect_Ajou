import React, { useState, useEffect } from "react";
import { StyleSheet, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
// 하단 탭에 들어갈 컴포넌트들
import HomeTab from "./Pages/handleHome";
import CommunityMain from "./Pages/CommunityMain";
import TimetableTab from "./Pages/TimetableTab";
import AlarmTab from "./Pages/Alarm";
import UserTab from "./Pages/User";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { firebase } from "./Utilities/Firebase";

const Tab = createBottomTabNavigator();

let randomHex = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const splitSchedule = (schedule) => {
  const first_schedule = schedule.substr(0, 5);
  const second_schedule = schedule.substr(schedule.indexOf(")") + 2, 5);
  let array_of_schedules = [];
  array_of_schedules.push(first_schedule);
  array_of_schedules.push(second_schedule);
  return array_of_schedules;
};

let matchDays = (day) => {
  switch (day) {
    case "Mon":
      return 0;
    case "Tue":
      return 1;
    case "Wed":
      return 2;
    case "Thu":
      return 3;
    case "Fri":
      return 4;
    default:
      console.log("Invalid Input");
  }
};

let matchTime = (time) => {
  switch (time) {
    case "A":
      return 0;
    case "B":
      return 1;
    case "C":
      return 2;
    case "D":
      return 3;
    case "E":
      return 4;
    case "F":
      return 5;
    case "G":
      return 6;
    default:
      console.log("Invalid Input");
  }
};

function MainScreen(props) {
  const [user, setUser] = useState({});
  let selected_array = Array.from({ length: 8 }, () =>
    Array(5).fill("#FFFFFF")
  );
  let course_array = Array.from({ length: 8 }, () => Array(5).fill(""));
  const [isSelected, setSelected] = useState(selected_array);
  const [courseName, setCourseName] = useState(course_array);

  useEffect(() => {
    const curUserEmail = firebase.auth().currentUser.providerData[0].email;
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(curUserEmail)
      .onSnapshot((snapshot) => {
        const getUser = snapshot.data();
        setUser(getUser);
        if (!getUser.myCourses.length) {
          return () => {
            unsubscribe();
          };
        }
        getUser.myCourses.forEach((course) => {
          let background = randomHex();
          const courseRef = firebase
            .firestore()
            .collection("courses")
            .doc(course);
          courseRef.get().then((doc) => {
            const getMyCourse = doc.data();
            let array_of_schedules = splitSchedule(getMyCourse.schedule);
            for (var i = 0; i < array_of_schedules.length; i++) {
              let day = array_of_schedules[i].substr(0, 3);
              let time = array_of_schedules[i].substr(4, 1);
              let row = matchTime(time);
              let column = matchDays(day);
              if (isSelected[row][column] == "#FFFFFF") {
                isSelected[row][column] = background;
                courseName[row][column] = getMyCourse.name;
              }
            }
          });
        });
      });
    return () => {
      unsubscribe();
    };
  }, []);

  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Main";

    switch (routeName) {
      case "Main":
        return "Main";
      case "ViewList":
        return "ViewList";
      case "Add":
        return "Add";
      case "Search":
        return "Search";
      case "See":
        return "See";
    }
  }

  return (
    <Tab.Navigator
      screenOptions={{}}
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
        showLabel: false,
        indicatorStyle: {
          backgroundColor: "#1E3D6B",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
        initialParams={{ extraData: user, courseName:courseName }}
      >
      </Tab.Screen>
      <Tab.Screen
        name="Community"
        component={CommunityMain}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="list" size={24} color={color} />
          ),
        })}
        initialParams={{ extraData: user }}
      />
      <Tab.Screen
        name="Timetable"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="layout" size={24} color={color} />
          ),
        }}
      >
        {(props) => (
          <TimetableTab
            {...props}
            extraData={isSelected}
            courseName={courseName}
            user={user}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Alarm"
        component={AlarmTab}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="bell" size={24} color={color} />
          ),
        }}
        initialParams={{ extraData: user }}
      >
      </Tab.Screen>
      <Tab.Screen
        name="User"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      >
        {(props) => <UserTab {...props} extraData={user} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MainScreen;
