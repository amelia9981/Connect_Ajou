import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { firebase } from "../../Utilities/Firebase";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

function AddFavorites(props) {
  const [user, setUser] = useState(props.extraData);
  const navigation = useNavigation();
  const [allItems, setAllItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsArray, setSelectedItemsArray] = useState([]);
  const [isReRendering, setReRendering] = useState(0);

  useEffect(() => {
    const curUserEmail = firebase.auth().currentUser.providerData[0].email;
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(curUserEmail)
      .onSnapshot((snapshot) => {
        const getUser = snapshot.data();
        setUser(getUser);
      });

    const getSelectedItems = firebase
      .firestore()
      .collection("favorites")
      .doc(user.email)
      .collection("selectedItems")
      .onSnapshot((querySnapshot) => {
        const selectedItems = querySnapshot.docs.map((docSnapshot) => {
          const selectedItem = {
            _id: docSnapshot.id,
            ...docSnapshot.data(),
          };
          return selectedItem;
        });
        setSelectedItems(selectedItems);
        setReRendering(isReRendering + 1);
      });

    const getSelectedItemsArray = firebase
      .firestore()
      .collection("favorites")
      .doc(user.email)
      .onSnapshot((docSnapshot) => {
        setSelectedItemsArray(docSnapshot.data().selectedItemsArray);
      });

    const getAllItems = firebase
      .firestore()
      .collection("favorites")
      .doc(user.email)
      .collection("all")
      .onSnapshot((querySnapshot) => {
        const allItems = querySnapshot.docs.map((docSnapshot) => {
          const item = {
            _id: docSnapshot.id,
            ...docSnapshot.data(),
          };
          return item;
        });
        setAllItems(allItems);
      });

    return () => {
      unsubscribe();
      getSelectedItems();
      getSelectedItemsArray();
      getAllItems();
    };
  }, []);

  const pick = (community) => {
    let tempSelectedItems = selectedItemsArray;
    const index = tempSelectedItems.indexOf(community._id);
    if (index > -1) {
      tempSelectedItems.splice(index, 1);
    } else {
      tempSelectedItems.push(community._id);
    }
    setSelectedItemsArray(tempSelectedItems);
    setReRendering(isReRendering + 1);
  };

  const submit = () => {
    const selectedItemsRef = firebase
      .firestore()
      .collection("favorites")
      .doc(user.email)
      .collection("selectedItems");

    selectedItemsArray.forEach((item) => {
      selectedItemsRef
        .doc(item)
        .set(
          {
            createdAt: new Date().getTime(),
          },
          { merge: true }
        )
        .catch(function (error) {
          console.error("Error: ", error);
        });
    });

    firebase
      .firestore()
      .collection("favorites")
      .doc(user.email)
      .set(
        {
          selectedItemsArray: selectedItemsArray,
        },
        { merge: true }
      )
      .catch(function (error) {
        console.error("Error: ", error);
      });

    navigation.replace("HomeTabMain");
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={style.contentWrapper} onPress={() => pick(item)}>
        {selectedItemsArray.includes(item._id) ? (
          <MaterialIcons
            name="check-box"
            size={24}
            color="black"
            style={style.communityIcon}
          />
        ) : (
          <MaterialIcons
            name="check-box-outline-blank"
            size={24}
            color="black"
            style={style.communityIcon}
          />
        )}
        <Text style={style.communityContent}>{item._id}</Text>
      </TouchableOpacity>
    );
  };

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
          source={require("../../assets/logo_icon.png")}
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
        <Text style={[style.subTitle, { flex: 5 }]}>
          Add Favorite Communities
        </Text>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => navigation.replace("HomeTabMain")}
        >
          <Feather name="minus-square" size={24} />
        </TouchableOpacity>
      </View>

      <View style={style.community}>
        <View style={style.containerCommunity}>
          <FlatList
            data={allItems}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={style.list}
          />
        </View>
      </View>
      <View style={style.buttonContainer}>
        <View style={style.button}>
          <TouchableOpacity onPress={() => submit()}>
            <Text style={style.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
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
  list: {
    paddingVertical: "5%",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  button: {
    fontFamily: "IBMPlexSansKR-Regular",
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
    width: 140,
    height: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    justifyContent: "center",
    color: "#FFFFFF",
    fontSize: 17,
  },
});

export default AddFavorites;
