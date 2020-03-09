import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import value from '../Activity/QRcodeActivity'

export default class App extends Component {
    state = {
       data: ''
    }
    componentDidMount = () => {
       fetch('http://192.168.42.120:8000/promotions/1',{
          method: 'GET'
       })
       .then((response) => response.json())
       .then((responseJson) => {
          console.log(responseJson);

          this.setState({
             data: responseJson
          })
       })
       .catch((error) => {
          console.error(error);
       });
    }
    render() {
       return (
          <View>
             <Text>
                Libelle : {this.state.data.libelle}
             </Text>
          </View>
       )
    }
 }

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
