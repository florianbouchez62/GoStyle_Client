import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default class PromoScan extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        if (this.props.lastItem !== undefined){
            const end_date_format = new Date(this.props.lastItem.end_date);
            return(
                  <View style = {styles.container}>
                    
                    <Text style = {styles.nameItem}>{this.props.lastItem.name}</Text>
                    <Image style = {styles.img} source = {{uri: 'data:image/png;base64,' + this.props.lastItem.image}}/>
                    <Text style = {styles.text1}>{this.props.lastItem.description}</Text>
                    <Text style = {styles.text2}>
                        Se termine le : {('0' + end_date_format.getDate()).slice(-2)}/
                        {('0' + end_date_format.getMonth()).slice(-2)}/
                        {end_date_format.getFullYear()}
                    </Text>
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
