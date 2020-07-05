import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Image, Button, ScrollView, TouchableOpacity } from 'react-native';
import * as DbHandler from "../Database/DatabaseHandler";

import {withNavigation} from 'react-navigation';



const _renderFooter = () => (
  <View>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text></Text>
  </View>
)

class PromoActivity extends Component {

    constructor(props) {
        super(props);

        this.state = {
          FlatListItems: [],
        };

        this.refreshFlatList();
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
                    height: 10,
                    width: "100%",
                    backgroundColor: "#f2f2f2",
                }}
            />
        );
    };

    getListViewItem = (item) => {
        Alert.alert(item.name, item.description);
    };

    componentDidMount() {
        const {addListener} = this.props.navigation;
        this.listeners = [
            addListener('didFocus', () => {
                this.refreshFlatList();

            })
        ]
    }

    refreshFlatList = () => {
        console.log('Refreshing all promotions from local db');
        let allpromos = undefined;
        const query = async() => {
            await DbHandler.getAllPromotionsScanned().then(function(temp) {
                allpromos = temp;
            });
            this.setState({FlatListItems: allpromos});
        };
        query().then();
    };

      render() {
          if (this.state.FlatListItems.length != 0) {

          return (

              <View style={styles.container}>

                  <Text style={styles.titre}>Promotions</Text>
                  <Text style={styles.info}>(cliquez sur une promotion pour plus de détails){'\n'}</Text>

                  <View>
                      <FlatList
                          style={styles.FlatList}
                          extraData={this.state.FlatListItems.refresh}
                          data={this.state.FlatListItems}
                          refreshing={this.state.refreshing}
                          onRefresh={this._handleRefresh}
                          ListFooterComponent={_renderFooter}
                          ItemSeparatorComponent={this.ListViewItemSeparator}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) => (
                              <TouchableOpacity activeOpacity={0.7}
                                                onPress={this.getListViewItem.bind(this, item)}>
                                  <View style={styles.item}>

                                      <Image style={styles.img} source={{uri: 'data:image/png;base64,' + item.image}}/>


                                      <Text style={styles.text}>
                                          <Text style={styles.nameItem}>{item.name}</Text>{'\n'}{'\n'}
                                          <Text style={styles.titreh4}>Date de début : </Text><Text
                                          style={styles.libelle}>{item.start_date}</Text>{'\n'}
                                          <Text style={styles.titreh4}>Date de fin : </Text><Text
                                          style={styles.libelle}>{item.end_date}</Text>{'\n'}
                                          <Text style={styles.titreh4}>Remise : </Text><Text
                                          style={styles.libelle}>{item.percentage} %</Text>
                                      </Text>


                                  </View>
                              </TouchableOpacity>
                          )}
                          ItemSeparatorComponent={this.renderSeparator}
                      />
                  </View>
              </View>
          );
      } else{
              return (

                  <View style={styles.container}>

                      <Text style={styles.titre}>Promotions</Text>
                      <Text style={styles.info}>(cliquez sur une promotion pour plus de détails){'\n'}</Text>


                          <Text style={styles.titreNoPromo}>Aucune promotion scannée</Text>
                      <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('QRScan')} style={styles.btNoPromo}>
                      <Text style={styles.btNoPromo}>Scanner une promotion</Text>

                      </TouchableOpacity>
                      </View>
                      )
          }
      }

    }
    export default withNavigation(PromoActivity);

    const styles = StyleSheet.create({
      FlatList: {
        marginTop: 10,
          backgroundColor: '#f2f2f2'
      },
        container: {
            flex: 1,
            marginTop: 20,
            alignItems: 'center',
            backgroundColor: '#f2f2f2'
        },
        item: {
          flex:1,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: "center",
            padding:30,
            backgroundColor: '#FFF',
            elevation: 2,
            borderRadius: 5,
            color:'#b75f5e',
            flexDirection:'row',


        },
        text: {

            textAlign: "center",
            justifyContent: 'center'
        },
        titre: {
          marginTop: 10,
          fontSize: 36,
          fontWeight: 'bold',
          color:'#b75f5e',
          textShadowColor: 'black',
   textShadowOffset: {width: 0, height: 0},
   textShadowRadius: 1

        },
        info: {
         fontSize: 15,
         fontStyle: 'italic',
        },
        img: {
            width:80,
            height:80,
            borderRadius:60,
            marginRight:20,

       },
       titreh4: {

       },
       nameItem: {
           color:'#b75f5e',
         fontWeight: 'bold',
         fontSize: 20,
       },
        titreNoPromo:{
            fontWeight: 'bold',
            color:'#b75f5e',
            textAlign:'center',
            fontSize:28,
            marginTop:'10%',
            marginBottom:'15%',
        },
        btNoPromo:{
            borderRadius: 50,
          padding:10,
          justifyContent:'center',
          backgroundColor:'#fff',
          color:'#b75f5e',

        }
    });
