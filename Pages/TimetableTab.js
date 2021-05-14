import React, { useState, useEffect } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Timetable from "./TimetablePage/Timetable";
import PickCourses from "./TimetablePage/PickCourses";
import { firebase } from "../Utilities/Firebase";

const TimetableStack = createStackNavigator();

function TimetableNav(props) {
  const user = props.user;
  const isSelected = props.extraData;
  const courseName = props.courseName;

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
        {(props) => (
          <Timetable
            {...props}
            extraData={isSelected}
            user={user}
            courseName={courseName}
          />
        )}
      </TimetableStack.Screen>
      <TimetableStack.Screen
        name="PickCourses"
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      >
        {(props) => (
          <PickCourses
            {...props}
            extraData={isSelected}
            user={user}
            courseName={courseName}
          />
        )}
      </TimetableStack.Screen>
    </TimetableStack.Navigator>
  );
}

export default TimetableNav;
