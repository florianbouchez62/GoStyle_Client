import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Carousel from '../Component/Carousel'
import PromosScan from '../Component/PromosScan'
import {dummyData} from '../Data/Data'

export default function App () {

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
          <Text style = {styles.title2}>Dernière Promo Scanée</Text>
          <PromosScan/>
          </ScrollView>
        </View>
      
    );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  title1: {
    color:'white',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },
  title2: {
    color:'white',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    
  },
});

