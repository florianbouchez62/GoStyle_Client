import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Carousel from '../Component/Carousel'
import {dummyData} from '../Data/Data'
import * as DbHandler from "../Database/DatabaseHandler";
import PromoScan from "../Component/PromosScan";
import {withNavigation} from 'react-navigation';


class HomeActivity extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lastItem: undefined,
      texte:'salut les loulous',
      isDisplayed: true,
    };

    this.refreshFlatList();
  }


  componentDidMount() {
    const {addListener} = this.props.navigation;
    this.listeners = [
        addListener('didFocus', () => {
          this.refreshFlatList();


        })
    ]
  }

  refreshFlatList() {
    console.log('Refreshing last promotion from local db');
    let lastpromo = undefined;
    const query = async() => {
      await DbHandler.getLastPromotionScanned().then(function (results) {
        lastpromo = results;
      });
      this.setState({lastItem: lastpromo});
    };
    query().then();
  };

  render(){
    return (
        <View style= {styles.container}>
          <ScrollView style={styles.scrollView}>
            <Image
                style={{
                  alignSelf: 'center',
                  height: 112,
                  width: 170,
                  marginTop: 40,
                  borderWidth: 1,
                  borderRadius: 75
                }}
                source={require('../assets/mspr_logo.png')}
                resizeMode="stretch"/>
            <Text style= {styles.title1}>Promos en cours</Text>
            <Carousel data  = {dummyData}/>

            <PromoScan lastItem={this.state.lastItem}/>
          </ScrollView>
        </View>
    );
  }
}

export default withNavigation(HomeActivity);

const styles = StyleSheet.create({

  container: {

    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  title1: {
    color:'#b75f5e',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 1
  },
  title2: {

    color:'#b75f5e',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 1
  }
});
