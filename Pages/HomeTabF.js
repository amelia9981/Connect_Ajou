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

class HomeTab extends Component {
  
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
            <Text
              style={style.title}
            >
              Connect Ajou
            </Text>
          
        </Container>

          <Text style={style.subTitle}>
            About Ajou
          </Text>

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

          <Text style={style.subTitle}>
            Community
          </Text>
       
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
    fontFamily: "Dancing",
    marginTop: 42,
    marginLeft: 10,
    fontSize: 25,
  },
  subTitle: {
    fontFamily: "EBS훈민정음새론R",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    fontSize: 20,
  },
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
