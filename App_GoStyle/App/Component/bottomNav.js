import React, {Component} from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { BottomNavigation, Text} from 'react-native-paper';
import HomeActivity from '../Activity/HomeActivity';
import QRScanActivity from "../Activity/QRScanActivity";
import PromoActivity from '../Activity/PromoActivity';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createAppContainer} from "react-navigation";

const HomeRoute = () => <HomeActivity/>;

const QRScanRoute = () => <QRScanActivity/>;

const PromoRoute = () => <PromoActivity/>;


const TabNav = createAppContainer (createMaterialTopTabNavigator({
  Home:{screen:HomeRoute, navigationOptions:{tabBarLabel:'Accueil', tabBarIcon:({tintColor})=>(<Icon name='home' color={tintColor} size={24}/>)}},
  QRScan:{screen:QRScanRoute, navigationOptions:{tabBarLabel:'QR Scan', tabBarIcon:({tintColor})=>(<Icon name='qrcode' color={tintColor} size={24}/>)}},
  Promo:{screen:PromoRoute, navigationOptions:{tabBarLabel:'Promos', tabBarIcon:({tintColor})=>(<Icon name='sale' color={tintColor} size={24}/>)}},
  },{
  initialRouteName:'Home',
  order:['Home','Promo','QRScan'],
  tabBarPosition:'bottom',
  tabBarOptions:{
    activeTintColor:'#b74a4a',
    inactiveTintColor:'grey',
    style:{
      backgroundColor: '#ecf0f1'      
    },
    indicatorStyle:{
      height:0
    },
    showIcon:true,
    showLabel: false
  }

}));
export default class Navigation extends Component{
  render(){
    return(
        <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
          <TabNav/>
        </SafeAreaView>
    )
  } }
