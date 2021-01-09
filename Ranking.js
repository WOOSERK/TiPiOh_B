import React from "react";
import {StyleSheet, Text, View, Image, ScrollView, Button} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';


export default function Ranking({ navigation } ){
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.name_row}>
                    <View style={styles.left}>
                        <Image style={styles.profile} />
                        <Text style={styles.text}>syeokim</Text>
                    </View>
                    <View style={styles.right}>
                        <Icon name="angle-right" size={30} color="black" />
                    </View>
                </View>
                <View style={styles.sector}>
                    <Image style={styles.content}  resizeMode="contain" source={{uri: "https://www.naenampum.com/web/product/big/20200204/3f61540df69e141177705e2789179d62.gif"}}/>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Icon name="clock" size={20} color="black" />
                            <Text style={styles.text}>2시간 전</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name="location-arrow" size={20} color="black" />
                            <Text style={styles.text}>숭실대</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name="smile" size={20} color="black" />
                            <Text style={styles.text}>몰라</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <Button title="좋아요"/>
                        <Text style={styles.text}>23384</Text>
                    </View>
                    <View style={styles.row}>
                        <Button title="댓글"/>
                        <Text style={styles.text}>124</Text>
                    </View>
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.name_row}>
                    <View style={styles.left}>
                        <Image style={styles.profile} />
                        <Text style={styles.text}>syeokim</Text>
                    </View>
                    <View style={styles.right}>
                        <Icon name="angle-right" size={30} color="black" />
                    </View>
                </View>
                <View style={styles.sector}>
                    <Image style={styles.content}  resizeMode="contain" source={{uri: "https://www.naenampum.com/web/product/big/20200204/3f61540df69e141177705e2789179d62.gif"}}/>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Icon name="clock" size={20} color="black" />
                            <Text style={styles.text}>2시간 전</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name="location-arrow" size={20} color="black" />
                            <Text style={styles.text}>숭실대</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name="smile" size={20} color="black" />
                            <Text style={styles.text}>몰라</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <Button title="좋아요"/>
                        <Text style={styles.text}>23384</Text>
                    </View>
                    <View style={styles.row}>
                        <Button title="댓글"/>
                        <Text style={styles.text}>124</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex : 1,
        backgroundColor: 'white',
    },
    container: {
        flex : 1,
        height: 700,
        backgroundColor: 'darkgrey',
    },
    name_row: {
        height: 30,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        paddingTop : 20,
        paddingLeft : 10,
        paddingRight : 10
    },
    row: {
        height: 30,
        marginTop: 15,
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems : "center",
    },
    left: {
        flex : 1,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "flex-start",
    },
    right: {
        flex : 1,
        alignItems : "flex-end",
        justifyContent : "center",
    },
    profile: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        borderWidth: 1,
        borderColor: "white"
    },
    text: {
        paddingLeft : 15
    },
    sector: {
        paddingTop : 30
    },
    content: {
        height: 500,
    },


});

