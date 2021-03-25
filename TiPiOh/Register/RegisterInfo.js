import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Picker} from "@react-native-community/picker"
import Slider from "@react-native-community/slider";
import firebase from "firebase";
import FirebaseError from "../FirebaseError";
import Icon from "react-native-vector-icons/FontAwesome";

export default class RegisterInfo extends React.Component{
    state = { nickname: this.props.route.params.nickname, gender: '', age: '', height: 130, body: '', errorMessage: null}

    handleInfo = () => {
        const {nickname, gender, age, height, body} = this.state;
        firebase
            .firestore()
            .collection('users')
            .doc(nickname)
            .update({gender: gender, age: age, height: height, body: body})
            .then(() =>
            {
                if(gender == '')
                    this.setState({errorMessage: "성별을 입력해주세요."})
                else if(age == '')
                    this.setState({errorMessage: "나이를 입력해주세요."})
                else if(body == '')
                    this.setState({errorMessage: "체형을 입력해주세요."})
                else
                    this.props.navigation.navigate("Login")
            })
            .catch(error => this.setState({ errorMessage: FirebaseError(error.code) }))
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Gender</Text>
                <Picker
                    selectedValue={this.state.gender}
                    style={{height: 50, width: 100}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({gender: itemValue})
                    }
                    mode='dropdown'
                    dropdownIconColor="#87CEEB">
                    <Picker.Item label="-" value="" />
                    <Picker.Item label="남성" value="남성" />
                    <Picker.Item label="여성" value="여성" />
                    <Picker.Item label="그외" value="그외" />
                </Picker>
                <Text style={styles.text}>Age</Text>
                <Picker
                    selectedValue={this.state.age}
                    style={{height: 50, width: 140}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({age: itemValue})
                    }
                    mode='dropdown'
                    dropdownIconColor="#87CEEB">
                    <Picker.Item label="-" value="" />
                    <Picker.Item label="19세 이하" value="19" />
                    <Picker.Item label="20 - 24" value="20" />
                    <Picker.Item label="25 - 29" value="25" />
                    <Picker.Item label="30 - 34" value="30" />
                    <Picker.Item label="35 - 39" value="35" />
                    <Picker.Item label="40세 이상" value="40" />
                </Picker>
                <Text style={styles.text}>Height</Text>
                <Slider
                    style={{height:50, width:140}}
                    value={this.state.height}
                    minimumValue={130}
                    maximumValue={230}
                    onValueChange={height => this.setState({height})}
                    maximumTrackTintColor='black'
                    minimumTrackTintColor='#87CEEB'
                    step={1}
                />
                <Text
                    style={styles.heightText}>
                    {this.state.height}
                </Text>
                <Text style={styles.text}>Body Style</Text>
                <Picker
                    selectedValue={this.state.body}
                    style={{height: 50, width: 100}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({body: itemValue})
                    }
                    mode='dropdown'
                    dropdownIconColor="#87CEEB">
                    <Picker.Item label="-" value="" />
                    <Picker.Item label="마름" value="마름" />
                    <Picker.Item label="보통" value="보통" />
                    <Picker.Item label="건장" value="건장" />
                </Picker>

                {this.state.errorMessage &&
                <Text style={
                    { color: 'red' }
                }>
                    {this.state.errorMessage}
                </Text>}

                <TouchableOpacity
                    onPress={this.handleInfo}
                    style={styles.nextButton}
                >
                    <Icon name={"check"}
                          size={20}
                          color="#fff" />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems: "center",
        backgroundColor: "white"
    },
    text: {
        fontSize: 30,
        marginTop: 40,
        fontWeight: "700"
    },
    heightText: {
        fontSize: 20,
        fontWeight: "700"
    },
    nextButton: {
        borderWidth:1,
        marginTop: 50,
        position: 'absolute',
        right: 50,
        bottom: 50,
        borderColor:'skyblue',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor: 'skyblue',
        borderRadius:100,
    }
});
