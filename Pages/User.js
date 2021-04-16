import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Right } from "native-base";

class UserTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Feather name="user" size={24} style={{ color: tintColor }} />
    ),
  };
  render() {
    return (
      <ScrollView contentContainerStyle={style.container}>
        <Text style={style.my_page}>My Page</Text>
        <View style={style.profile_photo}></View>
        <View style={style.box_1}>
          <Text style={style.box_label}>Name</Text>
          <Text style={style.box_label}>ID</Text>
          <Text style={style.box_label}>Email</Text>
        </View>
        <View style={style.box_2}>
          <Text style={style.box_title}>Account</Text>
          <Text style={style.box_content}>Change password</Text>
          <Text style={style.box_content}>Change name</Text>
          <Text style={style.box_content}>Logout</Text>
        </View>
        <View style={style.box_3}>
          <Text style={style.box_title}>Configure</Text>
          <Text style={style.box_content}>Notification settings</Text>
          <Text style={style.box_content}>Language</Text>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F8F8",
  },
  my_page: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(30, 61, 107, 1)",
    fontSize: 30,
    fontWeight: "400",
    fontStyle: "normal",
    // fontFamily: "EBS HMJE Saeron SB",
    textAlign: "left",
    left: "10%",
    top: "15%",
  },
  profile_photo: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(215, 221, 226, 1)",
    borderWidth: 1,
    borderRadius: 65,
    width: 130,
    height: 130,
    left: "8%",
    top: "24%",
  },
  image: {
    resizeMode: "contain",
  },
  box_1: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(215, 221, 226, 1)",
    borderWidth: 1,
    borderRadius: 10,
    width: "48%",
    height: "12%",
    left: "49%",
    top: "26%",
  },
  box_2: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(215, 221, 226, 1)",
    borderWidth: 1,
    borderRadius: 10,
    width: "95%",
    height: "17%",
    top: "45%",
  },
  box_3: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(215, 221, 226, 1)",
    borderWidth: 1,
    borderRadius: 10,
    width: "95%",
    height: "14%",
    top: "65%",
  },
  box_label: {
    flex: 1,
    paddingLeft: "5%",
    paddingTop: "5%",
    color: "#2C5E9E",
    fontSize: 12,
    fontWeight: "700",
  },
  box_title: {
    flex: 1,
    paddingLeft: "5%",
    paddingTop: "2%",
    color: "#2C5E9E",
    fontSize: 15,
    fontWeight: "700",
  },
  box_content: {
    flex: 1,
    paddingLeft: "5%",
    paddingTop: "2%",
    fontSize: 13,
  },
});

export default UserTab;
