import React from "react";
import {StyleSheet, Text, View, Button} from "react-native";

export default function Profile(){
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.circle}></View>
                <Text style={styles.nameText}>syeokim</Text>
                <Text style={styles.idText}>@syeokim/MEN</Text>
                <View style={styles.button}>
                    <Button title="Edit Profile"/>
                </View>
            </View>
            <View style={styles.bottom}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      height: "90%",
      backgroundColor: 'white',
    },
    top: {
      height: "50%",
      backgroundColor : "grey",
      alignItems: "center"
    },
    bottom: {
      height: "50%",
      backgroundColor : "white",
    },
    circle: {
      width: 150,
      height: 150,
      backgroundColor : "white",
      marginTop: 40,
      borderRadius: 75,
      borderWidth: 5,
      borderColor: "darkgrey"
    },
    nameText: {
      color: "white",
      fontSize: 15,
      marginTop: 10
    },
    idText: {
      color: "white",
      fontSize: 12,
      marginTop: 10
    },
    button: {
      marginTop: 10
    }
  });
  