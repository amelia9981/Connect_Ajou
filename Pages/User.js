import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,Modal,TextInput
} from "react-native";
import ProfilePicture from "react-native-profile-picture";
import UserPermissions from "../Utilities/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../Utilities/Firebase";
import * as Update from "expo-updates";
import { Container, Input } from "native-base";
import { Button } from "react-native-elements/dist/buttons/Button";

function UserTab(props) {
  const user = props.extraData;
  const [picture, setPicture] = useState(user.picture);
  const [url, setUrl] = useState(user.url);
  const [isReRendering, setReRendering] = useState(0);
  const usersRef = firebase.firestore().collection("users").doc(user.email);
  const [modalOpen, setModalOpen] = useState(false);
  const [newname, setNewName] = useState();
  useEffect(() => {
    usersRef.get().then((doc) => {
      const getuser = doc.data();
      if (getuser.picture) {
        setPicture(true);
        const storageRef = firebase.storage().ref(`${user.email}`);
        storageRef
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      }
    });
  }, []);

  const pickGalleryImage = async () => {
    UserPermissions.getCameraPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled && result.uri) {
      uploadImageToStorage(result.uri, user.email);
      setPicture(true);
      setUrl(result.uri);

      usersRef
        .set({ picture: true, url: result.uri }, { merge: true })
        .then(() => {
          console.log("Document successfully updated!");
          setReRendering(isReRendering + 1);
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }
  };

  const uploadImageToStorage = async (path, imageName) => {
    const response = await fetch(path);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(imageName);
    return ref.put(blob);
  };
  const setNameAno =() =>{
    Alert.alert(
      "Do you want to set your name as Anonymous?",
      "",
      [
        {
          text:"No",
          onPress:() =>console.log("NO"),
        },
        {//input 받아야하는데??hmmm
          text:"Yes",
          onPress:()=>{
            usersRef.update({
              fullName:"Anonymous",
              picture:false,
              url:""
            })
            .then(() => {
              setReRendering(isReRendering + 1);
            })
          }
        }
      ]
    )
  }
  //modal
  const setNameFull = () => {
    Alert.alert(
      "Are you sure to change your name?",
      "",
      [
        {
          text: "No",
          onPress: () => console.log("No"),
        },
        {
          text: "Yes",
          onPress: () => {
            firebase.firestore().collection('users').doc(user.email)
            .update(
              {
                fullName: newname
              }
            )
            setModalOpen(false);
          },
        },
      ]
    );
  }

  const setProfileImgToDefault = () => {
    Alert.alert(
      "Do you want to set your profile photo to the default one?",
      "",
      [
        {
          text: "No",
          onPress: () => console.log("No"),
        },
        {
          text: "Yes",
          onPress: () => {
            console.log("Yes");
            setPicture(false);
            setUrl("");
            const storageRef = firebase.storage().ref(`${user.email}`);
            storageRef
              .delete()
              .then(() => {
                console.log("Your profile has been reset");
              })
              .catch((error) => {
                console.error("Error updating document: ", error);
              });

            usersRef
              .set({ picture: false, url: "" }, { merge: true })
              .then(() => {
                console.log("Document successfully updated!");
                setReRendering(isReRendering + 1);
              })
              .catch((error) => {
                console.error("Error updating document: ", error);
              });
          },
        },
      ]
    );
  };

  const signOut = () => {
    Alert.alert("Do you want to sign out?", "", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          var user = firebase.auth().currentUser;

          if (user) {
            console.log(user);
          } else {
            // No user is signed in.
          }

          firebase
            .auth()
            .signOut()
            .then(() => {
              console.log("Sign-out successful");
              Update.reloadAsync();
            })
            .catch((error) => {
              console.log("Error: ", error);
            });
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={style.container}>
      <Modal visible={modalOpen} animationType="slide" transparent={true}>
        <View style={{ borderColor: "#5995DD", borderRadius:10,borderWidth:1,margin: 50, marginTop:100,backgroundColor: "#F6F8F8", padding: 20,alignContent:'center' ,justifyContent: 'center'}}>
          <Text>Type Your Name</Text>
          <TextInput style={style.input}
            placeholder="Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setNewName(text)}
            value={newname}
            autoCapitalize="none"/>
          <View style={{flexDirection:'row',width:'100%',height:50,justifyContent:'center',alignContent:'center',marginTop:8}}>
            <View style={style.button_register}>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <Text style={style.button_text}>Close</Text>
              </TouchableOpacity>
            </View>
            <View style={style.button_login}>
              <TouchableOpacity onPress={() => setNameFull()}>
                <Text style={style.button_text}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
      </Modal>
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
        <TouchableOpacity style={style.box_content_wrapper} onPress={() => setModalOpen(true)}>
          <Text style={style.box_content}>Change Name to your own name</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.box_content_wrapper}
        onPress={()=>setNameAno()}>
          <Text style={style.box_content}>Change Name to Anonymous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.box_content_wrapper}
          onPress={() => setProfileImgToDefault()}
        >
          <Text style={style.box_content}>
            Change into the default profile photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.box_content_wrapper}
          onPress={() => signOut()}
        >
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
    height: "19%",
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
    top: "79%",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
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
    paddingTop: 5,
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
    marginTop:5,
    fontSize: 25,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "center",
    width: 100,
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
    marginTop: 5,
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
    width: 100,
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

export default UserTab;
