import React from "react";
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Timetable from "./TimetablePage/Timetable";
import PickCourses from "./TimetablePage/PickCourses";

const TimetableStack = createStackNavigator();

function TimetableNav(props) {
  return (
    <TimetableStack.Navigator
      initialRouteName="Timetable"
      screenOptions={{
        headerShown: false,
      }}
    >
      <TimetableStack.Screen
        name="Timetable"
        component={Timetable}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <TimetableStack.Screen
        name="PickCourses"
        component={PickCourses}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
    </TimetableStack.Navigator>
  );
}

export default TimetableNav;
