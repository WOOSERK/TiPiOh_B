import React from 'react';
import {Button, StyleSheet, Image, Text, TextInput, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';


export default function Login({ navigation }) {
    return (
        <View style={styles.box}>
            <Image style={styles.logo}
                   source={{uri:'https://previews.123rf.com/images/dervish37/dervish371405/dervish37140500040/28401203-%EC%8B%A0%EC%82%AC%EC%9D%98-%EC%95%84%EC%9D%B4%EC%BD%98.jpg'}}>
            </Image>
            <View style={styles.symbol}>
                <Text style={styles.symbolText}>
                    TiPiOh
                </Text>
            </View>
            <TextInput
                style={styles.loginInfo}
                placeholder="아이디"></TextInput>
            <TextInput
                secureTextEntry={true}
                style={styles.loginInfo}
                placeholder="비밀번호"
            ></TextInput>

            <View style={styles.loginInfo}>
                <Button
                    title="로그인"
                    color="gray"
                    onPress={() => navigation.dispatch(resetAction)}
                >
                </Button>
            </View>

            <View style={styles.register}>
                <Text style={styles.registerText}>
                    아이디/비밀번호 찾기
                </Text>
                <Text style={styles.registerText}>
                    회원가입
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    symbol: {
        color: "red",
        fontSize: 50
    },
    logo: {
        width: "40%",
        height: "40%"
    },
    symbolText: {
        fontFamily: 'DancingScript',
        fontSize: 50,
        marginBottom: 40
    },
    box: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loginInfo: {
        height: "5%",
        width: "80%",
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "#cccccc",
        textAlign: "center",
        marginBottom: 2,
        borderRadius: 100
    },
    register: {
        alignItems: "center",
        textAlign: "center",
    },
    registerText: {
        marginTop: 12
    }
});

const resetAction = CommonActions.reset({
    index: 1,
    routes: [
        { name: 'Tab' },
    ],
});