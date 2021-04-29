import React, { Component, useState } from 'react';
import { ScrollView, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { CardItem, Card, Left } from 'native-base';
import { Feather, MaterialCommunityIcons} from '@expo/vector-icons';

//댓글 쓰기 => ID
//댓글 보기
//댓글 추가하기
//하트 누르기 
//DB => 글제목, 내용, 댓글 아이디, 하트 수, 글쓴사람 ID, 커뮤니티 제목

const seeWriting = ({ navigation, route }) => {
    const [comments,setComments]= useState([])
    const [like, setLike] = useState("")


    navigation.setOptions({
        headerTitle:null,
        headerRightContainerStyle: {
            marginRight: '3%',
            padding: '1%'
        },
        headerRight: () => (
            //메세지 보내기 페이지로 이동
            <TouchableOpacity>
                <Feather name='message-square' size={25} />
            </TouchableOpacity>
        ),
    });

    return (
        <ScrollView style={style.container}>
            <Card style={style.box} >
                <CardItem>
                <Text style={style.title}> TITLE </Text>
                </CardItem>
                <CardItem cardBody>
                    <Text style={style.content}> blablablabla </Text>
                </CardItem>
                <CardItem>
                    <Left>
                        <Feather name='heart' />
                    </Left>
                </CardItem>
            </Card>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F8F8",
    },
    header: {
        backgroundColor: 'white',
    },
    headerTitle: {
        fontFamily: 'EBS훈민정음새론SB',
        marginTop: 15,
        fontSize: 20,
        alignContent: "flex-start",

    },
    box: {
        backgroundColor: "#FFFFFF",
        borderColor: "#D7DDE2",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: "0.5%",
        padding: "1%",
    },
    title: {
        flex: 1,
        fontFamily: "IBM-SB",
        fontSize: 15,
        color: "#3D3D3D",
    },
    headerButtonL: {
        backgroundColor: 'white',
        marginLeft: '5%',
    },
    headerButtonR: {
        backgroundColor: 'white',
        marginRight: '5%',
    },
    content: {
        flex: 2,
        paddingTop: "3%",
        fontFamily: "IBMPlexSansKR-Regular",
        fontSize: 13,
        color: "#3D3D3D",
    },
});
export default seeWriting;