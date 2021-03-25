import React from "react";
import {Text, StyleSheet, View, SectionList, TouchableOpacity, Alert} from "react-native";
import * as firebase from "firebase";

export default class EditProfileMenu extends React.Component
{
    state = {
        data:
            [
                {name: "로그아웃", func: this.handleSignOut}
            ]
    }

    render()
    {
        return (
            <View style={styles.container}>
                <SectionList sections={[
                    {title: '테스트1', data: this.state.data}]}
                             renderItem={this.renderItem}
                             renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                             keyExtractor={(item, index) => index}
                >
                </SectionList>
            </View>
        );
    }

    renderItem = ({item}) => {
        return(
            <TouchableOpacity onPress={() => alert(item.func)}>
                <Text style={styles.item}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    handleSignOut = () =>
    {
        Alert.alert(
            "로그아웃",
            "정말 로그아웃하시겠습니까?",
            [
                {
                    text: "네",
                    onPress: () => firebase.auth().signOut()
                },
                {
                    text: "아니오",
                    style: "cancel"
                }
            ]
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
    },
    sectionHeader: {
        marginLeft: 5,
        height: 40,
        lineHeight: 40,
        fontSize: 25,
        color: '#999999',
        backgroundColor: '#DEDEDE'
    },
    item: {
        marginLeft: 5,
        fontSize: 15,
        height: 40,
        lineHeight: 40,
        borderBottomWidth: 1,
        borderColor: '#dee2e6',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
