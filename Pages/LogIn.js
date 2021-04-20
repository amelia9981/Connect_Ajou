import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TextInput, Button } from "react-native";

class LogInScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo1.png")} />
        <TextInput
          style={styles.input_id}
          placeholder="ID"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input_id, styles.input_pwd]}
          placeholder="Password"
          secureTextEntry={true}
        />
        <View style={styles.checkbox} />
        <Text style={styles.checkbox_label}>Automatic login</Text>
        <View style={styles.button_register}>
          <Button
            title="Register"
            color="#FFFFFF"
            onPress={() => console.log("Moving to the Registration Page")}
          />
        </View>
        <View style={styles.button_login}>
          <Button
            title="Login"
            color="#FFFFFF"
            onPress={() => this.props.navigation.replace("Main")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    opacity: 1,
    position: "relative",
    backgroundColor: "rgba(89, 149, 221, 1)",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    position: "absolute",
    top: "10%",
    width: "30%",
    height: "30%",
  },
  input_id: {
    fontFamily: "IBMPlexSansKR-Light",
    position: "absolute",
    top: "42%",
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(215, 221, 226, 1)",
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 10,
    width: 345,
    height: 54,
  },
  input_pwd: {
    top: "50%",
  },
  checkbox: {
    opacity: 1,
    position: "absolute",
    top: "58%",
    left: "7%",
    alignContent: "flex-start",
    width: 20,
    height: 20,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#F6F8F8",
    borderRadius: 2,
  },
  checkbox_checked: {
    opacity: 1,
    position: "absolute",
    top: "58%",
    left: "7%",
    alignContent: "flex-start",
    width: 20,
    height: 20,
    backgroundColor: "#F6F8F8",
    borderWidth: 2,
    borderColor: "#F6F8F8",
    borderRadius: 2,
  },
  checkbox_label: {
    fontFamily: "IBMPlexSansKR-Regular",
    position: "absolute",
    top: "58%",
    left: "15%",
    color: "#FFFFFF",
  },
  button_register: {
    fontFamily: "IBMPlexSansKR-Regular",
    position: "absolute",
    bottom: "25%",
    left: "10%",
    backgroundColor: "rgba(30, 61, 107, 0.8)",
    borderRadius: 20,
    shadowColor: "rgb(215,  221,  226)",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 3,
    color: "rgba(255, 255, 255, 1)",
    fontSize: 25,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "center",
    width: 140,
    height: 43,
  },
  button_login: {
    fontFamily: "IBMPlexSansKR-Regular",
    position: "absolute",
    bottom: "25%",
    right: "10%",
    backgroundColor: "rgba(30, 61, 107, 0.8)",
    borderRadius: 20,
    shadowColor: "rgb(215,  221,  226)",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 3,
    color: "rgba(255, 255, 255, 1)",
    fontSize: 25,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "center",
    width: 140,
    height: 43,
  },
});

export default LogInScreen;
