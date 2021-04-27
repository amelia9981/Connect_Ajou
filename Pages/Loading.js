import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";

class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  checkLoggedInStatus = () => {
    if (this.state.isLoggedIn) {
      return this.props.navigation.replace("Main");
    }
    return this.props.navigation.replace("LogIn");
  };

  componentDidMount = async () => {
    setTimeout(() => {
      this.checkLoggedInStatus();
    }, 3000);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo1.png")} />
      </View>
    );
  }
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

export default LoadingScreen;
