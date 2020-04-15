import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Image, Button, ScrollView } from 'react-native';
import db from '../Database/Database';

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

        return (
  
        /*<View style={styles.container}>
          <Text style={styles.titre}>Dernière promotion scanée</Text>
                   
          <View>
            <FlatList
              style={styles.FlatList}
              extraData = {this.state.FlatListItems.refresh}
              data={this.state.FlatListItems}
              refreshing={this.state.refreshing}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                    <Text style = {styles.item}>
                        <Text style = {styles.nameItem}>{item.name}</Text>{'\n'}
                        <Image style = {styles.img} source = {{uri: 'data:image/png;base64,' + item.image}}/>{'\n'}{'\n'}{'\n'}{'\n'}
                        <Text style = {styles.titreh4}>Date de scan : </Text><Text style = {styles.libelle}>{item.scan_date}</Text>{'\n'}
                        <Text style = {styles.titreh4}>Remise : </Text><Text style = {styles.libelle}>{item.percentage} %</Text>
                    </Text>
              )}
            />
          </View>     
        </View>*/
        <ScrollView style={styles.scrollView}>
                <Text>{this.state.FlatListItems[0] !== undefined ? this.state.FlatListItems[0].name : "existe pas"}</Text>
        </ScrollView>
        );
      }
    }

    const styles = StyleSheet.create({  
      FlatList: { 
        marginTop: 10,
      },

    container: {   
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff'
    },  
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
    },  
    item: {  
        paddingTop: 20,
        textAlign: "center", 
        height: 250,  
        width: 300,
        backgroundColor: '#F3F4F4',
        elevation: 2,
        borderRadius: 20,
    },  
    titre: {
        marginTop: 10,
        fontSize: 30,
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
        fontSize: 14,
    }
    });


