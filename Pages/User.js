import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import ProfilePicture from "react-native-profile-picture";
import UserPermissions from "../Utilities/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../Utilities/Firebase";

function UserTab(props) {
  const [picture, setPicture] = useState(false);
  const [url, setUrl] = useState("");
  const user = props.extraData;
  const usersRef = firebase.firestore().collection("users").doc(user.email);

  usersRef.get().then((doc) => {
    const getuser = doc.data();
    if (getuser.picture) {
      setPicture(true);
      setUrl(getuser.url);
    }
  });

  const pickGalleryImage = async () => {
    UserPermissions.getCameraPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      setPicture(true);
      setUrl(result.uri);
      //console.log(picture)
      //console.log(url)
      usersRef
        .update({ picture: picture, url: url })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={style.container}>
      <Text style={style.my_page}>My Page</Text>

      <View style={style.profile_photo}>
        <ProfilePicture
          style={{ resizeMode: "contain" }}
          width={125}
          height={125}
          backgroundColor={"#2c5e9e"}
          isPicture={picture}
          user={user.fullName}
          URLPicture={url}
        />
      </View>

      <TouchableOpacity
        activeOpacity={1}
        style={style.camera}
        onPress={pickGalleryImage}
      >
        <Image source={require("../assets/camera.png")} style={style.image} />
      </TouchableOpacity>

      <View style={style.box_1}>
        <View style={{ flex: 1 }}>
          <Text style={style.box_label}>Name</Text>
          <Text style={style.box_label}>Email</Text>
        </View>
        <View style={{ flex: 3 }}>
          <Text style={style.box_data}>{user.fullName}</Text>
          <Text style={style.box_data}>{user.email}</Text>
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
    fontFamily: "IBM-SB",
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
    paddingTop: "4%",
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
    fontSize: 14,
  },
  box_data: {
    flex: 1,
    fontFamily: "IBMPlexSansKR-Light",
    fontSize: 14,
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
