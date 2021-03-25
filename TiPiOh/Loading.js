import React from 'react';
import {StyleSheet, Image, Text, Animated, View} from "react-native";

export default class Loading extends React.Component{
  state = { animation: new Animated.Value(0)}

  componentDidMount(){
    Animated.timing(
      this.state.animation,
      {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true
      }
    ).start();
  }

  render() {
    const animationStyles = {
      opacity: this.state.animation
    };
    return (
      <Animated.View style={[styles.container, animationStyles]}>
        <Image source={require('./assets/logo.png')} ></Image>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      fontFamily: 'DancingScript',
      backgroundColor: 'white',
      alignItems: 'center',
      marginTop : 143
    },
    text: {
      fontSize: 50,
      marginBottom: 40,
    }
});