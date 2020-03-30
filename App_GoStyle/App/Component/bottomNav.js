import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomNavigation, Text} from 'react-native-paper';
import HomeActivity from '../Activity/HomeActivity';
import QRScanActivity from "../Activity/QRScanActivity";
import PromoActivity from '../Activity/PromoActivity';



const HomeRoute = () => <HomeActivity/>;

const QRScanRoute = () => <QRScanActivity/>;

const PromoRoute = () => <PromoActivity/>;

export default class bottomBar extends React.Component {

  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'home'},
      { key: 'qrscan', title: 'QR Scan', icon: 'qrcode-scan'},
      { key: 'promo', title: 'Promos' , icon: 'sale'},
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home : HomeRoute,
    qrscan: QRScanRoute,
    promo: PromoRoute,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        barStyle={{ backgroundColor: '#fff' }}
    />
    );
  }

}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
