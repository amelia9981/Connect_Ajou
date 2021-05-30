import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Image, TextInput, Text } from "react-native";
import { firebase } from "../Utilities/Firebase";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(response.user.providerData[0].email)
          .get()
          .then((firestoreDocument) => {
            // const user = firestoreDocument.data();
            navigation.navigate("Main");
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo1.png")} />
      <TextInput
        style={styles.input_id}
        placeholder="ID"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={[styles.input_id, styles.input_pwd]}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <View style={styles.button_register}>
        <TouchableOpacity onPress={() => navigation.replace("Registration")}>
          <Text style={styles.button_text}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button_login}>
        <TouchableOpacity onPress={() => onLoginPress()}>
          <Text style={styles.button_text}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
    top: "43%",
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
    top: "51%",
  },
  button_register: {
    fontFamily: "IBMPlexSansKR-Regular",
    position: "absolute",
    bottom: "28%",
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
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button_login: {
    fontFamily: "IBMPlexSansKR-Regular",
    position: "absolute",
    bottom: "28%",
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
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button_text: {
    justifyContent: "center",
    color: "#FFFFFF",
    fontSize: 17,
  },
});
