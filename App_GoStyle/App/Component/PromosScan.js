import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import {withNavigation} from 'react-navigation';

export default class PromoScan extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        if (this.props.lastItem !== undefined){
            const end_date_format = new Date(this.props.lastItem.end_date);
            return(

                  <View>
                      <Text style = {styles.title2}>Dernière Promo Scannée</Text>
                      <View style = {styles.container}>
                      <Image style = {styles.img} source = {{uri: 'data:image/png;base64,' + this.props.lastItem.image}}/>

                      <Text style={styles.text}>
                    <Text style = {styles.nameItem}>{this.props.lastItem.name}</Text>{'\n'}{'\n'}

                    <Text style = {styles.text1}>{this.props.lastItem.description}</Text>{'\n'}{'\n'}
                    <Text style = {styles.text2}>
                        Se termine le : {('0' + end_date_format.getDate()).slice(-2)}/
                        {('0' + end_date_format.getMonth()).slice(-2)}/
                        {end_date_format.getFullYear()}
                    </Text>
                      </Text>
                  </View>
                  </View>
            );
        } else {
            return(
                <Text style={styles.nameItem}>Aucune promotion scannée !</Text>
            )
        }
      }
}

    const styles = StyleSheet.create({

      container: {
        justifyContent: 'center',
        alignItems: 'center',
          padding:20,
        margin: 10,
          textAlign: "center",
          backgroundColor: '#FFF',
          elevation: 2,
          borderRadius: 5,
          color:'#b75f5e',
          flexDirection:'row',
          flex:1
      },
       text: {


            textAlign: "center",
           justifyContent: 'center'
        },
      FlatList: {
        marginTop: 10,
      },
      scrollView: {
        marginHorizontal: 40,
        marginBottom: 20
      },
      title: {
        marginTop: 5,
        fontSize: 35,
        fontWeight: 'bold',
        color:'#b75f5e',

      },
      img: {
          width:80,
          height:80,
          borderRadius:60,
          marginRight:40,
      },
      nameItem: {
        textAlign: 'center',
        fontWeight: 'bold',
        color:'#b75f5e',
        fontSize: 25,
      },
      text1: {
        fontSize: 15,
      },
      text2: {
        fontSize: 15,
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
