import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ImageBackground, Alert } from 'react-native';
import * as DbHandler from "../Database/DatabaseHandler";
import { Icon } from 'react-native-elements';
import {withNavigation} from 'react-navigation';


class PromoActivity extends Component {

  constructor(props) {
      super(props);
      this.state = {FlatListItems: []};
      this.refreshFlatList();
    }

    componentDidMount() {
        const {addListener} = this.props.navigation;
        this.listeners = [
            addListener('didFocus', () => {
                this.refreshFlatList();
            })
        ]
    }

    refreshFlatList = () => {
        let allpromos = undefined;
        const query = async() => {
            await DbHandler.getAllPromotionsScanned().then(function(temp) {
                allpromos = temp;
            });
            this.setState({FlatListItems: allpromos});
        };
        query().then();
    };

    getListViewItem = (item) => {
      Alert.alert(item.name, item.description);
    }

    renderItem = ({ item }) => (
      <View style= {styles.item}>
        <Image style = {styles.img} source={{uri: 'data:image/png;base64,' + item.image}}/>
        <View style= {styles.test}>
    <Text style={styles.itemName}>{item.code}</Text>
          <View style={{marginLeft: 'auto'}}>
              <Icon 
                name='chevron-right' 
                color='#2c3e50' 
                size={17} 
                reverse 
                onPress={this.getListViewItem.bind(this, item)}
              />
          </View>
          <View style={styles.de}>
              <Text style={styles.percentage}>{item.percentage} % | </Text>
              <Text style={styles.code}>{item.end_date}</Text>
          </View>
        </View>
      </View>
    );

      render() {

        const gotPromotions = this.state.FlatListItems.length != 0 ? true : false;

        return (
          <View style={styles.container}>
            <View style={{flex:1}}>
              <ImageBackground 
                source={require('../assets/header_promo.png')}
                style={styles.header_image}>
              </ImageBackground>

            </View>
            <View style={styles.content}>

              {gotPromotions
                ? <FlatList
                  style={{marginTop: 50}}
                  extraData={this.state.FlatListItems.refresh}
                  refreshing={this.state.refreshing}
                  onRefresh={this._handleRefresh}
                  keyExtractor={(item, index) => index.toString()}
                  data={this.state.FlatListItems}
                  renderItem={this.renderItem}
                />
                : <View style={{alignItems: 'center'}}>
                    <Image 
                      source={require('../assets/empty.png')}
                      style={styles.empty_image}
                    />
                    <Text style={styles.nopromo}>Aucune promotion scannée</Text>
                  </View>
              }
            </View>
          </View>
        );
      }
    }
    export default withNavigation(PromoActivity);

    const styles = StyleSheet.create({
      container: {
       flex: 1,
       backgroundColor: "#EFEFF4"
      },
      content: {
        backgroundColor: '#ecf0f1',
        flex:2.5,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: -40
      },
      header_image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },    
      item: {
        marginTop: 12.5,
        marginBottom: 12.5,
        marginLeft: 30,
        marginRight: 20,
        flex: 1,
        flexDirection: 'row',
      },
      img: {
        height: 80,
        width: 80,
        marginBottom: 5,
      },
      topViewImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
      test: {
        flexDirection: 'column',
        flex: 2,
        marginLeft: 10,
        marginTop: 5,
      },
      itemName: {
        fontWeight: 'bold',
        marginTop: -5,
        flex: 1,
        flexWrap: 'wrap'
      },
      code: {
        marginBottom: 5,
        color: "#B2B2BB"
      },
      de: {
        flexDirection: "row",
        marginTop: -10
      },
      percentage: {
        fontWeight: 'bold',
      },
      empty_image:{
        width: 250,
        height: 250,
        marginTop: 100
      },
      nopromo: {
        fontSize: 15,
        marginTop: 20,
        fontWeight: '600'
      }
    })
