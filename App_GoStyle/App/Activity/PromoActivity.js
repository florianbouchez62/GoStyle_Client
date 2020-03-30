import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import {API_URL, API_PORT} from 'react-native-dotenv';
import {Promotion} from "../models/Promotion";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("local.db");

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          FlatListItems: [],
        };
        db.transaction(tx => {
          tx.executeSql('SELECT * FROM Promotion', [], (tx, results) => {
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
      ListViewItemSeparator = () => {
        return (
          <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
        );
      };

      renderSeparator = () => {  
        return (  
            <View  
                style={{  
                    height: 1,  
                    width: "100%",  
                    backgroundColor: "#000",  
                }}  
            />  
        );  
    };  

      getListViewItem = (item) => {  
        Alert.alert(item.name, item.description);  
    }  

      render() {
        return (
            
        <View style={styles.container}> 
          <Text style={styles.titre}>Promotions :</Text>
          <Text style={styles.info}>(cliquer sur une promotion pour plus de détails){'\n'}</Text>         
          <View>
            <FlatList
              data={this.state.FlatListItems}
              ItemSeparatorComponent={this.ListViewItemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                    <Text style = {styles.item} onPress={this.getListViewItem.bind(this, item)}>

                        <Text style = {styles.nameItem}>{item.name}</Text>{'\n'}
                        <Image style = {styles.img} source = {{uri: 'data:image/png;base64,' + item.image}}/>{'\n'}{'\n'}{'\n'}{'\n'}
                        <Text style = {styles.titreh4}>Date de début : </Text><Text style = {styles.libelle}>{item.start_date}</Text>{'\n'}
                        <Text style = {styles.titreh4}>Date de fin : </Text><Text style = {styles.libelle}>{item.end_date}</Text>{'\n'}
                        <Text style = {styles.titreh4}>Remise : </Text><Text style = {styles.libelle}>{item.percentage} %</Text>

                        </Text>
              )}
              ItemSeparatorComponent={this.renderSeparator} 
            />
          </View>
        </View>
        );
      }
    }

    const styles = StyleSheet.create({  
        container: {  
            flex: 1,  
            marginTop: 20,
            alignItems: 'center',
        },  
        item: {  
            paddingTop: 20,
            textAlign: "center", 
            height: 300,  
            width: 300,
        },  
        titre: {
          marginTop: 10,
          fontSize: 36,
          fontWeight: 'bold',
        },
        info: {
         fontSize: 12,
         fontStyle: 'italic',
        },
        libelle: {
          color: 'black'
       },
        img: {
          width: 70, 
          height: 70,
       },
       titreh4: {
         fontWeight: 'bold'
       },
       nameItem: {
         fontWeight: 'bold',
         fontSize: 14
       }
    })
 