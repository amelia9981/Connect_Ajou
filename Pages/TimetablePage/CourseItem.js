import React from "react";
import { View, Text, StyleSheet } from "react-native";

function CourseItem(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.prof}>{props.prof}</Text>
      <Text style={styles.schedule}>{props.schedule}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.credits}>{props.credits} credits</Text>
        <Text style={styles.code}>{props.code}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(215, 221, 226, 1)",
  },
  name: {
    fontSize: 15,
    fontFamily: "IBMPlexSansKR-Regular",
  },
  prof: {
    fontSize: 13,
    fontFamily: "IBMPlexSansKR-Light",
  },
  schedule: {
    marginTop: 10,
    fontSize: 13,
    fontFamily: "IBMPlexSansKR-Light",
  },
  credits: {
    fontSize: 13,
    fontFamily: "IBMPlexSansKR-Light",
  },
  code: {
    marginLeft: 5,
    fontSize: 13,
    fontFamily: "IBMPlexSansKR-Light",
  },
});

export default CourseItem;
