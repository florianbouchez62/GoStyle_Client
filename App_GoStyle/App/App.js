import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Component/bottomNav'
import * as DbHandler from './Database/DatabaseHandler';

export default class App extends React.Component {

  componentDidMount() {
    //Drop a enlever, écrit pour tests
    DbHandler.dropTablePromotions();
    DbHandler.createTablePromotions();
  }

  render() {
    return (
        <Navigation/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
