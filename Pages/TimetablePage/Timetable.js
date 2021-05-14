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
import { firebase } from "../../Utilities/Firebase";
import { useNavigation } from "@react-navigation/core";

function TimetableTab(props) {
  const isSelected = props.extraData;
  const user = props.user;
  const courseName = props.courseName;
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);
  const userRef = firebase.firestore().collection("users").doc(user.email);
  const [myCourses, setMyCourses] = useState([]);
  let array = [];
  let temp_array = [];

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
      getUser.my_courses.forEach((course) => {
        temp_array.push(course);
        setMyCourses(temp_array);
      });
    });

    return () => {
      unsubscribe();
      clear();
    };
  }, []);

  const handleClickCourse = (courseName) => {
    Alert.alert("Do you want to remove this course?", courseName, [
      {
        text: "No",
        onPress: () => console.log("No"),
      },
      {
        text: "Yes",
        onPress: () => {
          console.log("Yes");
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={style.container}>
      <Text style={style.title}>Timetable</Text>
      <TouchableOpacity
        style={style.plus_icon}
        onPress={() => navigation.navigate("PickCourses")}
      >
        <AntDesign name="pluscircle" size={25} color="#1E3D6B" />
      </TouchableOpacity>

      {/* Timetable */}
      <View
        style={[style.timetable, style.shadow, { flexDirection: "column" }]}
      >
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
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[0][0])}
            >
              {courseName[0][0]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[0][1] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[0][1])}
            >
              {courseName[0][1]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[0][2] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[0][2])}
            >
              {courseName[0][2]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[0][3] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[0][3])}
            >
              {courseName[0][3]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[0][4] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[0][4])}
            >
              {courseName[0][4]}
            </Text>
          </View>
        </View>

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
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[1][0])}
            >
              {courseName[1][0]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[1][1] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[1][1])}
            >
              {courseName[1][1]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[1][2] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[1][2])}
            >
              {courseName[1][2]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[1][3] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[1][3])}
            >
              {courseName[1][3]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[1][4] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[1][4])}
            >
              {courseName[1][4]}
            </Text>
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
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[2][0])}
            >
              {courseName[2][0]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[2][1] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[2][1])}
            >
              {courseName[2][1]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[2][2] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[2][2])}
            >
              {courseName[2][2]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[2][3] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[2][3])}
            >
              {courseName[2][3]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[2][4] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[2][4])}
            >
              {courseName[2][4]}
            </Text>
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
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[3][0])}
            >
              {courseName[3][0]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[3][1] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[3][1])}
            >
              {courseName[3][1]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[3][2] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[3][2])}
            >
              {courseName[3][2]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[3][3] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[3][3])}
            >
              {courseName[3][3]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[3][4] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[3][4])}
            >
              {courseName[3][4]}
            </Text>
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
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[4][0])}
            >
              {courseName[4][0]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[4][1] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[4][1])}
            >
              {courseName[4][1]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[4][2] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[4][2])}
            >
              {courseName[4][2]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[4][3] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[4][3])}
            >
              {courseName[4][3]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[4][4] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[4][4])}
            >
              {courseName[4][4]}
            </Text>
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
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[5][0])}
            >
              {courseName[5][0]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[5][1] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[5][1])}
            >
              {courseName[5][1]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[5][2] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[5][2])}
            >
              {courseName[5][2]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[5][3] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[5][3])}
            >
              {courseName[5][3]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[5][4] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[5][4])}
            >
              {courseName[5][4]}
            </Text>
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
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[6][0])}
            >
              {courseName[6][0]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[6][1] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[6][1])}
            >
              {courseName[6][1]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[6][2] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[6][2])}
            >
              {courseName[6][2]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[6][3] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[6][3])}
            >
              {courseName[6][3]}
            </Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[6][4] },
            ]}
          >
            <Text
              style={style.content}
              onPress={() => handleClickCourse(courseName[6][4])}
            >
              {courseName[6][4]}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F8F8",
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
  plus_icon: {
    position: "absolute",
    top: "11%",
    right: "10%",
  },
  timetable: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(215, 221, 226, 1)",
    borderWidth: 2,
    borderRadius: 10,
    width: "95%",
    height: "80%",
    top: "17%",
    justifyContent: "center",
    alignItems: "center",
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
});
export default TimetableTab;
