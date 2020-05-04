import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import db from '../Database/Database';
import moment from "moment";
import * as DbHandler from "../Database/DatabaseHandler";

export default class PromoScan extends Component {

    constructor(props) {
        console.log('super cosntructeur');
        super(props);

        this.state = {
          lastItem: undefined,
        };

        this.refreshFlatList();
    } 

      refreshFlatList = () => {
          let lastpromo = undefined;
          const query = async() => {
              await DbHandler.getLastPromotionScanned().then(function (results) {
                  lastpromo = results;
              });
              this.setState({lastItem: lastpromo});
          };
          query().then();
      };

    render() {
        if (this.state.lastItem !== undefined){
            const end_date_format = new Date(this.state.lastItem.end_date);
            return(
                  <View style = {styles.container}>
                    
                    <Text style = {styles.nameItem}>{this.state.lastItem.name}</Text>
                    <Image style = {styles.img} source = {{uri: 'data:image/png;base64,' + this.state.lastItem.image}}/>
                    <Text style = {styles.text1}>{this.state.lastItem.description}</Text>
                    <Text style = {styles.text2}>
                        Se termine le : {('0' + end_date_format.getDate()).slice(-2)}/
                        {('0' + end_date_format.getMonth()).slice(-2)}/
                        {end_date_format.getFullYear()}
                    </Text>
                  </View>
            );  
        } else {
            return(
                <Text>Pas de promo</Text>
            )
        }
      }
    }
    const styles = StyleSheet.create({  

      container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5
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
      },
      img: {
        width: 100, 
        height: 100,
        alignItems: 'center'
      },
      nameItem: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
      },
      text1: {
        fontWeight: 'bold',
        fontSize: 20,
      },
      text2: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
      }
    });


