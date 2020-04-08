import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Image } from 'react-native';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("local.db");

export default class PromoScan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Promotion ORDER BY scan_date LIMIT 1', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }



  render() {
    return (

    <View style = {styles.container}> 
      <Text style = {styles.title}>Dernière promotion scannée :</Text>
      <View>
        <FlatList
          data = {this.state.FlatListItems}
          keyExtractor = {(item, index) => index.toString()}
          renderItem = {({ item }) => (
                <Text style = {styles.item}>

                    <Text style = {styles.nameItem}>{item.name}</Text>{'\n'}
                    <Text style = {styles.titreh4}>Scanné le : </Text><Text style = {styles.libelle}>{item.scan_date}</Text>{'\n'}
                    <Text style = {styles.titreh4}>Remise : </Text><Text style = {styles.libelle}>{item.percentage} %</Text>
                </Text>
          )}
        />
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    }

  });

