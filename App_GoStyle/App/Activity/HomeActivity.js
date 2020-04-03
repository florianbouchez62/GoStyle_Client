import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Image } from 'react-native';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("local.db");

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM promotions ORDER BY scan_date LIMIT 1', [], (tx, results) => {
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
        
    <View style={styles.container}> 
      <Text>Welcome</Text> 
      <Text style={styles.titre}>Dernière promotion scanné :</Text>       
      <View>
        <FlatList
          data={this.state.FlatListItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
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
        marginTop: 100,
        alignItems: 'center',
        
    },  
    item: {  
        paddingTop: 20,
        textAlign: 'center', 
        height: 250,  
        width: 300,
    },  
    titre: {
      marginTop: 100,
      fontSize: 16,
      fontStyle: 'italic',
    },
    libelle: {
      color: 'black'
   },
    img: {
      width: 300, 
      height: 250,
   },
   titreh4: {
     fontWeight: 'bold'
   },
   nameItem: {
     fontWeight: 'bold',
     fontSize: 14
   }
})
