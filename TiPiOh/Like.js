import React from "react";
import {TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as firebase from "firebase";

export default function Like(props)
{
    return(
        <TouchableOpacity onPress={() => handleLike(props.id)}>
            <Icon name="thumbs-up" size={30} solid/>
        </TouchableOpacity>
    );
}

const handleLike = (id) =>
{
    const ref = firebase.firestore().collection("feeds").doc(id.toString());

    ref.update({
        like: firebase.firestore.FieldValue.increment(1)
    })
}
