import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import {API_URL, API_PORT} from 'react-native-dotenv';
import {Promotion} from "../models/Promotion";

import { BarCodeScanner } from 'expo-barcode-scanner';

export default class QRCodeTestActivity extends React.Component {

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
        if(type === "org.iso.QRCode"){
            this.getPromotionFromServer(data);
        } else {
            alert(`Le QRCode est invalide.`);
        }
    };

    getPromotionFromServer(data){
        const url = 'http://' + API_URL + ':' + API_PORT + data;
        fetch(url,{
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const promotion = new Promotion(responseJson.name, responseJson.description, responseJson.start_date,
                    responseJson.end_date, responseJson.percentage, responseJson.base64_image);
                console.log(promotion.name);
                console.log(promotion.description);
                console.log(promotion.start);
                console.log(promotion.end);
                console.log(promotion.percentage);
                console.log(promotion.image);
                alert('La promotion ' + promotion.name + " : " + promotion.description + " a bien été recupérée.")
                //TODO: Stocker la promotion
            })
            .catch((error) => {
                alert("Le QRCode n'est pas lié à une promotion.");
            });
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
