import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ProfilePicture from "react-native-profile-picture";
import UserPermissions from "../Utilities/UserPermissions";
import * as ImagePicker from "expo-image-picker";

class UserTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Feather name="user" size={24} style={{ color: tintColor }} />
    ),
  };

  state = {
    name: "Jeanine Han",
    id: "namu1092",
    email: "namu1092@ajou.ac.kr",
    isPicture: false,
    url: "",
  };

  pickGalleryImage = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({
        isPicture: true,
        url: result.uri,
      });
    }

    console.log(this.state.isPicture);
    console.log(this.state.url);
  };

  render() {
    return (
      <ScrollView contentContainerStyle={style.container}>
        <Text style={style.my_page}>My Page</Text>

        <View style={style.profile_photo}>
          <ProfilePicture
            style={{ resizeMode: "contain" }}
            width={125}
            height={125}
            backgroundColor={"#1E3D6B"}
            isPicture={this.state.isPicture}
            user={this.state.name}
            URLPicture={this.state.url}
          />
        </View>

        <TouchableOpacity
          activeOpacity={1}
          style={style.camera}
          onPress={this.pickGalleryImage}
        >
          <Image source={require("../assets/camera.png")} style={style.image} />
        </TouchableOpacity>

        <View style={style.box_1}>
          <View style={{ flex: 1 }}>
            <Text style={style.box_label}>Name</Text>
            <Text style={style.box_label}>ID</Text>
            <Text style={style.box_label}>Email</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={style.box_data}>{this.state.name}</Text>
            <Text style={style.box_data}>{this.state.id}</Text>
            <Text style={style.box_data}>{this.state.email}</Text>
          </View>
        </View>

        <View style={style.box_2}>
          <Text style={style.box_title}>Account</Text>
          <TouchableOpacity style={style.box_content_wrapper}>
            <Text style={style.box_content}>Change password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.box_content_wrapper}>
            <Text style={style.box_content}>Change name</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.box_content_wrapper}>
            <Text style={style.box_content}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={style.box_3}>
          <Text style={style.box_title}>Configure</Text>
          <TouchableOpacity style={style.box_content_wrapper}>
            <Text style={style.box_content}>Notification settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.box_content_wrapper}>
            <Text style={style.box_content}>Language</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F8F8",
  },
  my_page: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(30, 61, 107, 1)",
    fontSize: 30,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "IBMPlexSansKR-Regular",
    top: "10%",
  },
  profile_photo: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(215, 221, 226, 1)",
    borderWidth: 1,
    borderRadius: 65,
    width: 130,
    height: 130,
    top: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(215, 221, 226, 1)",
    borderWidth: 1,
    borderRadius: 20,
    width: 40,
    height: 40,
    top: "32%",
    left: "55%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    position: "absolute",
    width: "70%",
    height: "70%",
    resizeMode: "contain",
    tintColor: "#1E3D6B",
  },
  box_1: {
    position: "absolute",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "3%",
    paddingBottom: "3%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(215, 221, 226, 1)",
    borderWidth: 1,
    borderRadius: 10,
    width: "95%",
    height: "12%",
    top: "42%",
    flexDirection: "row",
  },
  box_2: {
    position: "absolute",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "3%",
    paddingBottom: "3%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(215, 221, 226, 1)",
    borderWidth: 1,
    borderRadius: 10,
    width: "95%",
    height: "17%",
    top: "57%",
  },
  box_3: {
    position: "absolute",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "3%",
    paddingBottom: "3%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(215, 221, 226, 1)",
    borderWidth: 1,
    borderRadius: 10,
    width: "95%",
    height: "14%",
    top: "77%",
  },
  box_label: {
    flex: 1,
    color: "#2C5E9E",
    fontFamily: "IBMPlexSansKR-Regular",
    fontSize: 15,
  },
  box_data: {
    flex: 1,
    fontFamily: "IBMPlexSansKR-Light",
    fontSize: 13,
    textAlign: "right",
  },
  box_title: {
    flex: 1,
    color: "#2C5E9E",
    fontFamily: "IBMPlexSansKR-Regular",
    fontSize: 15,
  },
  box_content_wrapper: {
    flex: 1,
  },
  box_content: {
    fontFamily: "IBMPlexSansKR-Light",
    fontSize: 13,
  },
});

export default UserTab;
