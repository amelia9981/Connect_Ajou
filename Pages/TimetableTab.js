import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Timetable from "./TimetablePage/Timetable";
import PickCourses from "./TimetablePage/PickCourses";
import { firebase } from "../Utilities/Firebase";

const TimetableStack = createStackNavigator();

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

function TimetableNav(props) {
  const user = props.extraData;
  let selected_array = Array.from({ length: 8 }, () =>
    Array(5).fill("#FFFFFF")
  );
  const [isSelected, setSelected] = useState(selected_array);

  useLayoutEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(user.email)
      .onSnapshot((snapshot) => {
        const getUser = snapshot.data();
        getUser.my_courses.forEach((course) => {
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
              console.log(row);
              console.log(column);
              if (isSelected[row][column] == "#FFFFFF") {
                console.log("hey");
                isSelected[row][column] = background;
                console.log("background is: " + background);
                console.log(isSelected[row][column]);
              }
            }
          });
        });
        // console.log(isSelected);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <TimetableStack.Navigator
      initialRouteName="Timetable"
      screenOptions={{
        headerShown: false,
      }}
    >
      <TimetableStack.Screen
        name="Timetable"
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      >
        {(props) => <Timetable {...props} extraData={isSelected} />}
      </TimetableStack.Screen>
      <TimetableStack.Screen
        name="PickCourses"
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      >
        {(props) => (
          <PickCourses {...props} extraData={isSelected} user={user} />
        )}
      </TimetableStack.Screen>
    </TimetableStack.Navigator>
  );
}

export default TimetableNav;
