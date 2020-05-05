import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Image, Button, ScrollView } from 'react-native';
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
                    backgroundColor: "#fff",
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
        return (

        <View style={styles.container}>
          <Text style={styles.titre}>Promotions :</Text>
          <Text style={styles.info}>(cliquer sur une promotion pour plus de détails){'\n'}</Text>
          <View>
            <FlatList
              style={styles.FlatList}
              extraData = {this.state.FlatListItems.refresh}
              data={this.state.FlatListItems}
              refreshing={this.state.refreshing}
              onRefresh={this._handleRefresh}
              ListFooterComponent={_renderFooter}
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
    export default withNavigation(PromoActivity);

    const styles = StyleSheet.create({
      FlatList: {
        marginTop: 10,
      },
        container: {
            flex: 1,
            marginTop: 20,
            alignItems: 'center',
            backgroundColor: '#fff'
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
         fontSize: 14,
       }
    });
