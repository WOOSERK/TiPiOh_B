import React, {useState, useEffect} from "react";
import {Button, FlatList, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from "firebase";
import Like from "./Like";

export default function Timeline()
{
    const [data, setData] = useState([]);

    const getData = () => {
        let datas = [];
        firebase.firestore().collection("feeds").get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    datas.push(doc.data());
                })

                setData(datas);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            style={styles.scrollView}>
        </FlatList>
    );
}

const like = () =>
{
    firebase.firestore().collection("feeds");
}

const renderItem = ({ item }) =>
{
    const user = firebase.auth().currentUser;

    return (
        <View style={styles.container}>
            <View style={styles.name_row}>
                <View style={styles.left}>
                    <Image style={styles.profile} source={{uri: user.photoURL}}/>
                    <Text style={styles.text}>{item.user}</Text>
                </View>
                <View style={styles.right}>
                    <Icon name="angle-right" size={30} color="black"/>
                </View>
            </View>
            <View style={styles.sector}>
                <Image style={styles.content} resizeMode="contain"
                       source={{uri: item.images[0]}}/>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <Icon name="clock" size={20} color="black"/>
                        <Text style={styles.text}>{item.time}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="location-arrow" size={20} color="black"/>
                        <Text style={styles.text}>{item.place}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="smile" size={20} color="black"/>
                        <Text style={styles.text}>{item.ocassion}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.row}>
                    <Like id={item.id}/>
                    <Text style={styles.text}>{item.like}</Text>
                </View>

                <View style={styles.row}>
                    <Button title="댓글"/>
                    <Text style={styles.text}>124</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: 'darkgrey',
        borderColor: 'darkgrey',
    },
    container: {
        flex: 1,
        height: 500,
        backgroundColor: 'white',
        borderWidth: 10,
        borderColor: 'darkgrey',
        borderRadius: 25
    },
    name_row: {
        height: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    row: {
        height: 30,
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    left: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    right: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    profile: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        borderWidth: 1,
        borderColor: "white"
    },
    text: {
        paddingLeft: 15
    },
    sector: {
        paddingTop: 30
    },
    content: {
        height: 300,
    },
});
