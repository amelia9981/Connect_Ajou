import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Container, Header, Row } from "native-base";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";

class HomeTab extends Component {
  render() {
    return (
      <ScrollView style={style.container}>
        <View
          style={{
            borderBottomWidth: 2,
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
          <Text style={style.title}>Connect Ajou</Text>
        </View>

        <Text style={style.subTitle}>About Ajou</Text>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ flexDirection: "row" }}
        >
          <View style={style.preview}>
            <Text style={style.scrollContent}>Hello</Text>
          </View>
          <View style={style.preview}>
            <Text style={style.scrollContent}>Hello</Text>
          </View>
          <View style={style.preview}>
            <Text style={style.scrollContent}>Hello</Text>
          </View>
        </ScrollView>

        <Text style={style.subTitle}>Community</Text>

        <View style={style.community}>
          <View style={style.containerCommunity}>
            <TouchableOpacity style={style.contentWrapper}>
              <Ionicons
                name="chatbubbles"
                size={24}
                style={style.communityIcon}
              />
              <Text style={style.communityContent}>Random Chatting</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.contentWrapper}>
              <MaterialIcons
                name="event"
                size={24}
                style={style.communityIcon}
              />
              <Text style={style.communityContent}>School Events</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.contentWrapper}>
              <FontAwesome5
                name="school"
                size={24}
                style={style.communityIcon}
              />
              <Text style={style.communityContent}>Near Campus</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.contentWrapper}>
              <Ionicons
                name="restaurant"
                size={24}
                style={style.communityIcon}
              />
              <Text style={style.communityContent}>Vege Restaurant</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.contentWrapper}>
              <Ionicons
                name="restaurant-outline"
                size={24}
                style={style.communityIcon}
              />
              <Text style={style.communityContent}>Halal Restaurant</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.contentWrapper}>
              <MaterialIcons
                name="sports-soccer"
                size={24}
                style={style.communityIcon}
              />
              <Text style={style.communityContent}>Sports Mate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.contentWrapper}>
              <MaterialCommunityIcons
                name="party-popper"
                size={24}
                style={style.communityIcon}
              />
              <Text style={style.communityContent}>Finding Party Mates</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.contentWrapper}>
              <FontAwesome5
                name="user-friends"
                size={24}
                style={style.communityIcon}
              />
              <Text style={style.communityContent}>Finding Roommates</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.contentWrapper}>
              <FontAwesome
                name="language"
                size={24}
                style={style.communityIcon}
              />
              <Text style={style.communityContent}>Language Exchange</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.contentWrapper}>
              <Entypo name="pencil" size={24} style={style.communityIcon} />
              <Text style={style.communityContent}>Major Study</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.contentWrapper}>
              <MaterialCommunityIcons
                name="account-search"
                size={24}
                style={style.communityIcon}
              />
              <Text style={style.communityContent}>Other Hobby</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8F8",
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
    marginBottom: 10,
    marginLeft: 30,
  },
  containerCommunity: {
    width: 360,
    borderWidth: 2,
    backgroundColor: "white",
    borderColor: "#D7DDE2",
    borderRadius: 10,
    marginBottom: 30,
  },
  contentWrapper: {
    padding: 10,
    flexDirection: "row",
  },
  scrollContent: {
    padding: 10,
    fontFamily: "IBMPlexSansKR-Light",
    fontSize: 15,
  },
  communityIcon: {
    flex: 1,
    fontSize: 29,
    color: "#2C5E9E",
    textAlign: "center",
  },
  communityContent: {
    flex: 3,
    fontFamily: "IBMPlexSansKR-Light",
    fontSize: 20,
    textAlign: "center",
  },
});

export default HomeTab;
