import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CourseItem from "./CourseItem";
import { firebase } from "../../Utilities/Firebase";
import { useNavigation } from "@react-navigation/core";

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

function TimetableTab(props) {
  const isSelected = props.extraData;
  const user = props.user;
  const courseName = props.courseName;
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);
  const [background, setBackground] = useState(randomHex());
  const userRef = firebase.firestore().collection("users").doc(user.email);
  const [myCourses, setMyCourses] = useState([]);
  let array = [];

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("courses")
      .onSnapshot((snapshot) => {
        if (snapshot.size) {
          snapshot.forEach((doc) => array.push({ ...doc.data() }));
          setCourses(array);
        } else {
          console.log("No such document!");
        }
      });

    const clear = userRef.onSnapshot((snapshot) => {
      const getUser = snapshot.data();
      setMyCourses(getUser.myCourses);
    });

    return () => {
      unsubscribe();
      clear();
    };
  }, []);

  const handlePickCourse = (schedule, code, name) => {
    console.log("handling");
    let array_of_schedules = splitSchedule(schedule);
    setBackground(randomHex());
    for (var i = 0; i < array_of_schedules.length; i++) {
      let day = array_of_schedules[i].substr(0, 3);
      let time = array_of_schedules[i].substr(4, 1);
      if (isSelected[matchTime(time)][matchDays(day)] != "#FFFFFF") {
        Alert.alert("Duplicate Entry");
        return;
      }
      isSelected[matchTime(time)][matchDays(day)] = background;
      courseName[matchTime(time)][matchDays(day)] = name;
    }
    let update_array = myCourses;
    update_array.push(code);
    userRef
      .set(
        {
          myCourses: update_array,
        },
        { merge: true }
      )
      .catch(function (error) {
        console.error("Error: ", error);
      });
  };

  return (
    <ScrollView contentContainerStyle={style.container}>
      <Text style={style.title}>Timetable</Text>
      <TouchableOpacity
        style={style.minus_icon}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="minuscircle" size={25} color="#1E3D6B" />
      </TouchableOpacity>
      <View style={{ flex: 1, top: "15%" }}>
        <ScrollView
          style={[style.nested_scroll, style.timetable, style.shadow]}
        >
          {/* Timetable */}
          <View style={{ flexDirection: "column" }}>
            {/* 1st Row */}
            <View style={style.row}>
              <View style={{ flex: 0.7 }}></View>
              <View style={[{ flex: 1 }, style.column]}>
                <Text style={style.days}>Mon</Text>
              </View>
              <View style={[{ flex: 1 }, style.column]}>
                <Text style={style.days}>Tue</Text>
              </View>
              <View style={[{ flex: 1 }, style.column]}>
                <Text style={style.days}>Wed</Text>
              </View>
              <View style={[{ flex: 1 }, style.column]}>
                <Text style={style.days}>Thu</Text>
              </View>
              <View style={[{ flex: 1 }, style.column]}>
                <Text style={style.days}>Fri</Text>
              </View>
            </View>

            {/* 2nd Row */}
            <View style={style.row}>
              <View
                style={{
                  flex: 0.7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={style.time}>A</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[0][0] },
                ]}
              >
                <Text style={style.content}>{courseName[0][0]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[0][1] },
                ]}
              >
                <Text style={style.content}>{courseName[0][1]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[0][2] },
                ]}
              >
                <Text style={style.content}>{courseName[0][2]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[0][3] },
                ]}
              >
                <Text style={style.content}>{courseName[0][3]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[0][4] },
                ]}
              >
                <Text style={style.content}>{courseName[0][4]}</Text>
              </View>
            </View>
            {/* 3rd Row */}
            {/* 3rd Row */}
            <View style={style.row}>
              <View
                style={{
                  flex: 0.7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={style.time}>B</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[1][0] },
                ]}
              >
                <Text style={style.content}>{courseName[1][0]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[1][1] },
                ]}
              >
                <Text style={style.content}>{courseName[1][1]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[1][2] },
                ]}
              >
                <Text style={style.content}>{courseName[1][2]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[1][3] },
                ]}
              >
                <Text style={style.content}>{courseName[1][3]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[1][4] },
                ]}
              >
                <Text style={style.content}>{courseName[1][4]}</Text>
              </View>
            </View>

            {/* 4th Row */}
            <View style={style.row}>
              <View
                style={{
                  flex: 0.7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={style.time}>C</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[2][0] },
                ]}
              >
                <Text style={style.content}>{courseName[2][0]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[2][1] },
                ]}
              >
                <Text style={style.content}>{courseName[2][1]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[2][2] },
                ]}
              >
                <Text style={style.content}>{courseName[2][2]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[2][3] },
                ]}
              >
                <Text style={style.content}>{courseName[2][3]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[2][4] },
                ]}
              >
                <Text style={style.content}>{courseName[2][4]}</Text>
              </View>
            </View>

            {/* 5th Row */}
            <View style={style.row}>
              <View
                style={{
                  flex: 0.7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={style.time}>D</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[3][0] },
                ]}
              >
                <Text style={style.content}>{courseName[3][0]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[3][1] },
                ]}
              >
                <Text style={style.content}>{courseName[3][1]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[3][2] },
                ]}
              >
                <Text style={style.content}>{courseName[3][2]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[3][3] },
                ]}
              >
                <Text style={style.content}>{courseName[3][3]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[3][4] },
                ]}
              >
                <Text style={style.content}>{courseName[3][4]}</Text>
              </View>
            </View>

            {/* 6th Row */}
            <View style={style.row}>
              <View
                style={{
                  flex: 0.7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={style.time}>E</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[4][0] },
                ]}
              >
                <Text style={style.content}>{courseName[4][0]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[4][1] },
                ]}
              >
                <Text style={style.content}>{courseName[4][1]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[4][2] },
                ]}
              >
                <Text style={style.content}>{courseName[4][2]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[4][3] },
                ]}
              >
                <Text style={style.content}>{courseName[4][3]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[4][4] },
                ]}
              >
                <Text style={style.content}>{courseName[4][4]}</Text>
              </View>
            </View>

            {/* 7th Row */}
            <View style={style.row}>
              <View
                style={{
                  flex: 0.7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={style.time}>F</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[5][0] },
                ]}
              >
                <Text style={style.content}>{courseName[5][0]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[5][1] },
                ]}
              >
                <Text style={style.content}>{courseName[5][1]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[5][2] },
                ]}
              >
                <Text style={style.content}>{courseName[5][2]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[5][3] },
                ]}
              >
                <Text style={style.content}>{courseName[5][3]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[5][4] },
                ]}
              >
                <Text style={style.content}>{courseName[5][4]}</Text>
              </View>
            </View>

            {/* 8th Row */}
            <View style={style.row}>
              <View
                style={{
                  flex: 0.7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={style.time}>G</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[6][0] },
                ]}
              >
                <Text style={style.content}>{courseName[6][0]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[6][1] },
                ]}
              >
                <Text style={style.content}>{courseName[6][1]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[6][2] },
                ]}
              >
                <Text style={style.content}>{courseName[6][2]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[6][3] },
                ]}
              >
                <Text style={style.content}>{courseName[6][3]}</Text>
              </View>
              <View
                style={[
                  { flex: 1 },
                  style.column,
                  { backgroundColor: isSelected[6][4] },
                ]}
              >
                <Text style={style.content}>{courseName[6][4]}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={[
          { flex: 0.8, marginLeft: 15, marginRight: 15 },
          style.lecture_list,
        ]}
      >
        <Text style={style.title_lecture_list}>Lecture List</Text>
        <ScrollView>
          {courses.map((course) => (
            <TouchableOpacity
              onPress={() =>
                handlePickCourse(course.schedule, course.code, course.name)
              }
              key={course.code}
            >
              <CourseItem
                name={course.name}
                prof={course.prof}
                schedule={course.schedule}
                credits={course.credits}
                code={course.code}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8F8",
  },
  nested_scroll: {
    marginLeft: 15,
    marginRight: 15,
    maxHeight: 340,
  },
  title: {
    position: "absolute",
    color: "rgba(30, 61, 107, 1)",
    fontSize: 30,
    fontWeight: "700",
    fontStyle: "normal",
    fontFamily: "IBM-SB",
    top: "10%",
    left: "10%",
  },
  minus_icon: {
    position: "absolute",
    top: "11%",
    right: "10%",
  },
  timetable: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(215, 221, 226, 1)",
    borderWidth: 2,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: "rgb(215, 221, 226)",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
  },
  row: {
    flex: 1,
    borderBottomColor: "rgba(215, 221, 226, 1)",
    borderBottomWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  column: {
    borderLeftColor: "rgba(215, 221, 226, 1)",
    borderLeftWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  days: {
    color: "rgba(30, 61, 107, 1)",
    fontSize: 20,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "IBMPlexSansKR-Regular",
    flex: 1,
    paddingTop: "30%",
  },
  time: {
    color: "rgba(30, 61, 107, 1)",
    fontSize: 20,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "IBMPlexSansKR-Regular",
    flex: 1,
    paddingTop: "50%",
  },
  content: {
    fontSize: 10,
    fontFamily: "IBMPlexSansKR-Light",
    flex: 1,
  },
  lecture_list: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(215, 221, 226, 1)",
    borderWidth: 2,
    borderRadius: 10,
  },
  title_lecture_list: {
    color: "rgba(30, 61, 107, 1)",
    fontSize: 30,
    fontWeight: "700",
    fontStyle: "normal",
    fontFamily: "IBM-SB",
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: "center",
  },
});
export default TimetableTab;
