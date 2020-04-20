import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import db from '../Database/Database';
import moment from "moment";

export default class PromoScan extends Component {

    constructor(props) {
        super(props);

        this.state = {
          FlatListItems: [],
        };

        this.refreshFlatList();
    } 

      refreshFlatList = () => {
        db.transaction(tx => {
          tx.executeSql('SELECT * FROM Promotions ORDER BY id DESC LIMIT 1 ', [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }
            this.setState({
              FlatListItems: temp,
            });
          });
        });
      };
      
      render() {
        
        this.refreshFlatList();
        
        if (this.state.FlatListItems[0] !== undefined){
            return(
                <ScrollView style={styles.scrollView}>
                  <View style = {styles.container}>
                    
                    <Text style = {styles.nameItem}>{this.state.FlatListItems[0].name}</Text>
                    <Image style = {styles.img} source = {{uri: 'data:image/png;base64,' + this.state.FlatListItems[0].image}}/>
                    <Text style = {styles.text1}>{this.state.FlatListItems[0].description}</Text>
                    <Text style = {styles.text2}>Se termine le : {this.state.FlatListItems[0].end_date}</Text>
                  </View>
                </ScrollView>
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


