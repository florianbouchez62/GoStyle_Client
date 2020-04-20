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
            style={styles.image}
            source={require('../assets/GoStyleLog.png')}/>
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
    backgroundColor: 'tomato'
  },
  
  image: {
    width: 'auto',
    height: 100,
    marginTop: 25,
    marginBottom: 0,
    resizeMode: 'cover'
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

