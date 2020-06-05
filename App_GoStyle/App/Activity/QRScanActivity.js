import * as React from 'react';
import { Text, View, StyleSheet, Button, Alert, Dimensions, Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {API_URL, API_PORT} from 'react-native-dotenv';
import {Promotion} from "../models/Promotion";
import * as DbHandler from '../Database/DatabaseHandler';
import {withNavigation} from 'react-navigation';

import { BarCodeScanner } from 'expo-barcode-scanner';
const { width } = Dimensions.get('window')
const qrSize = width * 0.7
class QRScanActivity extends React.Component {
    state = {
        hasCameraPermission: null,
        defaultTitle: 'Scanner un code',
        titleAfterOneScan: 'Scanner un nouveau code'
    };

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });

    };

    componentDidMount() {
        this.getPermissionsAsync();
        const { addListener } = this.props.navigation;
        const { isDisplayed } = this.state;
        const { alreadyScanned } = this.state;
        const self = this;

        this.listeners = [
            addListener('didFocus', () => {
              if (self.state.isDisplayed !== true) {
                  setTimeout( () => {
                      self.setState({ isDisplayed: true })
                      self.setState({ alreadyScanned: false })
                  },200);
              }
            }),
            addListener('didBlur', () => {
              if (self.state.isDisplayed !== false) {
                  setTimeout( () => {
                      self.setState({ isDisplayed: false })
                  },200);
              }
            }),
        ]
    };



    handleBarCodeScanned = ({ type, data }) => {
        try{
            const {alreadyScanned} = this.state;

            if(!alreadyScanned) this.setState({alreadyScanned: true});
            //Permet de s'assurer que le code scanné est bien un QRCode
            const qrData = JSON.parse(data);
            if(type === "org.iso.QRCode" || type === 256){
                this.getPromotionFromServer(qrData.url, qrData.token);
            } else {
                Alert.alert(
                  'Alert',
                  'Le QRCode est invalide',
                  [
                    {text: 'OK'},

                  ]);

            }
            


        } catch {
            Alert.alert(
              'Alert',
              'Le QRCode est invalide',
              [
                {text: 'OK'},

              ]);

        }

    };

    getPromotionFromServer(apiPath, token){
        const requestUrl = 'http://' + API_URL + ':' + API_PORT + apiPath;
        const request = async() => {
            const reqHeaders = new Headers();
            reqHeaders.append("Authorization", ("token " + token));
            const head = {method: 'GET',
                          headers: reqHeaders,
                          mode: 'cors',
                          cache: 'default'};
            const response = await fetch(requestUrl, head);

            if(response.status >= 200 && response.status < 300){
                const json = await response.json();
                const promotion = this.convertToPromotion(json);
                let nbPromotions = -1;
                await DbHandler.findPromotionByPath(apiPath).then(function(results) {
                    nbPromotions = results;
                });
                this.processInsertion(nbPromotions, promotion, apiPath);
                this.setState({ refresh: !this.state.refresh })
                this.props.navigation.navigate('Promo');
            } else {
                console.log(response.status);
                alert('Impossible de récupérer la promotion');
            }
        };

        request().then();
    }

    processInsertion(nbPromotions, promotion, apiPath){
        if(nbPromotions === 0){
            const current_date = new Date();
            const string_date = current_date.getFullYear() + '-' + current_date.getMonth() + '-' + current_date.getDay();
            DbHandler.insertPromotion(promotion, apiPath, string_date);
            alert("Le code " + promotion.name + " ayant pour description : " + promotion.description + " a bien été recupéré.");
        } else {
            alert("La promotion associé au QRCode a déjà été récupérée");
        }
    }

    convertToPromotion(json){
        try{
            return new Promotion(json.id, json.code, json.description, json.start_date, json.end_date,
                json.percentage, json.base64_image );
        } catch(e){
            alert('Impossible de créer la promotion');
            return null;
        }
    }

    render() {

        const { hasCameraPermission, isDisplayed, alreadyScanned, defaultTitle, titleAfterOneScan } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (

            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    justifyItems:'center',
                    marginTop:-150,
                    marginRight:-100,
                    marginLeft:-100,
                    marginBottom:-150,
                    backgroundColor: 'black'
                }}>
                {!isDisplayed &&(
                   <View>
                       <Text  style={styles.descriptionNotDisplay}>Scannez un QR Code</Text>
                       <Image
                           style={styles.qrNotDisplay}
                           source={require('../assets/qr.png')}
                       />

                   </View>
                    )}
                {isDisplayed && !alreadyScanned &&(
                    <BarCodeScanner
                        onBarCodeScanned={this.handleBarCodeScanned}
                        style={[StyleSheet.absoluteFillObject, styles.cameraContainer]}>
                    <Text  style={styles.description}>Scannez un QR Code</Text>
                        <Image
                            style={styles.qr}
                            source={require('../assets/qr.png')}
                        />
                    </BarCodeScanner>

                )}

            </View>
        );
    }
}
export default withNavigation(QRScanActivity);

const styles = StyleSheet.create({
    description: {
        fontSize: 20,
        marginTop: '40%',
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    cameraContainer: {
        flex: 1,
        alignItems: 'center',
    },
    qr: {
        marginTop: '20%',
        justifyContent: 'center',
        width: qrSize,
        height: qrSize,
    },
    descriptionNotDisplay:{
        fontSize: 20,
        marginTop: -120,
        marginRight:0,
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    qrNotDisplay:{
        marginTop: '20%',
        justifyContent: 'center',
        width: qrSize,
        height: qrSize,
        marginLeft:161
    }
})