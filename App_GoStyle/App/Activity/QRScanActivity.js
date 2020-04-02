import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import {API_URL, API_PORT} from 'react-native-dotenv';
import {Promotion} from "../models/Promotion";
import * as DbHandler from '../Database/DatabaseHandler';

import { BarCodeScanner } from 'expo-barcode-scanner';

export default class QRScanActivity extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: true,
        alreadyScanned: false,
        defaultTitle: 'Scanner un code',
        titleAfterOneScan: 'Scanner un nouveau code'
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    handleBarCodeScanned = ({ type, data }) => {
        const {alreadyScanned} = this.state;
        if(!alreadyScanned) this.setState({alreadyScanned: true});
        this.setState({ scanned: true });
        //Permet de s'assurer que le code scanné est bien un QRCode
        const qrData = JSON.parse(data);
        if(type === "org.iso.QRCode" || type === 256){
            this.getPromotionFromServer(qrData.url, qrData.token);
        } else {
            alert(`Le QRCode est invalide.`);
        }
    };

    getPromotionFromServer(apiPath, token){
        const requestUrl = 'http://' + API_URL + ':' + API_PORT + apiPath;
        let promotion = null;

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
                this.insertDb(promotion, apiPath);
                alert('La promotion ' + promotion.name + " : " + promotion.description + " a bien été recupérée.");
                this.setState({ refresh: !this.state.refresh })
            } else {
                console.log(response.status);
                alert('Impossible de récupérer la promotion');
            }
        };

        request().then();
    }

    convertToPromotion(json){
        try{
            return new Promotion(json.id, json.name, json.description, json.start_date, json.end_date,
                json.percentage, json.base64_image);
        } catch(e){
            alert('Impossible de créer la promotion');
            return null;
        }
    }

    insertDb(promotion, apiPath){
        const current_date = new Date();
        const string_date = current_date.getFullYear() + '-' + current_date.getMonth() + '-' + current_date.getDay();
        let queryArgs = [];
        DbHandler.insertPromotion(promotion, apiPath, string_date);
    }

    render() {
        const { hasCameraPermission, scanned, alreadyScanned, defaultTitle, titleAfterOneScan } = this.state;

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
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}>

                {!scanned && (
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                )}

                {scanned && (
                    <Button
                        title={alreadyScanned === false ? defaultTitle : titleAfterOneScan }
                        onPress={() => this.setState({ scanned: false })}
                    />
                )}
            </View>
        );
    }
}
