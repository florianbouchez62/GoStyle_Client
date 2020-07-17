import React from 'react'
import { StyleSheet, StatusBar, SafeAreaView, View} from 'react-native';
import Navigation from './Component/bottomNav'
import * as DbHandler from './Database/DatabaseHandler';

export default class App extends React.Component {

  componentDidMount() {
    DbHandler.dropTablePromotions();
    DbHandler.createTablePromotions();
  }

  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#ecf0f1' }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ecf0f1' }}>
            <StatusBar barStyle="dark-content" />
            <Navigation/>
        </SafeAreaView>
        <StatusBar translucent backgroundColor="transparent" />
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
