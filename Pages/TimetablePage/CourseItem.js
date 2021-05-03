import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { firebase } from "../../Utilities/Firebase";

function CourseItem(props) {
  const [name, setName] = useState("");
  const [prof, setProf] = useState("");
  const [schedule, setSchedule] = useState("");
  const [credits, setCredits] = useState(0);
  const [code, setCode] = useState("");

  useEffect(() => {
    const coursesRef = firebase.firestore().collection("courses");
    coursesRef
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let docs = doc.data();

            for (let item in docs) {
              console.log("key :" + item);
              console.log("value :" + docs[item]);
            }

            setName(docs.name);
            setProf(docs.prof);
            setSchedule(docs.schedule);
            setCredits(docs.credits);
            setCode(docs.code);
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => Alert.alert("Click!")}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.prof}>{prof}</Text>
        <Text style={styles.schedule}>{schedule}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.credits}>{credits} credits</Text>
          <Text style={styles.code}>{code}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontFamily: "IBMPlexSansKR-Regular",
  },
  prof: {
    fontSize: 13,
    fontFamily: "IBMPlexSansKR-Light",
  },
  schedule: {
    marginTop: 10,
    fontSize: 13,
    fontFamily: "IBMPlexSansKR-Light",
  },
  credits: {
    fontSize: 13,
    fontFamily: "IBMPlexSansKR-Light",
  },
  code: {
    marginLeft: 5,
    fontSize: 13,
    fontFamily: "IBMPlexSansKR-Light",
  },
});

export default CourseItem;
