import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../../Utilities/Firebase";

function TimetableTab({ navigation: { navigate } }) {
  //   useEffect(() => {
  //     const courses = firebase.firestore().collection("courses").get();
  //   });

  return (
    <ScrollView contentContainerStyle={style.container}>
      <Text style={style.title}>Timetable</Text>
      <TouchableOpacity
        style={style.plus_icon}
        onPress={() => navigate("PickCourses")}
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
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
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
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
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
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
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
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
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
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
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
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
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
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
            <Text style={style.days}></Text>
          </View>
          <View style={[{ flex: 1 }, style.column]}>
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
