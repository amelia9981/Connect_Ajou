import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoadingScreen from "./Pages/Loading";
import MainScreen from "./MainScreenF";
import LogInScreen from "./Pages/LogIn";

// export default class extends React.Component {
//   state = {
//     isLoading: true,
//     isLoggedIn: true,
//   };
//   componentDidMount = async () => {
//     setTimeout(() => {
//       this.setState({ isLoading: false });
//     }, 3000);
//   };
//   render() {
//     const { isLoading, isLoggedIn } = this.state;
//     return isLoading ? (
//       <LoadingScreen />
//     ) : isLoggedIn ? (
//       <LogInScreen />
//     ) : (
//       <MainScreen />
//     );
//   }
// }

const switchNavigator = createSwitchNavigator(
  {
    LoadingScreen: LoadingScreen,
    MainScreen: MainScreen,
    LogInScreen: LogInScreen,
  },
  {
    initialRouteName: "LoadingScreen",
  }
);

const AppNavigator = createAppContainer(switchNavigator);

class App extends Component {
  render() {
    return <AppNavigator />;
  }
}

export default App;
