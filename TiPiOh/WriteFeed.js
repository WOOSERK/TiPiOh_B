import React from "react";
import {StyleSheet, TextInput, View, TouchableOpacity, Image, ImageBackground} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker';
import Swiper from 'react-native-swiper';
import firebase from "firebase";
import { faRuler } from "@fortawesome/free-solid-svg-icons";

const maxPicture = 3;

export default class RegisterInfo extends React.Component{
    state = { title: '', time: '', place: '', ocassion: '', image: []};

    componentDidMount(){
        async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('카메라 접근을 허용해주세요!');
            }
        };
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            if(this.state.image.length >= maxPicture){
                alert('사진은 최대 3장까지만 가능합니다!');
            }
            else{
                if(this.state.image.length === 0){
                    let data = {
                        key: 0,
                        uri: result.uri,
                    }
                    this.setState({
                        image: [data]
                    });
                }
                else{
                    let data = {
                        key: this.state.image[this.state.image.length-1].key+1,
                        uri: result.uri,
                    }
                    this.setState({
                        image: [...this.state.image, data]
                    });
                }

            }
        }
    };

    handleRemovePicture(key) {
        let result = this.state.image.filter( (data) => data.key !== key );

        this.setState({
            image: result,
        });
    }

    handleSubmit(){
        const user = firebase.auth().currentUser,
            date = new Date(),
            id = date.getTime().toString();
        let images = [];

        this.state.image.forEach(async (data, index) => {
            let response = await fetch(data.uri);
            let blob = await response.blob();
            await firebase.storage().ref().child('feeds/' + id + '/' + index).put(blob)
            .then(snap => {
                return snap.ref.getDownloadURL()
            })
            .then(downloadURL => {
                images.push(downloadURL);
            })
            .catch(error => {
                alert(`An error occurred while uploading the file.\n\n${error}`);
            });
            await firebase.firestore().collection("feeds").doc(id).set({
                id: id,
                user: user.displayName,
                date: date,
                title: this.state.title,
                time: this.state.time,
                place: this.state.place,
                ocassion: this.state.ocassion,
                images: images,
                like: 0
            })
            .then(() => {
                this.props.navigation.goBack();
            }).catch((error) => {
                alert("Error writing document: ", error);
            });
        });
    }

    render(){
        const selectedImages = this.state.image.map((data, index) => {
            return (
                <View style={styles.slider} key={data.key}>
                    <ImageBackground source={{uri: data.uri}} style={styles.picture}>
                        <TouchableOpacity
                            onPress={() => this.handleRemovePicture(data.key)}
                            style={styles.cancelButton}>
                            <Icon name={"minus-circle"}
                                size={20}
                                color="#fff" />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            );
        });

        return (
            <View style={styles.container}>
                <View style={styles.tpoContainer}>
                    <TextInput
                        style={styles.tpo}
                        autoCapitalize="none"
                        placeholder="언제?"
                        onChangeText={time => this.setState({ time })}
                        value={this.state.time}
                    />
                    <TextInput
                        style={styles.tpo}
                        autoCapitalize="none"
                        placeholder="어디서?"
                        onChangeText={place => this.setState({ place })}
                        value={this.state.place}
                    />
                    <TextInput
                        style={styles.tpo}
                        autoCapitalize="none"
                        placeholder="무엇을?"
                        onChangeText={ocassion => this.setState({ ocassion })}
                        value={this.state.ocassion}
                    />
                </View>
                <Swiper
                    showsButtons={true}
                    backgroundColor='#cccccc'
                    autoplay={true}
                    loop={false}
                    key={this.state.image.length}
                    paginationStyle={{
                        bottom : 20
                    }}
                >
                    {selectedImages}
                </Swiper>
                <View style={styles.contentContainer}>
                    <TextInput
                        style={styles.content}
                        autoCapitalize="none"
                        placeholder="어떤 사진인가요?"
                        onChangeText={title => this.setState({ title })}
                        value={this.state.title}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={this.pickImage}
                        style={styles.cameraButton}>
                        <Icon name={"camera"}
                            size={20}
                            color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.handleSubmit.bind(this)}
                        style={styles.nextButton}>
                        <Icon name={"chevron-right"}
                            size={20}
                            color="#fff" />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white"
    },
    tpoContainer: {
        width: '100%',
        height: 70,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-around",
        borderBottomWidth: 2,
        borderColor: 'grey',
    },
    slider: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer:{
        height: 230,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor : "grey",
    },
    content: {
        width: "90%",
        fontSize: 30,
        backgroundColor: "transparent",
    },
    tpo: {
        fontSize: 20,
        width: 100,
        backgroundColor: "transparent",
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "#cccccc",
        margin: 10
    },
    buttonContainer: {
        height: 80,
        width: '100%',
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    cancelButton: {
        position: 'absolute',
        borderWidth:1,
        borderColor:'skyblue',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor: 'skyblue',
        borderRadius:100,
        right : 10,
        bottom : 10,
    },
    cameraButton: {
        borderWidth:1,
        borderColor:'skyblue',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor: 'skyblue',
        borderRadius:100,
    },
    nextButton: {
        borderWidth:1,
        borderColor:'skyblue',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor: 'skyblue',
        borderRadius:100,
    },
    picture: {
        width: '100%',
        height: '100%',
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
      },
    paginationText: {
        color: 'white',
        fontSize: 20
    },
    button:{
        color:'skyblue'
    }

});
