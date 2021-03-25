import React from "react";
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Button, KeyboardAvoidingView} from "react-native";
import firebase from "firebase";
import 'firebase/firestore';
import FirebaseError from "../FirebaseError";
import Icon from "react-native-vector-icons/FontAwesome";

export default class RegisterEmail extends React.Component{
    state = { email: '', password: '', passwordConfirm: '', errorMessage: null }

    handleSignUp = () => {
        firebase
            .auth()
            .fetchSignInMethodsForEmail(this.state.email)
            .then((providers) =>
            {
                // 중복되지 않은 이메일
                if(providers.length == 0)
                {
                    if(this.state.password == '')
                        this.setState({errorMessage: "비밀번호를 확인해주세요."})
                    else if(this.state.password.length < 6)
                        this.setState({errorMessage: "비밀번호는 6자리 이상이어야 합니다."})
                    else if(this.state.password != this.state.passwordConfirm)
                        this.setState({errorMessage: "비밀번호와 비밀번호 확인이 일치하지 않습니다."})
                    else
                        this.props.navigation.navigate("RegisterProfile",
                            {
                                email: this.state.email,
                                password: this.state.password
                            })
                }
                else
                    this.setState({ errorMessage: "이미 존재하는 이메일입니다."});
            })
            .catch(error => this.setState({ errorMessage: FirebaseError(error.code) }))
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Email Address</Text>
                <TextInput
                    style={styles.loginInfo}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <Text style={styles.text}>Password</Text>
                <TextInput
                    secureTextEntry
                    style={styles.loginTopBox}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <TextInput
                    secureTextEntry
                    style={styles.loginBottomBox}
                    autoCapitalize="none"
                    placeholder="Password Confirm"
                    onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
                    value={this.state.passwordConfirm}
                />
                {this.state.errorMessage &&
                <Text style={
                    { color: 'red' }
                }>
                    {this.state.errorMessage}
                </Text>}
                <TouchableOpacity
                    onPress={this.handleSignUp}
                    style={styles.nextButton}
                >
                    <Icon name={"chevron-right"}
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
    loginInfo: {
        height: 40,
        width: "80%",
        backgroundColor: "#cccccc",
        textAlign: "center",
        borderRadius: 7,
        marginTop: 30
    },
    loginTopBox: {
        height: 40,
        width: "80%",
        backgroundColor: "#cccccc",
        textAlign: "center",
        borderBottomWidth: 0.5,
        borderColor : "grey",
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
        marginTop: 30
    },
    loginBottomBox: {
        height: 40,
        width: "80%",
        backgroundColor: "#cccccc",
        textAlign: "center",
        borderTopWidth: 0.5,
        borderColor : "grey",
        borderBottomLeftRadius : 10,
        borderBottomRightRadius : 10
    },
    button: {
        width: "80%",
        marginTop : 30
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
