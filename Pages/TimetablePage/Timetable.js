import React, { Component, useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

function TimetableTab(props) {
  let selected_array = Array.from({ length: 8 }, () =>
    Array(5).fill("#FFFFFF")
  );
  const [isSelected, setSelected] = useState(selected_array);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    setSelected(props.extraData);
    console.log("---------------");
    console.log(isSelected);
  }, []);

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
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[0][1] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[0][2] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[0][3] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[0][4] },
            ]}
          >
            <Text style={style.days}></Text>
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
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[1][1] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[1][2] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[1][3] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[1][4] },
            ]}
          >
            <Text style={style.days}></Text>
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
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[2][1] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[2][2] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[2][3] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[2][4] },
            ]}
          >
            <Text style={style.days}></Text>
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
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[3][1] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[3][2] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[3][3] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[3][4] },
            ]}
          >
            <Text style={style.days}></Text>
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
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[4][1] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[4][2] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[4][3] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[4][4] },
            ]}
          >
            <Text style={style.days}></Text>
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
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[5][1] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[5][2] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[5][3] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[5][4] },
            ]}
          >
            <Text style={style.days}></Text>
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
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[6][1] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[6][2] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[6][3] },
            ]}
          >
            <Text style={style.days}></Text>
          </View>
          <View
            style={[
              { flex: 1 },
              style.column,
              { backgroundColor: isSelected[6][4] },
            ]}
          >
            <Text style={style.days}></Text>
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
  lecture_list: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(215, 221, 226, 1)",
    borderWidth: 2,
    borderRadius: 10,
    width: "95%",
  },
  title_lecture_list: {
    color: "rgba(30, 61, 107, 1)",
    fontSize: 30,
    fontWeight: "700",
    fontStyle: "normal",
    fontFamily: "IBM-SB",
  },
});
export default TimetableTab;
