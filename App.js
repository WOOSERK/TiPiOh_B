import React from 'react';
import Login from "./Login";
import Tab from "./Tab";
import * as Font from 'expo-font';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

export default class App extends React.Component {
  state = {
    loading: true
  };

  async componentDidMount(){
    await Font.loadAsync({
      'DancingScript': require('./assets/fonts/DancingScript-Bold.ttf'),
    });
    this.setState({loading: false});
  }

  render(){
    const { loading } = this.state;
    if(loading){
      return (<Text>Loading</Text>);
    }
    else{
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login"
          headerMode="screen"
          gestureEnabled="true"
          screenOptions={{
            headerStyle: {
              backgroundColor: 'grey',
              height : 80,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'DancingScript',
              fontSize: 30
            },
            headerTitle: "TiPiOh",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => alert('Right Menu Clicked')}
                style={{marginRight: 10}}>
                <Text style={{color: 'white'}}>Right Menu</Text>
              </TouchableOpacity>
            ),
          }}>
            <Stack.Screen
              name="Login"
              component={Login}
            />
            <Stack.Screen
              name="Tab"
              component={Tab}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );  
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});