import React from "react";
import { StyleSheet, View, Image } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo1.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5995DD",
  },
  logo: {
    position: "absolute",
    width: "50%",
    height: "50%",
  },
});
