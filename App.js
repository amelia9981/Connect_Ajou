import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MainScreen from "./MainScreenF";
import LoadingScreen from "./Pages/Loading";

export default class extends React.Component {
  state = {
    isLoading: true,
  };
  componentDidMount = async () => {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 3000);
  };
  render() {
    const { isLoading } = this.state;
    return isLoading ? <LoadingScreen /> : <MainScreen />;
  }
}

// const AppStackNavigator = createStackNavigator({
//   Main: {
//     screen: MainScreen, // MainScreen 컴포넌트를 네비게이터에 등록
//   },
// });

// export default createAppContainer(AppStackNavigator);

// export default function App() {

//}
