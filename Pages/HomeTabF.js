import React, { Component } from "react";
import {
  Image,
  ScrollView,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Container, Header, Row } from "native-base";
import { Feather } from "@expo/vector-icons";
import * as Font from "expo-font";

class HomeTab extends Component {
  constructor(props) {
    super(props);
    // 폰트로딩이 완료되면 true로 변경
    this.state = { isReady: false };
  }

  async componentDidMount() {
    // await키워드를 붙여 비동기식으로 변경
    await Font.loadAsync({
      Dancing: require("../assets/fonts/Dancing.ttf"),
      EBS훈민정음새론L: require("../assets/fonts/EBS훈민정음새론L.ttf"),
      EBS훈민정음새론R: require("../assets/fonts/EBS훈민정음새론R.ttf"),
      EBS훈민정음새론SB: require("../assets/fonts/EBS훈민정음새론SB.ttf"),
      "IBMPlexSansKR-Light": require("../assets/fonts/IBMPlexSansKR-Light.ttf"),
      "IBMPlexSansKR-Regular": require("../assets/fonts/IBMPlexSansKR-Regular.ttf"),
    });

    // 폰트로드가 완료되어 true로 변경
    this.setState({ isReady: true });
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Feather name="home" size={24} style={{ color: tintColor }} />
    ),
  };
  render() {
    return (
      <ScrollView style={style.container}>
        <Container
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#D7DDE2",
            flexDirection: "row",
            backgroundColor: "white",
            height: 100,
          }}
        >
          <Image
            source={require("./logo_icon.png")}
            style={{
              marginLeft: 20,
              marginBottom: 30,
              marginTop: 40,
              paddingLeft: 10,
              width: 40,
              height: 40,
            }}
          ></Image>
          {this.state.isReady ? (
            <Text
              style={{
                fontFamily: "Dancing",
                marginTop: 42,
                marginLeft: 10,
                fontSize: 25,
              }}
            >
              Connect Ajou
            </Text>
          ) : (
            <Text style={style.title}>Connect Ajou</Text>
          )}
        </Container>

        {this.state.isReady ? (
          <Text
            style={{
              fontFamily: "EBS훈민정음새론R",
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 20,
              fontSize: 20,
            }}
          >
            About Ajou
          </Text>
        ) : (
          <Text style={style.title}>About Ajou</Text>
        )}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ flexDirection: "row", backgroundColor: "white" }}
        >
          <Container style={style.preview}>
            <Text>Hello</Text>
          </Container>
          <Container style={style.preview}>
            <Text>Hello</Text>
          </Container>
          <Container style={style.preview}>
            <Text>Hello</Text>
          </Container>
        </ScrollView>

        {this.state.isReady ? (
          <Text
            style={{
              fontFamily: "EBS훈민정음새론R",
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 20,
              fontSize: 20,
            }}
          >
            Community
          </Text>
        ) : (
          <Text style={style.title}>Community</Text>
        )}
        <Container style={style.community}>
          <Container style={style.containerCommunity}>
            <Text>Hello2</Text>
          </Container>
        </Container>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    marginTop: 42,
    marginLeft: 10,
    fontSize: 25,
  },
  aboutAjou: {},
  community: {
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    width: 280,
    height: 210,
    borderWidth: 2,
    backgroundColor: "white",
    borderColor: "#D7DDE2",
    borderRadius: 10,
    marginBottom: 30,
    marginLeft: 30,
  },
  containerCommunity: {
    width: 360,
    height: 910,
    borderWidth: 2,
    backgroundColor: "white",
    borderColor: "#D7DDE2",
    borderRadius: 10,
    marginBottom: 30,
  },
});

export default HomeTab;
