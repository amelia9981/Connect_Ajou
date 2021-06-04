import React, { Component, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, SectionList, TouchableOpacity, Alert } from 'react-native';

const DATA = [
    {
        title: "Get Info",
        data: ["Official Announcement", "About Course", "Campus", "Random Question"]
    },
    {
        title: 'School Life',
        data: ["Random Chatting", "School Events", "Near Campus", "Vege Restaurant", "Halal Restaurant"]
    },
    {
        title: 'Find Friend Group',
        data: ["Sports mate", "Finding Party Mates", "Finding Roommates", "Language Exchange", "Major Study", "Other Hobby"]
    },
];
const Item = ({ title, navigation}) => (
    <TouchableOpacity style={styles.itemView} onPress={() => {
        navigation.push("ViewList", {name: title })
    }} >
        <Text style={styles.itemView}>{title}</Text>
    </TouchableOpacity>
);
const Title = ({ title }) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
    </View>
);
const ShowAll = ({ navigation }) => (
    <SafeAreaView style={styles.container}>
        <SectionList
            sections={DATA}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <Item title={item} navigation={navigation} />}
            renderSectionHeader={({ section: { title } }) => (
                <Title title={title} />
            )}
        />
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F8F8",
    },
    sectionHeader: {
        padding: "1.5%",
        backgroundColor: "#5995DD",
    },
    sectionTitle: {
        padding: "1.5%",
        backgroundColor: "#5995DD",
        marginLeft: "5%",
        flex: 1,
        fontFamily: "Mono-SB",
        fontSize: 20,
        color: "white",
    },
    itemView: {
        marginLeft: "5%",
        padding: '1.5%',
        flex: 1,
        flexDirection: 'row',
        fontFamily: "IBMPlexSansKR-Regular",
        fontSize: 15,
        color: "#3D3D3D",
    },
});

export default ShowAll;