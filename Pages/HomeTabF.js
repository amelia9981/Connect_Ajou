import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Feather,
  AntDesign,
} from "@expo/vector-icons";

class HomeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDay: 0,
      todayCourses: [],
    };
  }

  componentDidMount() {
    let day = new Date().getDay();
    this.setState({
      currentDay: day - 1,
    });

    let temp_array = [];
    for (var row = 0; row < 7; row++) {
      let courseName = this.props.courseName;
      temp_array.push(courseName[row][this.currentDay]);
    }
    if (temp_array.size) {
      this.setState({
        todayCourses: temp_array,
      });
    } else {
      this.setState({
        todayCourses: "Nothing's for Today",
      });
    }
  }

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

        <View style={style.subTitleView}>
          <Text style={style.subTitle}>About Ajou</Text>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ flexDirection: "row" }}
        >
          <ScrollView style={style.preview} nestedScrollEnabled={true}>
            <Text style={style.scrollTitle}>Today's Lunch Menu</Text>
            <Text style={style.scrollContent}>
              <Text style={style.bothNot}>
                해물짬뽕&면사리(hot noodles soup)
              </Text>
              , <Text>쌀밥(white rice)</Text>,{" "}
              <Text style={style.halal}>
                크리미치킨가라아게(chicken karaage)
              </Text>
              , <Text>열무나물무침(young radish)</Text>,{" "}
              <Text>단무지무침(pickled radish)</Text>,{" "}
              <Text>배추김치(Kimchi)</Text>,{" "}
              <Text>샐러드&포도드레싱(salad&grape dressing)</Text>,{" "}
              <Text>수제수정과(cinnamon tea)</Text>
            </Text>
            <Text style={style.category}>
              <Text style={style.vege}>For Vege: Green</Text>,{" "}
              <Text style={style.halal}>For Halal: Orange</Text>,{"\n"}
              <Text>For Both: Black</Text>,{" "}
              <Text style={style.bothNot}>NOT for both: Blue</Text>
            </Text>
          </ScrollView>

          <ScrollView style={style.preview} nestedScrollEnabled={true}>
            <Text style={style.scrollTitle}>Today's Dinner Menu</Text>
            <Text style={style.scrollContent}>
              <Text style={style.halal}>육개장(spicy beef soup)</Text>,{" "}
              <Text>쌀밥(white rice)</Text>,{" "}
              <Text style={style.halal}>새우까스&소스(shrimp cutlet)</Text>,{" "}
              <Text style={style.halal}>메밀막국수(buckwheat noodles)</Text>,
              <Text>땅콩조림(boiled peanuts)</Text>,{" "}
              <Text>배추김치(Kimchi)</Text>,{" "}
              <Text>샐러드&포도드레싱(salad&grape dressing)</Text>,{" "}
              <Text>수제수정과(cinnamon tea)</Text>
            </Text>
            <Text style={style.category}>
              <Text style={style.vege}>For Vege: Green</Text>,{" "}
              <Text style={style.halal}>For Halal: Orange</Text>,{"\n"}
              <Text>For Both: Black</Text>,{" "}
              <Text style={style.bothNot}>NOT for both: Blue</Text>
            </Text>
          </ScrollView>
          <TouchableOpacity
            style={style.preview}
            onPress={() => this.props.navigation.navigate("Timetable")}
          >
            <Text style={style.scrollTitle}>Today's Class</Text>
            <Text style={style.scrollContent}>{this.state.todayCourses}</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={style.subTitleView}>
          <Text style={[style.subTitle, { flex: 5 }]}>Community Favorites</Text>
          <TouchableOpacity style={{ flex: 1 }}>
            <Feather name="plus-square" size={24} />
          </TouchableOpacity>
        </View>

        <View style={style.community}>
          <View style={style.containerCommunity}>
            <TouchableOpacity
              style={style.contentWrapper}
              onPress={() => {
                this.props.navigation.push("ViewList", {
                  name: "Random Chatting",
                });
              }}
            >
              <Ionicons
                name="chatbubbles"
                size={24}
                style={style.communityIcon}
              />
              <Text style={style.communityContent}>Random Chatting</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.contentWrapper}
              onPress={() => {
                this.props.navigation.push("ViewList", {
                  name: "School Events",
                });
              }}
            >
              <MaterialIcons
                name="event"
                size={24}
                style={style.communityIcon}
              />
              <Text style={style.communityContent}>School Events</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.contentWrapper}
              onPress={() => {
                this.props.navigation.push("ViewList", { name: "Near Campus" });
              }}
            >
              <FontAwesome5
                name="school"
                size={24}
                style={style.communityIcon}
              />
              <Text style={style.communityContent}>Near Campus</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.contentWrapper}
              onPress={() => {
                this.props.navigation.push("ViewList", {
                  name: "Vege Restaurant",
                });
              }}
            >
              <Ionicons
                name="restaurant"
                size={24}
                style={style.communityIcon}
              />
              <Text style={style.communityContent}>Vege Restaurant</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.contentWrapper}
              onPress={() => {
                this.props.navigation.push("ViewList", {
                  name: "Finding Party Mates",
                });
              }}
            >
              <MaterialCommunityIcons
                name="party-popper"
                size={24}
                style={style.communityIcon}
              />
              <Text style={style.communityContent}>Finding Party Mates</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.contentWrapper}
              onPress={() => {
                this.props.navigation.push("ViewList", {
                  name: "Finding Roommates",
                });
              }}
            >
              <FontAwesome5
                name="user-friends"
                size={24}
                style={style.communityIcon}
              />
              <Text style={style.communityContent}>Finding Roommates</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.contentWrapper}
              onPress={() => {
                this.props.navigation.push("ViewList", {
                  name: "Language Exchange",
                });
              }}
            >
              <FontAwesome
                name="language"
                size={24}
                style={style.communityIcon}
              />
              <Text style={style.communityContent}>Language Exchange</Text>
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
    marginTop: 45,
    marginLeft: 10,
    fontSize: 25,
  },
  subTitleView: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    flexDirection: "row",
  },
  subTitle: {
    fontFamily: "EBS훈민정음새론R",
    fontSize: 20,
  },
  community: {
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    width: 280,
    height: 220,
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
  scrollTitle: {
    padding: 10,
    fontFamily: "IBM-SB",
    fontSize: 15,
    color: "#2C5E9E",
  },
  scrollContent: {
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: "IBMPlexSansKR-Light",
    fontSize: 13,
  },
  category: {
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: "IBMPlexSansKR-Regular",
    fontSize: 13,
    backgroundColor: "rgba(215, 221, 226, 0.5)",
    borderRadius: 5,
  },
  vege: {
    color: "#008000",
  },
  halal: {
    color: "#FFA500",
  },
  bothNot: {
    color: "#5995DD",
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
