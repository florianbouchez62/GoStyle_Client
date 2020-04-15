import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Carousel from '../Component/Carousel'
import PromosScan from '../Component/PromosScan'
import {dummyData} from '../Data/Data'

export default function App () {

  return (
      <View>
      
        <Image
          style={styles.image}
          source={require('../assets/GoStyleLog.png')}/>
          
        <Carousel data  = {dummyData}/>
        
        <PromosScan/>
        
      </View>
    );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    alignContent: 'center',
    width: 420,
    marginTop: 16,
    marginBottom: 0,
    resizeMode: 'cover'
  },
  
});

