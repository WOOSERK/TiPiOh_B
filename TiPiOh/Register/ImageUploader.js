import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageUploader(props) {
  const [image, setImage] = useState('https://blog.kakaocdn.net/dn/cZkuHW/btqCtXev0sk/2ZmkOuDy30ANHu1WT2yrmk/img.jpg');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('카메라 접근을 허용해주세요!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log(result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
    }

    props.myCallback(result.uri);
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.circle}/> }
      <View style={styles.button}>
        <Button title="이미지 업로드" onPress={pickImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center"
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
    button: {
      marginTop: 10
    }
});
